# ayri-ui

[![NPM version](https://img.shields.io/npm/v/future-ui.svg?style=flat)](https://npmjs.org/package/future-ui)
[![NPM downloads](http://img.shields.io/npm/dm/future-ui.svg?style=flat)](https://npmjs.org/package/future-ui)

UI components

## Usage

TODO

## Options

TODO

## Development

```bash
# install dependencies
$ npm install

# develop library by docs demo
$ npm start

# build library source code
$ npm run build

# build library source code in watch mode
$ npm run build:watch

# build docs
$ npm run docs:build

# check your project for potential problems
$ npm run doctor
```

## LICENSE

MIT

node 14.16.1
npm 6.14.12

# 开发记录

button 组件

size： 大 中 小 默认圆角 但圆角可配置

种类：
主按钮：用于主行动点，一个操作区域只能有一个主按钮。
默认按钮：用于没有主次之分的一组行动点。
虚线按钮：常用于添加操作。
文本按钮：用于最次级的行动点。
链接按钮：一般用于链接，即导航至某位置。

四种状态属性与上面配合使用。
危险：删除/移动/修改权限等危险操作，一般需要二次确认。
幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
禁用：行动点不可用的时候，一般需要文案解释。
加载中：用于异步操作等待反馈的时候，也可以避免多次提交。
