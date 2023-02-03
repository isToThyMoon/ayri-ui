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

popconfirm 依赖 popover popover 依赖 tootip

## 代码演示

大小

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
      <PopConfirm></PopConfirm>
    </div>
  );
};
```
