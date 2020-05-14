import { name } from './package';
const configMerge  = require('../commonDependencies/appWebpackMerge')
const dependencies = require('./package.json').dependencies
if(dependencies){
  for(let k in dependencies){
    delete configMerge.resolve.alias[k]
  }
}

export default {
  base: '/app3',
  publicPath: '/app3/',
  outputPath: './dist/app3',
  mountElementId: 'app3',
  chainWebpack: function (config, { webpack }) {
    config.merge(configMerge)
  },
  plugins: [
    ['../../index.js'],
    [
      'umi-plugin-react',
      {
        title: 'app3',
        antd: true,
        dva: {
          immer: true,
          hmr: true,
        },
        dynamicImport: true,
        routes: [
          { path: '/', exact: true, component: './pages/index.js' },
          { path: '/:abc', component: './pages/$abc.js' },
          { path: '/users', component: './pages/users/index.js' },
        ],
      },
    ],
  ],
};
