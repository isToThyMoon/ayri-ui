---
category: Components
title: Spin加载中
subtitle: 加载中
order: 5
group:
  title: Feedback反馈
  order: 6
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
import { Spin } from 'future-ui';
import 'future-ui/es/spin/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => <Spin spinning={false} />;
```
