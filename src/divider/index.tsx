import classNames from 'classnames';
import * as React from 'react';
// import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  customDashed?: boolean;
  style?: React.CSSProperties;
  plain?: boolean;
}

const Divider: React.FC<DividerProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    type = 'horizontal',
    orientation = 'center',
    className,
    children,
    dashed,
    customDashed,
    plain,
    ...restProps
  } = props;
  // const prefixCls = getPrefixCls('divider', customizePrefixCls);
  const prefixCls = 'ft-divider';

  const separatorRef = React.useRef<HTMLDivElement>(null);

  const orientationPrefix =
    orientation.length > 0 ? `-${orientation}` : orientation;
  const hasChildren = !!children;
  const classString = classNames(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-text`]: hasChildren,
      [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
      [`${prefixCls}-dashed`]: !!dashed,
      [`${prefixCls}-custom-dashed`]: !!customDashed,
      [`${prefixCls}-plain`]: !!plain,
      // [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  React.useEffect(() => {
    if (props.customDashed && separatorRef.current) {
      const mergedBorderColor = props.style?.borderColor || '#CED3D9';
      const orientationMap = {
        horizontal: 'right',
        vertical: 'bottom',
      };
      const orientation = orientationMap[props.type || 'horizontal'];
      separatorRef.current.style.cssText += `
      background-image: linear-gradient(to ${orientation}, ${mergedBorderColor} 0%, ${mergedBorderColor} 50%, transparent 50%);
      `;
    }
  }, []);
  return (
    <div
      className={classString}
      {...restProps}
      role="separator"
      ref={separatorRef}
    >
      {children && (
        <span className={`${prefixCls}-inner-text`}>{children}</span>
      )}
    </div>
  );
};

export default Divider;
