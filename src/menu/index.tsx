// import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import classNames from 'classnames';
import type { MenuProps as RcMenuProps, MenuRef } from 'rc-menu';
import RcMenu, { ItemGroup } from 'rc-menu';
import useEvent from 'rc-util/lib/hooks/useEvent';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { forwardRef } from 'react';
// import { ConfigContext } from '../config-provider';
// import type { SiderContextProps } from '../layout/Sider';
// import { SiderContext } from '../layout/Sider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import warning from '../_util/warning';
import type { ItemType } from './hooks/useItems';
import useItems from './hooks/useItems';
import MenuContext, { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';
import Item, { MenuItemProps } from './MenuItem';
import OverrideContext from './OverrideContext';
import SubMenu, { SubMenuProps } from './SubMenu';

export type { MenuItemGroupProps } from 'rc-menu';
export type { MenuDividerProps } from './MenuDivider';
export type { MenuTheme, SubMenuProps, MenuItemProps };
export { Menu };

export interface SiderContextProps {
  siderCollapsed?: boolean;
}

export type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

export interface MenuProps extends Omit<RcMenuProps, 'items'> {
  theme?: MenuTheme;
  inlineIndent?: number;
  // ft定制
  topTitle?: string;
  /**
   * @internal Not promise crash if used in production. Connect with chenshuai2144
   *   for removing.
   */
  _internalDisableMenuItemTitleTooltip?: boolean;

  items?: ItemType[];
}

type InternalMenuProps = MenuProps &
  SiderContextProps & {
    collapsedWidth?: string | number;
  };

const InternalMenu = forwardRef<MenuRef, InternalMenuProps>((props, ref) => {
  const override = React.useContext(OverrideContext) || {};

  // const { getPrefixCls, getPopupContainer, direction } = React.useContext(ConfigContext);

  // const rootPrefixCls = getPrefixCls();
  const rootPrefixCls = 'ft';
  // ft定制 水平horizontal mode下 menu超出容器时在尾部显示的拓展图标
  const overflowedIndicator = (
    <div className="ft-menu-rest-label">
      <span>More</span>
      <i className="ft-icon icon-down"></i>
    </div>
  );
  // ft定制 默认展开icon
  const defaultExpanIcon = <i className="ft-icon icon-down"></i>;

  const {
    prefixCls: customizePrefixCls,
    className,
    theme = 'light',
    expandIcon,
    _internalDisableMenuItemTitleTooltip,
    inlineCollapsed,
    siderCollapsed,
    items,
    children,
    mode,
    selectable,
    onClick,
    ...restProps
  } = props;

  const passedProps = omit(restProps, ['collapsedWidth']);

  // ========================= Items ===========================
  const mergedChildren = useItems(items) || children;

  // ======================== Warning ==========================
  warning(
    !('inlineCollapsed' in props && mode !== 'inline'),
    'Menu',
    '`inlineCollapsed` should only be used when `mode` is inline.',
  );

  warning(
    !(props.siderCollapsed !== undefined && 'inlineCollapsed' in props),
    'Menu',
    '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
  );

  warning(
    'items' in props && !children,
    'Menu',
    '`children` will be removed in next major version. Please use `items` instead.',
  );

  override.validator?.({ mode });

  // ========================== Click ==========================
  // Tell dropdown that item clicked
  const onItemClick = useEvent<Required<MenuProps>['onClick']>((...args) => {
    onClick?.(...args);
    override?.onClick?.();
  });

  // ========================== Mode ===========================
  const mergedMode = override.mode || mode;

  // ======================= Selectable ========================
  const mergedSelectable = selectable ?? override.selectable;

  // ======================== Collapsed ========================
  // Inline Collapsed
  const mergedInlineCollapsed = React.useMemo(() => {
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }, [inlineCollapsed, siderCollapsed]);

  const defaultMotions = {
    horizontal: { motionName: `${rootPrefixCls}-slide-up` },
    inline: collapseMotion,
    other: { motionName: `${rootPrefixCls}-zoom-big` },
  };

  // const prefixCls = getPrefixCls('menu', customizePrefixCls || override.prefixCls);
  const prefixCls = 'ft-menu';
  const menuClassName = classNames(`${prefixCls}-${theme}`, className);

  // ====================== Expand Icon ========================
  let mergedExpandIcon: MenuProps[`expandIcon`];
  if (typeof expandIcon === 'function') {
    mergedExpandIcon = expandIcon;
  } else {
    mergedExpandIcon = cloneElement(expandIcon || override.expandIcon, {
      className: `${prefixCls}-submenu-expand-icon`,
    });
    // ft定制 定制expanicon
    if (defaultExpanIcon) {
      let className;
      switch (mode) {
        case 'vertical':
          className = `${prefixCls}-submenu-expand-icon ft-icon icon-right`;
          break;
        case 'inline':
          className = `${prefixCls}-submenu-expand-icon ft-icon icon-down`;
          break;
        case 'horizontal':
          className = `${prefixCls}-submenu-expand-icon ft-icon icon-down`;
          break;
        default:
          className = `${prefixCls}-submenu-expand-icon ft-icon icon-down`;
          break;
      }
      mergedExpandIcon = mergedExpandIcon = cloneElement(defaultExpanIcon, {
        className: className,
      });
    }
  }

  // ======================== Context ==========================
  const contextValue = React.useMemo(
    () => ({
      prefixCls,
      inlineCollapsed: mergedInlineCollapsed || false,
      antdMenuTheme: theme,
      // direction,
      direction: undefined,
      firstLevel: true,
      disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip,
    }),
    // [prefixCls, mergedInlineCollapsed, theme, direction, _internalDisableMenuItemTitleTooltip],
    [
      prefixCls,
      mergedInlineCollapsed,
      theme,
      _internalDisableMenuItemTitleTooltip,
    ],
  );

  // ========================= Render ==========================
  return (
    <OverrideContext.Provider value={null}>
      <MenuContext.Provider value={contextValue}>
        <RcMenu
          // getPopupContainer={getPopupContainer}
          // overflowedIndicator={<EllipsisOutlined />}
          overflowedIndicator={overflowedIndicator}
          // overflowedIndicatorPopupClassName={`${prefixCls}-${theme}`}
          overflowedIndicatorPopupClassName={`${prefixCls}-overflow-pop-wrap`}
          mode={mergedMode}
          selectable={mergedSelectable}
          onClick={onItemClick}
          {...passedProps}
          inlineCollapsed={mergedInlineCollapsed}
          className={menuClassName}
          prefixCls={prefixCls}
          // direction={direction}
          direction={undefined}
          defaultMotions={defaultMotions}
          expandIcon={mergedExpandIcon}
          subMenuCloseDelay={0.05}
          subMenuOpenDelay={0.1}
          ref={ref}
        >
          <>
            {props.topTitle ? (
              <li className="ft-menu-top-title">{props.topTitle}</li>
            ) : null}
            {mergedChildren}
          </>
        </RcMenu>
      </MenuContext.Provider>
    </OverrideContext.Provider>
  );
});

// We should keep this as ref-able
class Menu extends React.Component<MenuProps, {}> {
  static Divider = MenuDivider;

  static Item = Item;

  static SubMenu = SubMenu;

  static ItemGroup = ItemGroup;
  //@ts-ignore
  menu: MenuRef | null;

  focus = (options?: FocusOptions) => {
    this.menu?.focus(options);
  };

  render() {
    // return (
    //   <SiderContext.Consumer>
    //     {(context: SiderContextProps) => (
    //       <InternalMenu
    //         ref={node => {
    //           this.menu = node;
    //         }}
    //         {...this.props}
    //         {...context}
    //       />
    //     )}
    //   </SiderContext.Consumer>
    // );

    return ((context: SiderContextProps) => (
      <InternalMenu
        ref={(node) => {
          this.menu = node;
        }}
        {...this.props}
        {...context}
      />
    ))({});
  }
}

export default Menu;
