---
title: Space间距
order: 4
group:
  title: Layout布局
  order: 2
---

# Space 间距

> 设置组件之间的间距

## 基础说明

模块间距（可以 5PX 为单位递增递减）
5px (用于 icon 和文字组合)
10px（用于表单/适配小屏幕）
20px（用于带有卡片的页面，如首页、展示厅）
30px（用于专题/展示页面）
40px（用于专题）

通过传入 size 属性设置 space 间距，默认六种 string 类型值：
size='nano' : 5px,
small: 10,
middle: 15,
large: 20,
extreme: 30,
supreme: 40,

也可以直接传入 number 设置间距

### 常规间距 大中小

```tsx
import { Space } from '@future/all';
import React from 'react';

const PlainStyle = {
  width: '135px',
  height: '80px',
  background: '#FFF',
  border: '1px solid #DAE0E6',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const Graystyle = {
  width: '135px',
  height: '80px',
  background: '#CED3D9',
};

export default () => {
  return (
    <div>
      <Space size={35} direction="vertical">
        <div>
          <Space size="small">
            <div style={PlainStyle}>
              <div>Small</div>
              <div>10px</div>
            </div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
          </Space>
        </div>
        <div>
          <Space size="middle">
            <div style={PlainStyle}>
              <div>Middle</div>
              <div>15px</div>
            </div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
          </Space>
        </div>
        <div>
          <Space size="large">
            <div style={PlainStyle}>
              <div>Large</div>
              <div>20px</div>
            </div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
          </Space>
        </div>
        <div>
          <Space size="extreme">
            <div style={PlainStyle}>
              <div>Extreme</div>
              <div>30px</div>
            </div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
          </Space>
        </div>
        <div>
          <Space size="supreme">
            <div style={PlainStyle}>
              <div>Supreme</div>
              <div>40px</div>
            </div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
            <div style={Graystyle}></div>
          </Space>
        </div>
      </Space>
    </div>
  );
};
```

## API

### Space

| 参数      | 说明                                   | 类型                                     | 默认值       |
| --------- | -------------------------------------- | ---------------------------------------- | ------------ |
| align     | 对齐方式                               | `start` \| `end` \|`center` \|`baseline` | -            |
| direction | 间距方向                               | `vertical` \| `horizontal`               | `horizontal` |
| size      | 间距大小                               | [Size](#Size) \| [Size\[\]](#Size)       | `small`      |
| split     | 设置拆分                               | ReactNode                                | -            |
| wrap      | 是否自动换行，仅在 `horizontal` 时有效 | boolean                                  | false        |

### Size

`'small' | 'middle' | 'large' | 'extreme' | 'supreme'| number`
