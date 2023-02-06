---
category: Components
title: RDropdown下拉菜单
subtitle: 下拉菜单
order: 5
group:
  title: 数据展示
  order: 6
demo:
  cols: 2
---

依赖 tooltip

## API

```jsx
import React from 'react';
import { RDropdown } from 'future-ui';
import 'future-ui/es/dropdown/style/index.less';

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'future-ui';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

export default () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <RDropdown />
    </div>
  );
};
```
