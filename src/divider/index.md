---
category: Components
title: Divider分割线
subtitle: 分割线
order: 3
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
import { Divider } from 'future-ui';
import 'future-ui/es/divider/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => (
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <Divider />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
  </div>
);
```
