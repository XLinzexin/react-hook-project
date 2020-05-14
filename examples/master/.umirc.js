const path = require('path')
export default {
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 2,
          automaticNameDelimiter: '.',
          cacheGroups: {
            axios: {
              name: "axios",
              test: /[\\/]node_modules[\\/]axios[\\/]/,
              chunks: "all",
              priority: -2
            }
          }
        }
      }
    })
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
    '/api/app1': {
      target: 'http://localhost:8001',
      changeOrigin: true,
    },
    '/api/app3': {
      target: 'http://localhost:8002',
      changeOrigin: true,
    },
  },
  plugins: [
    [
      '../../index',
      {
        master: {
          defer: true,
          jsSandbox: true,
          prefetch: true,
        }
      },
    ],
    [
      'umi-plugin-react',
      {
        title: 'chatly',
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
