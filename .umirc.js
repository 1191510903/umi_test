// ref: https://umijs.org/config/
const { routes } = require('./src/router/index');
const path = require('path');

function resolve(u) {
  return path.resolve(__dirname, u);
}

export default {
  base: '/zhang-platform',
  publicPath: '/zhang-platform/',
  singular: true,
  treeShaking: true,
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  chainWebpack(config, { webpack }) {
    config.module
      .rule('compile')
      .test(/\.js$/)
      .include.add(
        resolve('./node_modules/@ant-design/pro-utils/node_modules/fast-deep-equal/es6/react.js'),
      )
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [['@babel/preset-env', { modules: false }]],
      });
  },
  targets: {
    ie: 11,
  },
};
