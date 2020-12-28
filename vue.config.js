/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: vue-cli 配置
 * @Date: 2020-08-03 14:14:25
 * @LastEditTime: 2020-08-14 17:26:24
 */
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const webpack = require('webpack')
const { resolve } = require('path')

// NOTE: 监控loader处理
const smp = new SpeedMeasureWebpackPlugin()
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    sourceMap: process.env.NODE_ENV !== 'production',
  },
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://pos-dev.sdongpo.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return smp.wrap({
        plugins: [
          // NOTE: 增加stylelint
          new StyleLintPlugin({
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            fix: true,
            lintDirtyModulesOnly: true,
            emitWarning: true,
          }),
          // NOTE: 开启gzip压缩
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            deleteOriginalAssets: false,
            // NOTE: 设置生成`gzip`文件大小 100K
            threshold: 100 * 1024,
            minRatio: 0.8,
            cache: true,
          }),
          // NOTE: webpack 优化,增加变量提升
          new webpack.optimize.ModuleConcatenationPlugin(),
        ],
        performance: {
          hints: 'warning',
          //入口起点的最大体积
          maxEntrypointSize: 50000000,
          //生成文件的最大体积
          maxAssetSize: 30000000,
          //只给出 js 文件的性能提示
          assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js')
          },
        },
        optimization: {
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxInitialRequests: Infinity,
            cacheGroups: {
              commons: {
                test: module => {
                  return /[\\/]node_modules[\\/]/.test(module.context) && !/vue|vuex|vue-router|vue-i18n|vuex-persistedstate|vuex-router-sync/.test(module.context)
                },
                chunks: 'async',
                name: 'commons',
                minSize: 0, //如果模块的大小大于多少的话才需要提取
                minChunks: 2, //最少最几个chunk引用才需要提取
                priority: -20,
              },
              vendors: {
                test: module => {
                  return /[\\/]node_modules[\\/]/.test(module.context) && !/vue|vuex|vue-router|vue-i18n|vuex-persistedstate|vuex-router-sync/.test(module.context)
                },
                chunks: 'initial', // 指定分割的类型，默认3种选项 all async initial
                name: 'vendors', // 给分割出去的代码块起一个名字叫vendors
                priority: -10, // 优先级
              },
              vueBase: {
                name: 'vueBase',
                test: module => {
                  return /vue|vuex|vue-router|vue-i18n|vuex-persistedstate|vuex-router-sync/.test(module.context)
                },
                chunks: 'initial',
                priority: 12,
              },
              componentCommon: {
                name: 'component-commons',
                test: resolve(__dirname, './src/components'), // 可自定义拓展你的规则
                minChunks: 2, // 最小共用次数
                priority: 5,
                reuseExistingChunk: true,
              },
            },
          },
        },
        resolve: {
          alias: {
            component: resolve('src/components'),
          },
        },
      })
    } else {
      return {
        plugins: [
          // NOTE: 增加stylelint
          new StyleLintPlugin({
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            fix: true,
            lintDirtyModulesOnly: true,
            emitWarning: true,
          }),
        ],
        resolve: {
          alias: {
            component: resolve('src/components'),
          },
        },
      }
    }
  },
}
