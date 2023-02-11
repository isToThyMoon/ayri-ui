import classNames from 'classnames';
import type { UploadProps as RcUploadProps } from 'rc-upload';
import RcUpload from 'rc-upload';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useState } from 'react';
import '../../css/index.scss';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadListType,
  UploadProps,
} from './interface';
import UploadList from './List/index';
import {
  file2Obj,
  filterFileList,
  getExtName,
  getFileItem,
  removeFileItem,
  updateFileList,
} from './utils';

export const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`;

const InternalUpload: React.ForwardRefRenderFunction<unknown, UploadProps> = (
  props,
  ref,
) => {
  const nameSpace = 'ft-upload';
  const {
    fileList,
    defaultFileList,
    onRemove,
    showUploadList,
    listType,
    onPreview,
    onDownload,
    onChange,
    previewFile,
    disabled,
    iconRender,
    isImageUrl,
    className,
    direction,
    children,
    prompt,
    style,
    itemRender,
    maxCount,
    maxSize,
    minSize,
    locale,
    progress,
  } = props;

  const [mergedFileList, setMergedFileList] = useMergedState(
    defaultFileList || [],
    {
      value: fileList,
      postState: (list) => filterFileList(list) ?? [],
    },
  );

  const [isShowUploader, setShowUploader] = useState(true);

  const upload = React.useRef<any>();

  // Control mode will auto fill file uid if not provided
  React.useMemo(() => {
    const timestamp = Date.now();

    (fileList || []).forEach((file, index) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index}__`;
      }
    });
  }, [fileList]);

  const onInternalChange = (
    file: UploadFile,
    changedFileList: UploadFile[],
    event?: { percent: number },
  ) => {
    let cloneList = [...changedFileList];
    // Cut to match count
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount);
    }

    setMergedFileList(cloneList);

    const changeInfo: UploadChangeParam<UploadFile> = {
      file: file as UploadFile,
      fileList: cloneList,
    };

    if (event) {
      changeInfo.event = event;
    }

    onChange?.(changeInfo);
  };

  const mergedBeforeUpload = async (file: RcFile, fileListArgs: RcFile[]) => {
    const { beforeUpload } = props;

    let parsedFile: File | Blob | string = file;

    if (maxSize && file.size / 1024 > maxSize) {
      // Hack for LIST_IGNORE, we add additional info to remove from the list
      delete (file as any)[LIST_IGNORE];
      Object.defineProperty(file, LIST_IGNORE, {
        value: true,
        configurable: true,
      });
      return false;
    }

    if (minSize && file.size / 1024 < minSize) {
      // Hack for LIST_IGNORE, we add additional info to remove from the list
      delete (file as any)[LIST_IGNORE];
      Object.defineProperty(file, LIST_IGNORE, {
        value: true,
        configurable: true,
      });
      return false;
    }

    if (!!file.name && !!props.accept) {
      const extName = getExtName(file.name).toLowerCase();

      if (props.accept?.indexOf(extName) == -1) {
        // Hack for LIST_IGNORE, we add additional info to remove from the list
        delete (file as any)[LIST_IGNORE];
        Object.defineProperty(file, LIST_IGNORE, {
          value: true,
          configurable: true,
        });
        return false;
      }
    }

    if (beforeUpload) {
      const result = await beforeUpload(file, fileListArgs);

      if (result === false) {
        return false;
      }

      // Hack for LIST_IGNORE, we add additional info to remove from the list
      delete (file as any)[LIST_IGNORE];
      if ((result as any) === LIST_IGNORE) {
        Object.defineProperty(file, LIST_IGNORE, {
          value: true,
          configurable: true,
        });
        return false;
      }

      if (typeof result === 'object' && result) {
        parsedFile = result as File;
      }
    }

    return parsedFile as RcFile;
  };

  const onBatchStart: RcUploadProps['onBatchStart'] = (batchFileInfoList) => {
    // Skip file which marked as `LIST_IGNORE`, these file will not add to file list
    const filteredFileInfoList = batchFileInfoList.filter(
      (info) => !(info.file as any)[LIST_IGNORE],
    );

    // Nothing to do since no file need upload
    if (!filteredFileInfoList.length) {
      return;
    }

    const objectFileList = filteredFileInfoList.map((info) =>
      file2Obj(info.file as RcFile),
    );

    // Concat new files with prev files
    let newFileList = [...mergedFileList];

    objectFileList.forEach((fileObj) => {
      // Replace file if exist
      newFileList = updateFileList(fileObj, newFileList);
    });

    objectFileList.forEach((fileObj, index) => {
      // Repeat trigger `onChange` event for compatible
      let triggerFileObj: UploadFile = fileObj;

      if (!filteredFileInfoList[index].parsedFile) {
        // `beforeUpload` return false
        const { originFileObj } = fileObj;
        let clone;

        try {
          clone = new File([originFileObj], originFileObj.name, {
            type: originFileObj.type,
          }) as any as UploadFile;
        } catch (e) {
          clone = new Blob([originFileObj], {
            type: originFileObj.type,
          }) as any as UploadFile;
          clone.name = originFileObj.name;
          clone.lastModifiedDate = new Date();
          clone.lastModified = new Date().getTime();
        }

        clone.uid = fileObj.uid;
        triggerFileObj = clone;
      } else {
        // Inject `uploading` status
        fileObj.status = 'uploading';
      }

      onInternalChange(triggerFileObj, newFileList);
    });
  };

  const onSuccess = (response: any, file: RcFile, xhr: any) => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }

    // removed
    if (!getFileItem(file, mergedFileList)) {
      return;
    }

    const targetItem = file2Obj(file);
    targetItem.status = 'done';
    targetItem.percent = 100;
    targetItem.response = response;
    targetItem.xhr = xhr;

    const nextFileList = updateFileList(targetItem, mergedFileList);

    onInternalChange(targetItem, nextFileList);
  };

  const onProgress = (e: { percent: number }, file: RcFile) => {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);
    targetItem.status = 'uploading';
    targetItem.percent = Math.floor(e.percent);

    const nextFileList = updateFileList(targetItem, mergedFileList);

    onInternalChange(targetItem, nextFileList, e);
  };

  const onError = (error: Error, response: any, file: RcFile) => {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return;
    }
    const targetItem = file2Obj(file);

    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';

    const nextFileList = [...mergedFileList];
    const fileIndex = nextFileList.findIndex(
      ({ uid }: UploadFile) => uid === file.uid,
    );

    nextFileList.splice(fileIndex, 1);
    onInternalChange(targetItem, nextFileList);
  };

  const handleRemove = (file: UploadFile) => {
    let currentFile: UploadFile;
    Promise.resolve(
      typeof onRemove === 'function' ? onRemove(file) : onRemove,
    ).then((ret) => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, mergedFileList);

      if (removedFileList) {
        currentFile = { ...file, status: 'removed' };
        mergedFileList?.forEach((item) => {
          const matchKey = currentFile.uid !== undefined ? 'uid' : 'name';
          if (
            item[matchKey] === currentFile[matchKey] &&
            !Object.isFrozen(item)
          ) {
            item.status = 'removed';
          }
        });
        upload.current?.abort(currentFile);

        onInternalChange(currentFile, removedFileList);
      }
    });
  };

  React.useImperativeHandle(ref, () => ({
    onBatchStart,
    onSuccess,
    onError,
    fileList: mergedFileList,
    upload: upload.current,
  }));

  const rcUploadProps = {
    onBatchStart,
    onError,
    onProgress,
    onSuccess,
    ...(props as RcUploadProps),
    beforeUpload: mergedBeforeUpload,
    onChange: undefined,
    prefixCls: nameSpace,
  };

  delete rcUploadProps.style;
  delete rcUploadProps.children;

  if (!children || disabled) {
    delete rcUploadProps.id;
  }

  const uploadButtonCls = classNames(nameSpace, {
    [`${nameSpace}-select`]: true,
    [`${nameSpace}-select-${listType}`]: true,
    [`${nameSpace}-disabled`]: disabled,
    [`${nameSpace}-rtl`]: direction === 'rtl',
  });
  const renderUploadButton = (uploadButtonStyle?: React.CSSProperties) => (
    <div className={uploadButtonCls} style={uploadButtonStyle}>
      {
        <RcUpload ref={upload} {...rcUploadProps}>
          {children}
        </RcUpload>
      }
      {listType !== 'picture-card' && prompt}
    </div>
  );

  const renderUploadList = (
    button?: React.ReactNode,
    buttonVisible?: boolean,
  ) =>
    showUploadList ? (
      <UploadList
        prefixCls={nameSpace}
        listType={listType}
        items={mergedFileList}
        previewFile={previewFile}
        onPreview={onPreview}
        onDownload={onDownload}
        onRemove={handleRemove}
        showRemoveIcon={!disabled}
        iconRender={iconRender}
        isImageUrl={isImageUrl}
        appendAction={button}
        appendActionVisible={buttonVisible}
        itemRender={itemRender}
        locale={{ ...locale }}
        progress={progress}
      />
    ) : (
      button
    );

  if (listType === 'picture-card') {
    return (
      <span
        className={classNames(`${nameSpace}-picture-card-wrapper`, className)}
      >
        {renderUploadList(
          renderUploadButton(children ? undefined : { display: 'none' }),
        )}
      </span>
    );
  }

  return (
    <div className={className}>
      {renderUploadButton(children ? undefined : { display: 'none' })}
      {renderUploadList()}
    </div>
  );
};

const Uploader = React.forwardRef<unknown, UploadProps>(InternalUpload);

Uploader.displayName = 'Upload';

Uploader.defaultProps = {
  multiple: false,
  action: '',
  data: {},
  accept: '',
  showUploadList: true,
  listType: 'text' as UploadListType, // or picture
  className: '',
  disabled: false,
  locale: {
    removeFile: '删除',
    previewFile: '预览',
  },
};

export default Uploader;
