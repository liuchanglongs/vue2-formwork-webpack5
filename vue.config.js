/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-15 11:01:04
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-15 18:51:15
 * @Description: lcl
 */
const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');

const env = process.env.NODE_ENV === 'production' ? true : false;
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const port = 9527;
let localhost = '';
try {
  const network = os.networkInterfaces();
  localhost = network[Object.keys(network)[0]][3].address;
} catch (e) {
  localhost = 'localhost';
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    // webpack5 :自动open，拿不到地址
    host: localhost,
    port,
    proxy: {
      '/api': {
        target: 'http://192.168.170.61:2020',
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/image/icons/svgs')) //注意svg的存储地址
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/image/icons/svgs')) //注意svg的存储地址
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },

  // 2. 生产环境不需要source-map文件
  productionSourceMap: env ? false : true,
  configureWebpack: config => {
    config.resolve = {
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.vue',
        '.json',
        '.wasm',
        '.css',
        '.less',
        '.sass',
      ],
      alias: {
        '@': resolve('src'),
        vue: 'vue/dist/vue.esm.js',
      },
    };
    let plugins = [];

    if (env) {
      plugins = [
        //1.开启js、cs代码压缩  @5.0.1版本：最新版有问题
        new CompressionPlugin({
          algorithm: 'gzip', // 使用gzip压缩
          test: /\.js$|\.css$|\.json$/, // 匹配文件名
          filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
          minRatio: 0.8, // 压缩率小于1才会压缩
          threshold: 10240, // 对超过10k的数据压缩
          // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
          deleteOriginalAssets: false,
        }),
        // 3. 清除log与注释
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'], //移除console
            },
          },
        }),
        // 打包后文件分析
        new BundleAnalyzerPlugin(),
      ];
      config.optimization = {
        // HashedModuleIdsPlugin--》加快打包速度
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        // 4.提取公用文件防止打包重复:不支持配饰fileName
        // runtime相关的代码指的是在运行环境中修改哪里的代码就直接加载哪里
        // runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            //第三方库抽离
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              minSize: 20000,
              maxSize: 50 * 1024,
              minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
              priority: 100, //权重
            },
            // 公用函数抽离
            plugins: {
              name: 'plugins-vendors',
              test: /[\\/]src[\\/]plugins[\\/]/,
              chunks: 'all',
              minSize: 20000,
              maxSize: 50 * 1024,
              minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
              priority: 90, //权重
            },
            //样式抽离
            styles: {
              chunks: 'all',
              name: 'conmonStyle',
              test: /\.(sa|sc|c|le)ss$/,
              enforce: true,
              priority: 80, //权重
              minSize: 20000,
              maxSize: 50 * 1024,
            },
          },
        },
      };
    }

    if (plugins.length > 0) {
      return { plugins };
    }
  },
});
