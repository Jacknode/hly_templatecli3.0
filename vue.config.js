/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-21 14:25:56
 * @LastEditTime: 2019-10-14 14:31:29
 * @LastEditors: Please set LastEditors
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  publicPath: './',
  assetsDir: "static",
  productionSourceMap: false,
  outputDir: 'EightSymbol_backstage',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://cs.xhfwy.com/public/index.php',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false,
  configureWebpack: config => {
    //gzip
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      config.plugins.push(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      );

    } else {
      // 开发环境
    }
    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
    config.externals = {
      'vue': 'Vue',
    }
  },
  chainWebpack: config => {
    // config.optimization.delete('splitChunks')
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

  }
}