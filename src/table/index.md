---
category: Components
title: Table表格
subtitle: 表格
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
import { Table } from 'future-ui';
import type { ColumnsType } from '../table';

import 'future-ui/es/table/style/index.less';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: '200px',
        }}
      />
    </div>
  );
};
```
