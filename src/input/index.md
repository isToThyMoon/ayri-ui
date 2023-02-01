---
category: Components
title: Input输入框
subtitle: 输入框
order: 4
group:
  title: Data Entry数据录入
  order: 6
demo:
  cols: 2
---

代办：
搜索按钮默认替换
clear 图标替换

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 代码演示

大小

```jsx
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space direction="vertical">
        <Input size="small" value={'输入'} />
        <Input size="middle" value={'输入'} />
        <Input size="large" value={'输入'} />

        <Input size="small" value={'输入'} addonBefore={'dada'} />
        <Input size="middle" value={'输入'} addonBefore={'dada'} />
        <Input size="large" value={'输入'} addonAfter={'dada'} />
      </Space>
    </div>
  );
};
```

```jsx
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space>
        <Input size="large" value={'输入'} addonBefore={'dada'} />

        <Input size="large" value={'输入'} addonAfter={'dada'} />
      </Space>
    </div>
  );
};
```

搜索框(带有搜索按钮的输入框)
允许清空

```jsx
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

const { Search } = Input;

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space>
        <Search allowClear />
        <Search allowClear enterButton="Search" />
        <Search size="large" allowClear enterButton="Search" />
      </Space>
    </div>
  );
};
```

```jsx
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

const { Search } = Input;

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space>
        <Search />
        <Search size="large" value={'输入'} />
        <Search size="large" value={'输入'} enterButton="Search" />
      </Space>
    </div>
  );
};
```

带 icon 的输入框

```jsx
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

const { Search } = Input;

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space>
        <Input prefix="￥" suffix="RMB" />
      </Space>
    </div>
  );
};
```

textarea

```jsx
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

const { TextArea } = Input;

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space>
        <TextArea showCount maxLength={100} />
      </Space>
    </div>
  );
};
```
