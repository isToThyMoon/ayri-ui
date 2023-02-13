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

# Upload 上传

## 基础说明

### 组件类型

基础 按钮 图形卡片 限制/不限制类上传

基础使用

```jsx
import React from 'react';
import { Button, Upload, Space } from 'future-ui';
import 'future-ui/es/upload/style/index.less';

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space direction="vertical">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          directory
        >
          <Button type="default" className="upload-base-wrap">
            <a>
              <i className="ft-icon icon-attachment" />
              上传图片
            </a>
          </Button>
        </Upload>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          directory
        >
          <Button type="default" className="upload-button-wrap">
            <a>
              <i className="ft-icon icon-attachment" />
              上传图片
            </a>
          </Button>
        </Upload>
      </Space>
    </div>
  );
};
```

### 上传 不限制类型

```tsx
import type { UploadProps } from 'future-ui';
import { Button, Upload } from 'future-ui';
import React from 'react';

const props: UploadProps = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  progress: {
    // strokeColor: {
    //   '0%': '#108ee9',
    //   '100%': '#87d068',
    // },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
  listType: 'picture',
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      // url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      // url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      // url: 'http://www.baidu.com/zzz.png',
    },
  ],
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button type="default" className="upload-button-wrap">
      <a>
        <i className="ft-icon icon-attachment" />
        上传图片
      </a>
    </Button>
  </Upload>
);

export default App;
```

### 上传 限制类型

限制为图片
自行传入需要限制的文件后缀名

```tsx
import type { UploadProps } from 'future-ui';
import { Button, Upload } from 'future-ui';
import React from 'react';

const props: UploadProps = {
  accept: '.png,.jpeg',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  progress: {
    // strokeColor: {
    //   '0%': '#108ee9',
    //   '100%': '#87d068',
    // },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
  listType: 'picture',
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      // url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      // url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      // url: 'http://www.baidu.com/zzz.png',
    },
  ],
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button type="default" className="upload-button-wrap">
      <a>
        <i className="ft-icon icon-attachment" />
        上传图片
      </a>
    </Button>
  </Upload>
);

export default App;
```

### 图形卡片式上传

多用于用户头像等

```tsx
import { Progress } from 'antd';
import 'antd/es/progress/style/index.css';
import { Upload } from 'future-ui';
import React, { useState } from 'react';
import type { UploadChangeParam } from './index.tsx';
import type { RcFile, UploadFile, UploadProps } from './interface';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    console.log('file', info.file);
    console.log('fileList', info.fileList);
    console.log('event', info.event);
    if (info.file.status === 'uploading') {
      setLoading(true);
      setPercent(info.file.percent);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        // setPercent(info.file.percent)
        setLoading(false);
        setImageUrl(url);
      });
    }

    if (info.file.status === 'error') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        // setPercent(info.file.percent)
        setLoading(false);
        // setImageUrl(url);
      });
    }
  };

  const uploadButton =
    // <div>
    //   {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //   <div style={{ marginTop: 8 }}>Upload</div>
    // </div>
    loading ? (
      <div style={{ width: '60px' }}>
        <Progress
          percent={percent}
          showInfo={false}
          strokeWidth={4}
          strokeColor="#00C88C"
          trailColor="#CED3D9"
        />
      </div>
    ) : (
      <i className="ft-icon icon-add" />
    );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default App;
```

### 照片墙

```tsx
import { Upload } from 'future-ui';
import React, { useState } from 'react';
import type { RcFile, UploadProps } from './index.tsx';
import type { UploadFile } from './interface';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    // <div>
    //   {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //   <div style={{ marginTop: 8 }}>Upload</div>
    // </div>
    <i className="ft-icon icon-add" />
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
    </>
  );
};

export default App;
```
