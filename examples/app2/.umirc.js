import { name } from './package';
const configMerge  = require('../commonDependencies/appWebpackMerge')
const dependencies = require('./package.json').dependencies
if(dependencies){
  for(let k in dependencies){
    delete configMerge.resolve.alias[k]
  }
}

export default {
  base: name,
  publicPath: '/app2/',
  outputPath: './dist/app2',
  mountElementId: 'app2',
  chainWebpack: function (config, { webpack }) {
    config.merge(configMerge)
  },
  plugins: [
    ['../../slave', {
      keepOriginalRoutes: true
    }],
    [
      'umi-plugin-react',
      {
        title: 'app2',
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
