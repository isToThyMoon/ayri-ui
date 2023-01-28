---
category: Components
title: Grid栅格
subtitle: 栅格
order: 2
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
import { Row, Col } from 'future-ui';
import 'future-ui/es/grid/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => (
  <Row gutter={16}>
    <Col span={3}>
      <div style={style}>col-6</div>
    </Col>
    <Col span={3}>
      <div style={style}>col-6</div>
    </Col>
    <Col span={3}>
      <div style={style}>col-6</div>
    </Col>
    <Col span={3}>
      <div style={style}>col-6</div>
    </Col>
  </Row>
);
```
