import { name } from './package';
const configMerge  = require('../commonDependencies/appWebpackMerge')
const dependencies = require('./package.json').dependencies
if(dependencies){
  for(let k in dependencies){
    delete configMerge.resolve.alias[k]
  }
}

export default {
  base: '/app1',
  publicPath: '/app1/',
  outputPath: './dist/app1',
  mountElementId: 'app1',
  chainWebpack: function (config, { webpack }) {
    config.merge(configMerge)
  },
  plugins: [
    ['../../index.js'],
    [
      'umi-plugin-react',
      {
        title: 'app1',
        antd: true,
        dva: {
          immer: true,
          hmr: true,
        },
        dynamicImport: true,
        routes: {
          exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/],
        },
      },
    ],
  ],
};
