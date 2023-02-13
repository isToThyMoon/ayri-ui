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

# Grid 栅格

> 布局作为页面的基本构成、重要模式之一

## 基础说明

### 12 栅格

MIC 采用 12 栅格布局，应用时将页面中的 Gutter 设置为定值，即浏览器在一定范围扩大或缩小，栅格的 Column 宽度会随之扩大或缩小，但 Gutter 的宽度值固定不变

#### 基础布局

```jsx
import React from 'react';
import { Space, Row, Col } from 'future-ui';
import 'future-ui/es/grid/style/index.less';

const style1 = {
  background: '#dae0e6',
  color: '#222',
  textAlign: 'center',
};

const style2 = {
  background: '#e6ecf2',
  color: '#222',
  textAlign: 'center',
};

export default () => (
  <div>
    <Space direction="vertical">
      <Row>
        <Col span={12}>
          <div style={style1}>col-12</div>
        </Col>
      </Row>
      <Row gutter={0}>
        <Col span={6}>
          <div style={style1}>col-6</div>
        </Col>
        <Col span={6}>
          <div style={style2}>col-6</div>
        </Col>
      </Row>
      <Row gutter={0}>
        <Col span={4}>
          <div style={style1}>col-4</div>
        </Col>
        <Col span={4}>
          <div style={style2}>col-4</div>
        </Col>
        <Col span={4}>
          <div style={style1}>col-4</div>
        </Col>
      </Row>
      <Row gutter={0}>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style2}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style2}>col-3</div>
        </Col>
      </Row>
      <Row gutter={0}>
        <Col span={2}>
          <div style={style1}>col-2</div>
        </Col>
        <Col span={2}>
          <div style={style2}>col-2</div>
        </Col>
        <Col span={2}>
          <div style={style1}>col-2</div>
        </Col>
        <Col span={2}>
          <div style={style2}>col-2</div>
        </Col>
        <Col span={2}>
          <div style={style1}>col-2</div>
        </Col>
        <Col span={2}>
          <div style={style2}>col-2</div>
        </Col>
      </Row>
    </Space>
  </div>
);
```

#### 分栏间隔

```jsx
import React from 'react';
import { Space, Row, Col } from 'future-ui';
import 'future-ui/es/grid/style/index.less';

const style1 = {
  background: '#dae0e6',
  color: '#222',
  textAlign: 'center',
};

const style2 = {
  background: '#e6ecf2',
  color: '#222',
  textAlign: 'center',
};

export default () => (
  <div>
    <Space direction="vertical">
      <Row gutter={10}>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
      </Row>
    </Space>
  </div>
);
```

#### 混合布局

```jsx
import React from 'react';
import { Space, Row, Col } from 'future-ui';
import 'future-ui/es/grid/style/index.less';

const style1 = {
  background: '#dae0e6',
  color: '#222',
  textAlign: 'center',
};

const style2 = {
  background: '#e6ecf2',
  color: '#222',
  textAlign: 'center',
};

export default () => (
  <div>
    <Space direction="vertical">
      <Row gutter={10}>
        <Col span={8}>
          <div style={style1}>col-8</div>
        </Col>
        <Col span={4}>
          <div style={style1}>col-4</div>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={4}>
          <div style={style1}>col-4</div>
        </Col>
        <Col span={4}>
          <div style={style1}>col-4</div>
        </Col>
        <Col span={2}>
          <div style={style1}>col-2</div>
        </Col>
        <Col span={2}>
          <div style={style1}>col-2</div>
        </Col>
      </Row>
    </Space>
  </div>
);
```

#### 分栏偏移

```jsx
import React from 'react';
import { Space, Row, Col } from 'future-ui';
import 'future-ui/es/grid/style/index.less';

const style1 = {
  background: '#dae0e6',
  color: '#222',
  textAlign: 'center',
};

const style2 = {
  background: '#e6ecf2',
  color: '#222',
  textAlign: 'center',
};

export default () => (
  <div>
    <Space direction="vertical">
      <Row gutter={10}>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3} offset={3}>
          <div style={style1}>col-3;offset-3</div>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={3} offset={3}>
          <div style={style1}>col-3;offset-3</div>
        </Col>
        <Col span={3} offset={3}>
          <div style={style1}>col-3;offset-3</div>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={6} offset={3}>
          <div style={style1}>col-6;offset-3</div>
        </Col>
      </Row>
    </Space>
  </div>
);
```

#### 对齐方式

```jsx
import React from 'react';
import { Space, Row, Col } from 'future-ui';
import 'future-ui/es/grid/style/index.less';

const style1 = {
  background: '#dae0e6',
  color: '#222',
  textAlign: 'center',
};

const style2 = {
  background: '#e6ecf2',
  color: '#222',
  textAlign: 'center',
};

export default () => (
  <div>
    <Space direction="vertical">
      居左
      <Row gutter={0}>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style2}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
      </Row>
      居中
      <Row gutter={0} justify="center">
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style2}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
      </Row>
      居右
      <Row gutter={0} justify="end">
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style2}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
      </Row>
      space-between
      <Row gutter={0} justify="space-between">
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style2}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
      </Row>
      space-around
      <Row gutter={0} justify="space-around">
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style2}>col-3</div>
        </Col>
        <Col span={3}>
          <div style={style1}>col-3</div>
        </Col>
      </Row>
    </Space>
  </div>
);
```
