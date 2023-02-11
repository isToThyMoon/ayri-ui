import { Loading } from '@future/loading/dist/react';
import classNames from 'classnames';
import type { CSSMotionListProps } from 'rc-motion';
import * as React from 'react';
import type { UploadFile, UploadListProps, UploadListType } from '../interface';
import { collapseMotion } from '../interface';
import useForceUpdate, {
  cloneElement,
  isImageUrl,
  isValidElement,
  previewImage,
} from '../utils';
import ListItem from './ListItem';

const listItemMotion: Partial<CSSMotionListProps> = {
  ...collapseMotion,
};

delete listItemMotion.onAppearEnd;
delete listItemMotion.onEnterEnd;
delete listItemMotion.onLeaveEnd;

const InternalUploadList: React.ForwardRefRenderFunction<
  unknown,
  UploadListProps
> = (
  {
    listType,
    previewFile,
    onPreview,
    onDownload,
    onRemove,
    iconRender,
    isImageUrl: isImgUrl,
    prefixCls,
    items = [],
    showPreviewIcon,
    showRemoveIcon,
    removeIcon,
    previewIcon,
    progress,
    appendAction,
    appendActionVisible,
    itemRender,
    locale,
  },
  ref,
) => {
  const forceUpdate = useForceUpdate();
  const [motionAppear, setMotionAppear] = React.useState(false);
  // ============================= Effect =============================
  React.useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    (items || []).forEach((file) => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window as any).FileReader ||
        !(window as any).File ||
        !(
          file?.originFileObj instanceof File ||
          (file?.originFileObj as any) instanceof Blob
        ) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      file.thumbUrl = '';
      if (previewFile) {
        previewFile(file.originFileObj as File).then(
          (previewDataUrl: string) => {
            // Need append '' to avoid dead loop
            file.thumbUrl = previewDataUrl || '';
            forceUpdate();
          },
        );
      }
    });
  }, [listType, items, previewFile]);

  React.useEffect(() => {
    setMotionAppear(true);
  }, []);

  // ============================= Events =============================
  const onInternalPreview = (
    file: UploadFile,
    e?: React.SyntheticEvent<HTMLElement>,
  ) => {
    if (!onPreview) {
      return;
    }
    e?.preventDefault();
    return onPreview(file);
  };

  const onInternalDownload = (file: UploadFile) => {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };

  const onInternalClose = (file: UploadFile) => {
    onRemove?.(file);
  };

  const internalIconRender = (file: UploadFile) => {
    const isLoading = file.status === 'uploading';

    if (isLoading && listType !== 'text') {
      let loading: React.ReactNode;
      if (listType === 'picture') {
        loading = <Loading />;
      } else if (listType === 'picture-card') {
        loading = '';
      }

      return loading;
    } else {
      if (iconRender) {
        return iconRender(file, listType);
      }

      const fileIcon = <i className="ft-icon icon-file"></i>;
      return fileIcon;
    }
  };

  const actionIconRender = (
    customIcon: React.ReactNode,
    callback: () => void,
    prefixCls: string,
    title?: string,
  ) => {
    const btnProps = {
      type: 'text',
      size: 'small',
      title,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        callback();
        if (isValidElement(customIcon) && customIcon.props.onClick) {
          customIcon.props.onClick(e);
        }
      },
      className: `${prefixCls}-list-item-card-actions-btn`,
    };
    if (isValidElement(customIcon)) {
      const btnIcon = cloneElement(customIcon, {
        ...customIcon.props,
        onClick: () => {},
      });

      return <div {...btnProps}>{btnIcon}</div>;
    }
    return (
      <div {...btnProps}>
        <span>{customIcon}</span>
      </div>
    );
  };

  // ============================== Ref ===============================
  // Test needs
  React.useImperativeHandle(ref, () => ({
    handlePreview: onInternalPreview,
    handleDownload: onInternalDownload,
  }));

  // ============================= Render =============================

  const listClassNames = classNames({
    [`${prefixCls}-list`]: true,
    [`${prefixCls}-list-${listType}`]: true,
    [`${prefixCls}-list-rtl`]: 'rtl',
  });

  // >>> Motion config
  const motionKeyList = [...items];

  return (
    <div className={listClassNames}>
      {motionKeyList.map((file, key) => (
        <ListItem
          key={key}
          prefixCls={prefixCls}
          // className={motionClassName}
          // style={motionStyle}
          file={file}
          items={items}
          progress={progress}
          listType={listType}
          isImgUrl={isImgUrl}
          showPreviewIcon={showPreviewIcon}
          showRemoveIcon={showRemoveIcon}
          removeIcon={removeIcon}
          previewIcon={previewIcon}
          iconRender={internalIconRender}
          actionIconRender={actionIconRender}
          itemRender={itemRender}
          onPreview={onInternalPreview}
          onDownload={onInternalDownload}
          onClose={onInternalClose}
          hasPreview={!!onPreview}
          locale={locale}
        />
      ))}
      {appendAction &&
        appendActionVisible &&
        cloneElement(appendAction, (oriProps) => ({
          className: classNames(oriProps.className),
          style: {
            // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
            // pointerEvents: 'none',
            ...oriProps.style,
          },
        }))}
    </div>
  );
};

const UploadList = React.forwardRef<unknown, UploadListProps>(
  InternalUploadList,
);

UploadList.displayName = 'UploadList';

UploadList.defaultProps = {
  listType: 'text' as UploadListType, // or picture
  showRemoveIcon: true,
  showPreviewIcon: true,
  appendActionVisible: true,
  previewFile: previewImage,
  isImageUrl,
};

export default UploadList;
