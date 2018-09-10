import typescript from 'rollup-plugin-typescript2';

import path from 'path';

const rootFolder = (...filePath) => path.join(...filePath);
const srcFolder = (...filePath) => rootFolder('src', ...filePath);
const outFolder = (...filePath) => rootFolder('dist', ...filePath);

export default {
    input: srcFolder('main.ts'),
    output: {
      name: 'classification',
      file: outFolder('classifier.js'),
      format: 'umd'
    },
    plugins: [
        typescript({ typescript: require('typescript') })
    ],
};
