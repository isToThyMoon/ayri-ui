---
category: Components
title: Tooltip文字提示
subtitle: 文字提示
order: 5
group:
  title: 数据展示
  order: 6
demo:
  cols: 2
---

依赖 tooltip

## API

```jsx
import React from 'react';
import { Tooltip } from 'future-ui';
import 'future-ui/es/tooltip/style/index.less';

export default () => {
  return (
    <div>
      <Tooltip title="prompt text">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  );
};
```
