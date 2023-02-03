import { Popover } from '@future/popover/dist/react';
import '@future/popover/dist/style.css';
import * as React from 'react';
import Button from '../button';
import Input from '../input';

export interface popconfirmProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onConfirm?: (inputText: string) => void;
  onCancel?: () => void;
}

export const PopConfirm: React.FC<popconfirmProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [inputText, setInputText] = React.useState('');

  const handleCancel = () => {
    setVisible(false);
    props?.onCancel?.();
  };

  const handleConfirm = () => {
    setVisible(false);
    props?.onConfirm?.(inputText);
  };

  const content = (
    <div className="future-popconfirm-wrap">
      <div className="future-popconfirm-title">
        <span>{props.icon || 'icon'}</span>
        <span>{props?.title}</span>
      </div>
      <div className="future-popconfirm-input-wrap">
        <Input
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></Input>
      </div>
      <div className="future-popconfirm-operate">
        <Button type="primary" onClick={handleCancel}>
          {props.okText || '确定'}
        </Button>
        <Button type="secondary" onClick={handleConfirm}>
          {props.cancelText || '取消'}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      visible={visible}
      interactive
      onClickOutside={() => setVisible(false)}
    >
      <div
        onClick={() => {
          visible ? setVisible(false) : setVisible(true);
        }}
      >
        <Button type="primary">Click</Button>
      </div>
    </Popover>
  );
};
