import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import * as React from 'react';

import type {
  ItemRender,
  UploadFile,
  UploadListProgressProps,
  UploadListType,
  UploadLocale,
} from '../interface';

export interface ListItemProps {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  file: UploadFile;
  items: UploadFile[];
  listType?: UploadListType;
  isImgUrl?: (file: UploadFile) => boolean;
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  iconRender: (file: UploadFile) => React.ReactNode;
  actionIconRender: (
    customIcon: React.ReactNode,
    callback: () => void,
    prefixCls: string,
    title?: string | undefined,
  ) => React.ReactNode;
  itemRender?: ItemRender;
  onPreview: (file: UploadFile, e: React.SyntheticEvent<HTMLElement>) => void;
  onClose: (file: UploadFile) => void;
  onDownload: (file: UploadFile) => void;
  progress?: UploadListProgressProps;
  hasPreview: boolean;
  locale: UploadLocale;
}

const ListItem = React.forwardRef(
  (
    {
      prefixCls,
      className,
      style,
      listType,
      file,
      items,
      iconRender,
      actionIconRender,
      itemRender,
      isImgUrl,
      showPreviewIcon,
      showRemoveIcon,
      previewIcon: customPreviewIcon,
      removeIcon: customRemoveIcon,
      onPreview,
      hasPreview,
      onClose,
      locale,
      progress: progressProps,
    }: ListItemProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    // Delay to show the progress bar
    const [showProgress, setShowProgress] = React.useState(false);
    const progressRafRef = React.useRef<any>();

    React.useEffect(() => {
      progressRafRef.current = setTimeout(() => {
        setShowProgress(true);
      }, 300);

      return () => {
        window.clearTimeout(progressRafRef.current);
      };
    }, []);

    const iconNode = iconRender(file);
    // 上传组件文件图标展示
    let icon = (
      <div
        className={classNames(`${prefixCls}-text-icon`, {
          // "is-loading": file.status === "uploading",
          'is-link': !!file.url,
        })}
      >
        {iconNode}
      </div>
    );

    if (listType === 'picture' || listType === 'picture-card') {
      if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
        icon = (
          <div
            className={classNames({
              [`${prefixCls}-list-item-thumbnail`]: true,
              [`${prefixCls}-list-item-thumbnail-loading`]:
                file.status === 'uploading',
              [`${prefixCls}-list-item-file`]: file.status !== 'uploading',
            })}
          >
            {iconNode}
          </div>
        );
      } else {
        const imgNode = isImgUrl?.(file) ? (
          <img
            src={file.thumbUrl || file.url}
            alt={file.name}
            className={`${prefixCls}-list-item-image`}
            crossOrigin={file.crossOrigin}
          />
        ) : (
          iconNode
        );
        icon =
          hasPreview || !!file.url ? (
            <a
              className={classNames({
                [`${prefixCls}-list-item-thumbnail`]: true,
                [`${prefixCls}-list-item-file`]: isImgUrl && !isImgUrl(file),
              })}
              onClick={(e) => onPreview(file, e)}
              href={!!file.url ? file.url : '#!'}
              target={!!file.url ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              {imgNode}
            </a>
          ) : (
            <span
              className={classNames({
                [`${prefixCls}-list-item-thumbnail`]: true,
                [`${prefixCls}-list-item-file`]: isImgUrl && !isImgUrl(file),
              })}
            >
              {imgNode}
            </span>
          );
      }
    }

    const infoUploadingClass = classNames({
      [`${prefixCls}-list-item`]: true,
      [`${prefixCls}-list-item-${file.status}`]: !!file.status,
      [`${prefixCls}-list-item-list-type-${listType}`]: true,
    });

    const linkProps =
      typeof file.linkProps === 'string'
        ? JSON.parse(file.linkProps)
        : file.linkProps;

    const removeIcon = showRemoveIcon
      ? actionIconRender(
          (typeof customRemoveIcon === 'function'
            ? customRemoveIcon(file)
            : customRemoveIcon) || (
            <i
              className={classNames('ft-icon', {
                'icon-delete': listType !== 'picture-card',
                'icon-recycle': listType === 'picture-card',
              })}
            ></i>
          ),
          () => onClose(file),
          prefixCls,
          locale.removeFile,
        )
      : null;

    const actions = listType !== 'picture-card' && (
      <div
        key="download-delete"
        className={classNames(`${prefixCls}-list-item-card-actions`, {
          picture: listType === 'picture',
        })}
      >
        {removeIcon}
      </div>
    );

    const pictureCardActions = listType === 'picture-card' &&
      file.status !== 'uploading' && (
        <span className={`${prefixCls}-list-item-actions`}>
          {removeIcon}
          {showPreviewIcon ? (
            <a
              className={`${prefixCls}-list-item-actions-link`}
              //   href={file.url || file.thumbUrl}
              href={!!file.url ? file.url : '#!'}
              target={!!file.url ? '_blank' : '_self'}
              rel="noopener noreferrer"
              style={
                file.url
                  ? undefined
                  : {
                      pointerEvents: 'none',
                      opacity: 0.5,
                    }
              }
              onClick={(e) => onPreview(file, e)}
              title={locale.previewFile}
            >
              {typeof customPreviewIcon === 'function'
                ? customPreviewIcon(file)
                : customPreviewIcon || <i className="ft-icon icon-eye"></i>}
            </a>
          ) : null}
        </span>
      );

    const iconAndPreview = (
      <span className={`${prefixCls}-span`}>
        {icon}
        {file.url
          ? [
              <a
                key="view"
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(`${prefixCls}-list-item-name`)}
                title={file.name}
                {...linkProps}
                href={file.url}
                onClick={(e) => onPreview(file, e)}
              >
                {file.name}
              </a>,
              actions,
            ]
          : [
              <span
                key="view"
                className={classNames(`${prefixCls}-list-item-name`, {
                  'is-loading': file.status === 'uploading',
                })}
                onClick={(e) => onPreview(file, e)}
                title={file.name}
              >
                {file.name}
              </span>,
              actions,
            ]}
      </span>
    );

    const dom = (
      <div className={infoUploadingClass}>
        <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
        {pictureCardActions}
        {showProgress && 'percent' in file && (
          <CSSMotion
            motionName={`${prefixCls}-fade`}
            visible={file.status === 'uploading'}
            motionDeadline={300}
          >
            {({ className: motionClassName }) => {
              // show loading icon if upload progress listener is disabled
              let progressStyle: any = {
                width: file.percent + '%',
              };
              if (!!progressProps?.color && listType == 'picture-card') {
                progressStyle['backgroundColor'] = progressProps?.color;
              }
              const loadingProgress =
                'percent' in file ? (
                  <div
                    className={classNames(
                      `${prefixCls}-list-item-progress-bar`,
                    )}
                    style={{ ...progressStyle }}
                  ></div>
                ) : null;
              return (
                <div
                  className={classNames(
                    `${prefixCls}-list-item-progress`,
                    motionClassName,
                  )}
                >
                  {loadingProgress}
                  <span className={`${prefixCls}-list-item-progress-percent`}>
                    {file.percent || 0}%
                  </span>
                </div>
              );
            }}
          </CSSMotion>
        )}
      </div>
    );

    return (
      <div
        className={classNames(
          `${prefixCls}-list-${listType}-container`,
          className,
        )}
        style={style}
        ref={ref}
      >
        {itemRender
          ? itemRender(dom, file, items, {
              preview: onPreview.bind(null, file),
              remove: onClose.bind(null, file),
            })
          : dom}
      </div>
    );
  },
);

export default ListItem;
