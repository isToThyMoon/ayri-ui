---
category: Components
title: Progress进度条
subtitle: 进度条
order: 4
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
import { Progress, Space } from 'future-ui';
import 'future-ui/es/progress/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Progress percent={50} showInfo={false} />
    </div>
  );
};
```
