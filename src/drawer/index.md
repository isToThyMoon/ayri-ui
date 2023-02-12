---
category: Components
title: Drawer抽屉
subtitle: 抽屉
order: 4
group:
  title: Feedback反馈
  order: 6
demo:
  cols: 2
---

# Drawer 抽屉

> 屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。· 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
· 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

### 基础抽屉

基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。

```jsx
import React, { useState } from 'react';
import { Button, Space, Drawer } from 'future-ui';
import 'future-ui/es/drawer/style/index.less';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="基础抽屉"
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onClose}>
              确定
            </Button>
          </Space>
        }
      >
        <p>一些填充内容...</p>
        <p>一些填充内容...</p>
        <p>一些填充内容...</p>
      </Drawer>
    </>
  );
};

export default App;
```
