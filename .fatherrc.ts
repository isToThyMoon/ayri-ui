import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { 
    input: 'src',
    output: 'es' 
  },
  cjs: {
    input: 'src',
    output: 'lib'
  },
  umd: {
    name: 'future', 
    entry: 'src/index'
  },


});
