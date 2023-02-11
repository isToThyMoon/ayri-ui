import type {
  CSSMotionProps,
  MotionEndEventHandler,
  MotionEventHandler,
} from 'rc-motion';
import type { MotionEvent } from 'rc-motion/lib/interface';
import type {
  BeforeUploadFileType as RcBeforeUploadFileType,
  RcFile as OriRcFile,
  UploadProps as RcUploadProps,
  UploadRequestOption as RcCustomRequestOptions,
} from 'rc-upload/lib/interface';
import type * as React from 'react';

export interface RcFile extends OriRcFile {
  readonly lastModifiedDate?: Date;
}

export type UploadFileStatus =
  | 'error'
  | 'success'
  | 'done'
  | 'uploading'
  | 'removed';

export interface HttpRequestHeader {
  [key: string]: string;
}

export interface UploadFile<T = any> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  originFileObj?: RcFile;
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
}

export interface InternalUploadFile<T = any> extends UploadFile<T> {
  originFileObj: RcFile;
}

export interface UploadChangeParam<T = UploadFile> {
  // https://github.com/ant-design/ant-design/issues/14420
  file: T;
  fileList: T[];
  event?: { percent: number };
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  showDownloadIcon?: boolean;
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
}

export interface UploadLocale {
  removeFile?: string;
  previewFile?: string;
}

export interface UploadListProgressProps {
  // percent?: number;
  color?: string;
}

export type UploadType = 'drag' | 'select';
export type UploadListType = 'text' | 'picture' | 'picture-card';

export type ItemRender<T = any> = (
  originNode: React.ReactElement,
  file: UploadFile,
  fileList: Array<UploadFile<T>>,
  actions: {
    preview: Function;
    remove: Function;
  },
) => React.ReactNode;

type PreviewFileHandler = (file: File | Blob) => PromiseLike<string>;
export type BeforeUploadValueType = void | RcBeforeUploadFileType;

export interface UploadProps<T = any> extends Pick<RcUploadProps, 'capture'> {
  type?: UploadType;
  name?: string;
  defaultFileList?: Array<UploadFile<T>>;
  fileList?: Array<UploadFile<T>>;
  action?:
    | string
    | ((file: RcFile) => string)
    | ((file: RcFile) => PromiseLike<string>);
  directory?: boolean;
  data?:
    | Record<string, unknown>
    | ((
        file: UploadFile<T>,
      ) => Record<string, unknown> | Promise<Record<string, unknown>>);
  method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
  headers?: HttpRequestHeader;
  showUploadList?: boolean | ShowUploadListInterface;
  multiple?: boolean;
  accept?: string;
  beforeUpload?: (
    file: RcFile,
    FileList: RcFile[],
  ) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
  onChange?: (info: UploadChangeParam<UploadFile<T>>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  listType?: UploadListType;
  className?: string;
  onPreview?: (file: UploadFile<T>) => void;
  onDownload?: (file: UploadFile<T>) => void;
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  supportServerRender?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  prefixCls?: string;
  customRequest?: (options: RcCustomRequestOptions) => void;
  withCredentials?: boolean;
  openFileDialogOnClick?: boolean;
  id?: string;
  previewFile?: PreviewFileHandler;
  iconRender?: (
    file: UploadFile<T>,
    listType?: UploadListType,
  ) => React.ReactNode;
  isImageUrl?: (file: UploadFile) => boolean;
  itemRender?: ItemRender<T>;
  /** Config max count of `fileList`. Will replace current one when `maxCount` is 1 */
  maxCount?: number;
  children?: React.ReactNode;
  prompt?: React.ReactNode;
  direction?: 'ltr' | 'rtl';
  maxSize?: number;
  minSize?: number;
  locale?: UploadLocale;
  progress?: UploadListProgressProps;
}

export interface UploadState<T = any> {
  fileList: UploadFile<T>[];
  dragState: string;
}

export interface UploadListProps<T = any> {
  listType?: UploadListType;
  onPreview?: (file: UploadFile<T>) => void;
  onDownload?: (file: UploadFile<T>) => void;
  onRemove?: (file: UploadFile<T>) => void | boolean;
  items?: Array<UploadFile<T>>;
  progress?: UploadListProgressProps;
  prefixCls: string;
  showRemoveIcon?: boolean;
  showDownloadIcon?: boolean;
  showPreviewIcon?: boolean;
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  previewFile?: PreviewFileHandler;
  iconRender?: (
    file: UploadFile<T>,
    listType?: UploadListType,
  ) => React.ReactNode;
  isImageUrl?: (file: UploadFile) => boolean;
  appendAction?: React.ReactNode;
  appendActionVisible?: boolean;
  itemRender?: ItemRender<T>;
  locale: UploadLocale;
}

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({
  height: 0,
  opacity: 0,
});
const getRealHeight: MotionEventHandler = (node) => {
  const { scrollHeight } = node;
  return { height: scrollHeight, opacity: 1 };
};
const getCurrentHeight: MotionEventHandler = (node) => ({
  height: node ? node.offsetHeight : 0,
});
const skipOpacityTransition: MotionEndEventHandler = (_, event: MotionEvent) =>
  event?.deadline === true ||
  (event as TransitionEvent).propertyName === 'height';

export const collapseMotion: CSSMotionProps = {
  motionName: 'ant-motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
};
