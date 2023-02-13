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

# Input 输入框

> 通过鼠标或键盘输入字符

## 基础说明

### 组件类型

单行输入框和多行输入框

### 组件类型

默认
前置/后置标签( 用于配置一些固定组合)
搜索框
带说明/可清空
密码框
带 icon 的输入框
文本域(带数字提示)
输入时聚焦显示样式

### 组件尺寸

输入框定义了三种尺寸（大、默认、小），高度分别为 40px、31px 和 26px。
大小对应关系: large 对应 1920 middle 对应 1920 /1366 small 对应 1024

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
    <div>
      <div>
        <Space direction="vertical">
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}>常规</div>
            <div style={{ width: '260px' }}>
              <Input />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}>disabled</div>
            <div style={{ width: '260px' }}>
              <Input disabled />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}>error</div>
            <div style={{ width: '260px' }}>
              <Input status="error" />
            </div>
          </Space>
        </Space>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Space direction="vertical">
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}>large</div>
            <div style={{ width: '260px' }}>
              <Input size="large" />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}>middle</div>
            <div style={{ width: '260px' }}>
              <Input size="middle" />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}>small</div>
            <div style={{ width: '260px' }}>
              <Input size="small" />
            </div>
          </Space>
        </Space>
      </div>
    </div>
  );
};
```

### 前置/后置标签( 用于配置一些固定组合)

```jsx
import '@future/core/dist/style/fonts.css';
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space>
        <Input
          addonBefore={
            <i
              className="ft-icon icon-mail"
              style={{ fontSize: '20px', lineHeight: '29px' }}
            ></i>
          }
        />
        <Input addonBefore={'US$'} />
        <Input addonAfter={'US$'} />
      </Space>
    </div>
  );
};
```

### 搜索框(带有搜索按钮的输入框)

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Space>
        <Search placeholder="search" />
        <Search enterButton="Search" />
        <Search size="large" enterButton="Search" />
      </Space>
      <br />
      允许清除
      <br />
      <br />
      <Space>
        <Search allowClear placeholder="search" />
        <Search allowClear enterButton="Search" />
        <Search size="large" allowClear enterButton="Search" />
      </Space>
    </div>
  );
};
```

### 带 icon 的输入框

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
        <Input prefix={<i className="ft-icon icon-search"></i>} />
        <Input suffix={<i className="ft-icon icon-batch"></i>} />
      </Space>
    </div>
  );
};
```

### 文本域（带数字提示）

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
    <div style={{}}>
      <TextArea
        showCount
        style={{ width: '400px' }}
        maxLength={100}

        // autoSize={{minRows:2, MaxRows: 6}}
      />
      <br />
      <TextArea
        showCount
        style={{ width: '400px' }}
        maxLength={100}
        disabled
        // autoSize={{minRows:2, MaxRows: 6}}
      />
      <br />
      <TextArea
        showCount
        style={{ width: '400px' }}
        maxLength={100}
        status="error"
        // autoSize={{minRows:2, MaxRows: 6}}
      />
    </div>
  );
};
```

### 输入时聚焦显示样式

应用于没有足够空间时,需要强调显示的内容
规则:最大宽 300Px,自适应宽度,超出折行。

```jsx
import React from 'react';
import { Input, Space } from 'future-ui';
import 'future-ui/es/input/style/index.less';

export default () => {
  return (
    <div>
      <div>
        <Space direction="vertical">
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}></div>
            <div style={{ width: '100px' }}>
              <Input overflowVisible />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}></div>
            <div style={{ width: '260px' }}>
              <Input overflowVisible />
            </div>
          </Space>
        </Space>
      </div>
    </div>
  );
};
```
