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

# Divider 分割线

> 分割线是一个细长、轻量的元素，用于对列表和页面布局中的内容进行分组，以便让内容生成更好的视觉效果及空间感。

## 基础说明

### 规则

界面设计中，线的宽度不超过 3 种

### 样式

分割线的样式分为实线和虚线两种，长短及方向可灵活变化。
分割线在不同分辨率下均为 1 像素。

### 颜色

颜色深浅有 3 档

```tsx
import { Divider } from 'future-ui';
import 'future-ui/es/divider/style/index.less';
import React from 'react';

export default () => (
  <div>
    <p>Line 01(实) 中性色 #CED3D9</p>
    <Divider style={{ borderColor: '#CED3D9' }} />
    <p>Line 02(实) 中性色 #DAE0E6</p>
    <Divider style={{ borderColor: '#DAE0E6' }} />
    <p>Line 03(实) 中性色 #E6ECF2</p>
    <Divider style={{ borderColor: '#E6ECF2' }} />
  </div>
);
```

dash

```tsx
import { Divider } from 'future-ui';
import 'future-ui/es/divider/style/index.less';
import React from 'react';

export default () => (
  <div>
    <p>Line 01(虚) 虚线Dash: 1PX 间隔Gap: 1PX</p>
    <Divider style={{ borderColor: '#CED3D9' }} dashed />
    <p>Line 02 (虚) 虚线Dash: 2PX 间隔Gap: 2PX</p>
    <Divider style={{ borderColor: '#CED3D9' }} customDashed />
  </div>
);
```

### 粗细

粗细有 3 档

```tsx
import { Divider } from 'future-ui';
import 'future-ui/es/divider/style/index.less';
import React from 'react';

export default () => (
  <div>
    <p>1px</p>
    <Divider style={{ borderWidth: '1px' }} />
    <p>2px</p>
    <Divider style={{ borderWidth: '2px' }} />
    <p>3px</p>
    <Divider style={{ borderWidth: '3px' }} />
  </div>
);
```

# 多间距

提供了 3/5/10/15/20/30/40/50PX 的间距样式

```tsx
import { Divider } from 'future-ui';
import 'future-ui/es/divider/style/index.less';
import React from 'react';

export default () => (
  <div>
    <div>3px</div>
    <Divider style={{ margin: '3px 0' }} />
    <div>5px</div>
    <Divider style={{ margin: '5px 0' }} />
    <div>10px</div>
    <Divider style={{ margin: '10px 0' }} />
    <div>15px</div>
    <Divider style={{ margin: '15px 0' }} />
    <div>20px</div>
    <Divider style={{ margin: '20px 0' }} />
    <div>30px</div>
    <Divider style={{ margin: '30px 0' }} />
    <div>40px</div>
    <Divider style={{ margin: '40px 0' }} />
    <div>50px</div>
    <Divider style={{ margin: '50px 0' }} />
  </div>
);
```

### 文案设置

在分割线上添加文字，也可以是字体图标

```tsx
import '@future/core/dist/style/fonts.css';
import { Divider } from 'future-ui';
import 'future-ui/es/divider/style/index.less';
import React from 'react';

export default () => (
  <div>
    <Divider orientation="left" orientationMargin={15}>
      分割线
    </Divider>
    <Divider orientation="center" orientationMargin={15}>
      <i className="ft-icon icon-star"></i>
    </Divider>
    <Divider orientation="right" orientationMargin={15}>
      分割线
    </Divider>
  </div>
);
```

### 垂直分割

垂直分割，间距/虚实线的样式

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
    <div>
      text
      <Divider type="vertical" style={{ margin: '0 3px' }} />
      text
      <Divider type="vertical" style={{ margin: '0 5px' }} />
      text
      <Divider type="vertical" style={{ margin: '0 10px' }} />
      text
      <Divider type="vertical" style={{ margin: '0 15px' }} />
      text
      <Divider type="vertical" style={{ margin: '0 20px' }} />
      text
      <Divider type="vertical" style={{ margin: '0 30px' }} />
      text
      <Divider type="vertical" style={{ margin: '0 40px' }} />
      text
      <Divider type="vertical" style={{ margin: '0 50px' }} />
    </div>

    <div>
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 3px', borderStyle: 'dotted' }}
      />
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 5px', borderStyle: 'dotted' }}
      />
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 10px', borderStyle: 'dotted' }}
      />
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 15px', borderStyle: 'dotted' }}
      />
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 20px', borderStyle: 'dotted' }}
      />
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 30px', borderStyle: 'dotted' }}
      />
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 40px', borderStyle: 'dotted' }}
      />
      text
      <Divider
        type="vertical"
        dashed
        style={{ margin: '0 50px', borderStyle: 'dotted' }}
      />
    </div>
  </div>
);
```
