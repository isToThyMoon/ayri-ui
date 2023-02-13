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

# Spin 加载中

> 用于反馈一系列操作任务的处理结果

## 何时使用

页面局部处于等待或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

### 基本用法

一个简单的 loading 状态。
红色的是买家端常规的，灰色的是不适合同红色的地方使用，白色的是背景为深色状态下使用。

```jsx
import React from 'react';
import { Space, Spin } from 'future-ui';
import 'future-ui/es/spin/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => (
  <Space>
    <Spin type="red" />
    <Spin type="gray" />
    <div
      style={{
        width: '32px',
        height: '32px',
        background: '#888',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin type="white" />
    </div>
  </Space>
);
```

### 放入一个容器中

```tsx
import { Spin } from 'future-ui';
import React from 'react';

const style = {
  height: '80px',
  margin: '20px 0',
  marginBottom: '20px',
  padding: '30px 50px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
};

const App: React.FC = () => (
  <div style={style}>
    <Spin type="red" />
  </div>
);

export default App;
```

### 自定义描述文案

```jsx
import React from 'react';
import { Space, Spin } from 'future-ui';
import 'future-ui/es/spin/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => (
  <Space size={30}>
    <Spin tip="Loading" tipType="vertical" />
    <Spin tip="Loading" />
  </Space>
);
```
