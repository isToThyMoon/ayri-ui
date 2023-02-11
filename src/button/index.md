---
category: Components
title: Button按钮
subtitle: 按钮
order: 4
group: 通用
demo:
  cols: 2
---

# Button 按钮

> 按钮是一种使用广泛的基础界面元素, 也是页面即时操作主要媒介.

## 基础说明

### 组件构成

容器 按钮标题 图标（可选）

### 组件分类

主要按钮 次要按钮 线性按钮 图标按钮 文字按钮

### 状态属性

点击: 用于主行动点.

危险：删除/移动/修改权限等危险操作，一般需要二次确认。

幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。

禁用：行动点不可用的时候，一般需要文案解释。

加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

### 组件尺寸

```jsx
import React from 'react';
import { Space, Button } from 'future-ui';
import 'future-ui/es/button/style/index.less';

export default () => (
  <div>
    <Space>
      <Button type="primary" size="small">
        small
      </Button>
      <Button type="primary" size="middle">
        middle
      </Button>
      <Button type="primary" size="large">
        large
      </Button>
    </Space>
  </div>
);
```

### 类型

```jsx
import React from 'react';
import { Space, Button } from 'future-ui';
import 'future-ui/es/button/style/index.less';

export default () => (
  <div>
    <Space>
      <Button type="primary">primary</Button>
      <Button type="secondary-red">secondary-red</Button>
      <Button type="default-red">secondary-red</Button>
      <Button type="default-blue">default-blue</Button>
      <Button type="secondary">secondary</Button>
      <Button type="default">default</Button>
      <Button type="dashed">dashed</Button>
      <Button type="link">link</Button>
      <Button type="text">text</Button>
    </Space>
  </div>
);
```

### 形状

```jsx
import '@future/core/dist/style/fonts.css';
import React from 'react';
import { Space, Button } from 'future-ui';
import 'future-ui/es/button/style/index.less';

export default () => (
  <div>
    <Space>
      <Button type="primary">默认按钮</Button>
      <Button type="primary" shape="round">
        round按钮
      </Button>
      <Button type="primary" shape="circle">
        圆
      </Button>
    </Space>
  </div>
);
```

### icon 按钮

```jsx
import '@future/core/dist/style/fonts.css';
import React from 'react';
import { Space, Button } from 'future-ui';
import 'future-ui/es/button/style/index.less';

export default () => (
  <div>
    <Space>
      <Button type="primary">
        <i className="ft-icon icon-search"></i>
      </Button>
      <Button type="primary" shape="circle">
        <i className="ft-icon icon-search"></i>
      </Button>
      <Button type="primary" icon={<i className="ft-icon icon-search"></i>}>
        搜索按钮
      </Button>
    </Space>
  </div>
);
```

### 状态

四种状态属性与上面配合使用。
危险：删除/移动/修改权限等危险操作，一般需要二次确认。
幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
禁用：行动点不可用的时候，一般需要文案解释。
加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

```jsx
import '@future/core/dist/style/fonts.css';
import React from 'react';
import { Space, Button } from 'future-ui';
import 'future-ui/es/button/style/index.less';

export default () => (
  <div>
    <Space direction="vertical">
      danger危险:
      <Button type="primary" danger>
        danger
      </Button>
      ghost幽灵:
      <div
        style={{
          background: '#888888',
          height: '50px',
          paddingTop: '10px',
          paddingLeft: '10px',
        }}
      >
        <Space>
          <Button type="primary" ghost>
            ghost
          </Button>
          <Button type="secondary-blue" ghost>
            ghost
          </Button>
          <Button type="default" ghost>
            ghost
          </Button>
          <Button type="dashed" ghost>
            ghost
          </Button>
        </Space>
      </div>
      disabled禁用:
      <Space>
        <Button type="primary" disabled>
          primary
        </Button>
        <Button type="secondary-red" disabled>
          secondary-red
        </Button>
        <Button type="default-red" disabled>
          secondary-red
        </Button>
        <Button type="default-blue" disabled>
          default-blue
        </Button>
        <Button type="secondary" disabled>
          secondary
        </Button>
        <Button type="default" disabled>
          default
        </Button>
        <Button type="dashed" disabled>
          dashed
        </Button>
        <Button type="link" disabled>
          link
        </Button>
        <Button type="text" disabled>
          text
        </Button>
      </Space>
    </Space>
  </div>
);
```
