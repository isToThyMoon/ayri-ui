---
category: Components
title: Popconfirm气泡确认框
subtitle: 气泡确认框
order: 6
group:
  title: Feedback反馈
  order: 6
demo:
  cols: 2
---

# Popconfirm 气泡确认框

> 点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

### 基本

最简单用法
api 同 popover

```jsx
import React from 'react';
import { PopConfirm, Space } from 'future-ui';
import 'future-ui/es/popconfirm/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <PopConfirm title="Are you sure to delete this task?"></PopConfirm>
    </div>
  );
};
```

### 位置

位置有十二个方向。如需箭头指向目标元素中心，可自定义 icon。
