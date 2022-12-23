import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{
      type: 'component',
      dir: 'src',
    }],
    entryFile: './src/index.ts'
  },

  outputPath: 'docs-dist',
  themeConfig: {
    name: 'future-ui',
  },
});
