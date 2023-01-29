import { defineConfig } from 'dumi';

export default defineConfig({
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      {
        type: 'component',
        dir: 'src',
      },
    ],
    entryFile: './src/index.ts',
  },

  outputPath: 'docs-dist',
  themeConfig: {
    name: 'ayri-ui',
  },
  lessLoader: {
    math: 'always',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'ayri-ui',
        libraryDirectory: 'es',
        style: true,
      },
      'ayri-ui',
    ],
    // [
    //   'babel-plugin-import',
    //   {
    //     libraryName: 'antd',
    //     libraryDirectory: 'es',
    //     style: true,
    //   },
    //   'antd',
    // ],
  ],
  // chainWebpack(config) {
  //   console.log(config)
  //   config.module
  //     .rule('png')
  //     .test(/.(png)$/)
  //     .use('file-loader')
  //     .loader('file-loader');
  // }
});
