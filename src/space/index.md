---
category: Components
title: Space间距
subtitle: 间距
order: 4
group:
  title: Layout布局
  order: 2
demo:
  cols: 2
---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 代码演示

## API

```jsx
import React from 'react';
import { Divider, Button, Space } from 'future-ui';
import 'future-ui/es/space/style/index.less';
import 'future-ui/es/button/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => (
  <Space size={20}>
    Space
    <Button type="primary">Button</Button>
    <Button type="primary">Button</Button>
    <Button type="primary">Button</Button>
  </Space>
);
```
