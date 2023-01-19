import * as React from 'react';

import classNames from 'classnames';

function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

// 'secondary'是设计单独开的有别于社区常规一个类型 相比default button一般有淡色背景
export type ButtonType =
  | 'default'
  | 'primary'
  | 'dashed'
  | 'text'
  | 'link'
  | 'default-red'
  | 'default-blue'
  | 'secondary'
  | 'secondary-red';
export type ButtonSize = 'mini' | 'small' | 'middle' | 'large' | undefined;
export type ButtonShape = 'circle' | 'round';

// type -> shape -> size -> danger ghost loading disabled进行组合使用
//
export interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  overlayStyle?: React.CSSProperties;
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: React.ReactNode;

  // 四种状态
  danger?: boolean;
  ghost?: boolean;
  loading?: boolean | { delay?: number };
  disabled?: boolean;
}
// 组合自定义button props 和原生button props
// 原生的type属性被自定义type占用，以htmlType代替 需要Omit去掉后组合
export type NativeButtonProps = {
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

// 组合自定义button props 和原生a标签props
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref,
) => {
  const {
    children,
    className,
    overlayStyle,
    type = 'default',
    htmlType = 'button' as ButtonProps['htmlType'],
    size = 'middle',
    shape,
    icon,

    danger,
    ghost = false,
    loading = false,
    // disabled = false,

    ...resProps
  } = props;

  const [innerLoading, setInnerLoading] = React.useState<number | boolean>(
    !!loading,
  );
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  const iconType = innerLoading ? 'loading' : icon;

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    // case 'mini':
    //   sizeCls = 'mini';
    //   break;
    default:
      break;
  }

  const classes = classNames('future-btn', className, {
    [`future-btn-${type}`]: type,
    [`future-btn-${shape}`]: shape,
    [`future-btn-${sizeCls}`]: sizeCls,
    [`future-btn-icon-only`]: !children && children !== 0 && iconType,
    [`future-btn-dangerous`]: !!danger,
    [`future-btn-background-ghost`]: ghost && !isUnborderedButtonType(type),
    [`future-btn-loading`]: innerLoading,
  });

  // const iconNode = icon && !innerLoading ? icon : 'loadingicon';
  const iconNode = innerLoading ? 'loadingicon' : icon ? icon : '';

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    const { onClick } = props;
    if (innerLoading) {
      return;
    }
    if (onClick) {
      (
        onClick as React.MouseEventHandler<
          HTMLButtonElement | HTMLAnchorElement
        >
      )(e);
    }
    // 点击完成后主动让button失焦 防止一直触发focus状态（但也不要css中取消focus设置，键盘用户需要focus状态来模拟类似鼠标用户的悬停效果）
    buttonRef.current.blur();
  };

  if (resProps.href !== undefined) {
    return (
      <a
        {...resProps}
        className={classes}
        onClick={handleClick}
        ref={buttonRef}
      >
        {iconNode}
        {children}
      </a>
    );
  }

  const buttonNode = (
    <button
      {...resProps}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      ref={buttonRef}
    >
      {iconNode}
      {children}
    </button>
  );

  return buttonNode;
};

const Button = React.forwardRef(InternalButton);

export default Button;
