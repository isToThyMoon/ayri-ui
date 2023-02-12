import classNames from 'classnames';
import debounce from 'lodash/debounce';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
// import type { ConfigConsumerProps } from '../config-provider';
// import { ConfigConsumer, ConfigContext } from '../config-provider';
import { cloneElement, isValidElement } from '../_util/reactNode';
import { tuple } from '../_util/type';

import LoadingGray from './icon/loading-gray.png';
import LoadingRed from './icon/loading-red.png';
import LoadingWhite from './icon/loading-white.png';

const SpinSizes = tuple('small', 'default', 'large');
export type SpinSize = (typeof SpinSizes)[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;

export interface SpinProps {
  children: React.ReactNode;

  // 三种转圈样式色彩
  // 红色的是买家端常规的，灰色的是不适合同红色的地方使用，白色的是背景为深色状态下使用 （设计：黄骏宇 语）
  type: 'red' | 'gray' | 'white' | undefined;

  prefixCls?: string;
  className?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  tip?: React.ReactNode;
  // ft定制
  tipType?: 'vertical' | 'horizontal';
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
}

export interface SpinClassProps extends SpinProps {
  spinPrefixCls: string;
}

export type SpinFCType = React.FC<SpinProps> & {
  setDefaultIndicator: (indicator: React.ReactNode) => void;
};

// Render indicator
let defaultIndicator: React.ReactNode = null;

function renderIndicator(
  prefixCls: string,
  props: SpinClassProps,
): React.ReactNode {
  const { indicator } = props;
  const dotClassName = `${prefixCls}-dot`;

  switch (props.type) {
    case 'red':
      defaultIndicator = <img src={LoadingRed} alt="" />;
      break;
    case 'gray':
      defaultIndicator = <img src={LoadingGray} alt="" />;
      break;
    case 'white':
      defaultIndicator = <img src={LoadingWhite} alt="" />;
      break;
    default:
      defaultIndicator = <img src={LoadingRed} alt="" />;
      break;
  }

  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null;
  }

  if (isValidElement(indicator)) {
    return cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName),
    });
  }

  if (isValidElement(defaultIndicator)) {
    return cloneElement(defaultIndicator, {
      className: classNames(
        (defaultIndicator as SpinIndicator).props.className,
        dotClassName,
        `${prefixCls}-dot-spin`,
      ),
    });
  }

  return (
    <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
    </span>
  );
}

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

const InternalSpin: React.FC<SpinClassProps> = (props) => {
  const {
    spinPrefixCls: prefixCls,
    spinning: customSpinning = true,
    delay,
    className,
    size = 'default',
    tip,
    // ft定制
    tipType,
    wrapperClassName,
    style,
    children,
    ...restProps
  } = props;

  const [spinning, setSpinning] = React.useState<boolean>(
    () => customSpinning && !shouldDelay(customSpinning, delay),
  );

  React.useEffect(() => {
    const updateSpinning = debounce<() => void>(() => {
      setSpinning(customSpinning);
    }, delay);
    updateSpinning();
    return () => {
      updateSpinning?.cancel?.();
    };
  }, [delay, customSpinning]);

  const isNestedPattern = () => typeof children !== 'undefined';

  const renderSpin = () => {
    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
        [`${prefixCls}-show-text-vertical`]: tipType === 'vertical',
        // [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(restProps, ['indicator', 'prefixCls']);

    const spinElement = (
      <div
        {...divProps}
        style={style}
        className={spinClassName}
        aria-live="polite"
        aria-busy={spinning}
      >
        {renderIndicator(prefixCls, props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );

    if (isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <div
          {...divProps}
          className={classNames(
            `${prefixCls}-nested-loading`,
            wrapperClassName,
          )}
        >
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {children}
          </div>
        </div>
      );
    }
    return spinElement;
  };
  return renderSpin();
};

// const SpinFC: SpinFCType = (props) => {
const Spin: SpinFCType = (props) => {
  const { prefixCls: customizePrefixCls } = props;
  // const { getPrefixCls } = React.useContext(ConfigContext);

  // const spinPrefixCls = getPrefixCls('spin', customizePrefixCls);
  const spinPrefixCls = 'ft-spin';

  const spinClassProps: SpinClassProps = {
    ...props,
    spinPrefixCls,
  };
  return <InternalSpin {...spinClassProps} />;
};

Spin.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

if (process.env.NODE_ENV !== 'production') {
  Spin.displayName = 'Spin';
}

export { Spin };
export default Spin;
