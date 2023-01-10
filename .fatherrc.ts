import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    input: 'src',
    output: 'es',
  },
  cjs: {
    input: 'src',
    output: 'lib',
  },
  umd: {
    name: 'ayri-ui',
    entry: 'src/index',
    output: 'dist',
  },
  extraBabelPlugins: [
    [
      // 打包的产物若需引入 antd等第三方，也通过按需加载形式引入。
      'babel-plugin-import',
      {
        libraryName: 'ayri-ui',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
