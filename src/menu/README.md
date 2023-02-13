---
category: Components
title: Menu菜单
subtitle: 菜单
order: 5
group:
  title: 数据展示
  order: 6
demo:
  cols: 2
---

依赖 tooltip

# Menu 导航菜单

> 页面和功能提供导航的菜单列表

## 基础说明

### 组件分类

水平导航（常用于顶部）
垂直导航（常用于侧边）

### 顶部导航（水平导航）

1.单层导航
通过组合 tab 组件和 dropdown 组件得到 无需 menu 单独开发

2.双层导航
通过组合两个 tab 组件得到 无需 menu 单独开发

3.多层收纳导航（antd 顶部导航 水平导航）

ft-menu-horizontal

```jsx
import React, { useState } from 'react';
import { Menu } from 'future-ui';
import 'future-ui/es/menu/style/index.less';

import type { MenuProps } from 'future-ui';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

export default () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
```

### 侧边导航（垂直导航）

1.单层导航 右侧展开（垂直菜单 子菜单是弹出的形式）

ft-menu-vertical

```tsx
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'future-ui';
import { Menu } from 'future-ui';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem(
      'Item 1',
      null,
      null,
      [getItem('Option 1', '1'), getItem('Option 2', '2')],
      'group',
    ),
    getItem(
      'Item 2',
      null,
      null,
      [getItem('Option 3', '3'), getItem('Option 4', '4')],
      'group',
    ),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const onClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const App: React.FC = () => (
  <Menu
    onClick={onClick}
    style={{ width: 256 }}
    mode="vertical"
    items={items}
    topTitle="Title-content"
  />
);

export default App;
```

2.单层导航 向下展开（内嵌菜单 垂直菜单，子菜单内嵌在菜单区域）
内嵌模式
ft-menu-inline

```tsx
import type { MenuProps } from 'future-ui';
import { Menu } from 'future-ui';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', null, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
  ]),

  getItem('Navigation Two', 'sub2', null, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
  ]),

  getItem('Navigation Three', 'sub4', null, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const App: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      inlineIndent={20}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;
```

3.侧边导航 带分类名称

```tsx
import type { MenuProps } from 'future-ui';
import { Menu } from 'future-ui';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', null, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),

  getItem('Navigation Two', 'sub2', null, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),

  getItem('Navigation Three', 'sub4', null, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem(
    'Group',
    'grp',
    null,
    [getItem('Option 13', '13'), getItem('Option 14', '14')],
    'group',
  ),
];

const App: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      inlineIndent={20}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;
```

4.平铺式侧边导航+弹层 （inline 模式内嵌菜单 和 inline 模式下 inlineCollapsed 只保留 icon 弹出式菜单，两种模式切换）

```tsx
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'future-ui';
import { Button, Menu } from 'future-ui';
import React, { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    'Option 1',
    '1',
    <div>
      <i className="ft-icon icon-setting"></i>
    </div>,
  ),
  getItem(
    'Option 2',
    '2',
    <div>
      <i className="ft-icon icon-setting"></i>
    </div>,
  ),
  getItem(
    'Option 3',
    '3',
    <div>
      <i className="ft-icon icon-setting"></i>
    </div>,
  ),

  getItem(
    'Navigation One',
    'sub1',
    <div>
      <i className="ft-icon icon-setting"></i>
    </div>,
    [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ],
  ),

  getItem(
    'Navigation Two',
    'sub2',
    <div>
      <i className="ft-icon icon-setting"></i>
    </div>,
    [getItem('Option 9', '9'), getItem('Option 10', '10')],
  ),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineIndent={20}
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default App;
```
