--- 
title: Spin

order: 3

group:

    title: 通用组件

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
import { Spin } from '@future/all';
const style = {
  background: 'blue',
  color: 'white',
};

export default () => (
  <div>
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
  </div>
);
```