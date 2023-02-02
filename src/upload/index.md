---
category: Components
title: Upload上传组件
subtitle: 上传组件
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
import { Button, Upload, Space } from 'future-ui';
import 'future-ui/es/upload/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space direction="vertical">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          directory
        >
          <Button>Upload Directory</Button>
        </Upload>
      </Space>
    </div>
  );
};
```
