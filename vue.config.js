const path = require('path')

module.exports = {
  // publicPath: '././', // 相对路径 -> 可以提交到SVN
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '././',
  outputDir: process.env.VUE_APP_CURRENTMODE === 'apk' ? 'app/www' : 'dist', // 配置这个地方
  // assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  chainWebpack (config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.module.rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/i)
      .use('url-loader')
      .loader('url-loader')
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('source-map')
      )
    // 分离打包
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve('src/components/widgets'), // can customize your rules
                  minChunks: 2, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        'appId': 'com.xuchao.hqft', // 包名,程序的唯一标识符
        'productName': 'LampControlExe', // 项目名，也是生成的安装文件名，即LampControl.exe
        'copyright': 'HQFT Copyright © 2020', // 版权信息
        'compression': 'store', // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
        'files': [
          './**/*'
        ],
        'extraResources': [
          'static/'
        ],
        // 'extraFiles': [ // 把指定的资源复制到程序根目录，即把server文件夹的内容复制到程序根目录，这里server文件夹下的内容相当于我的后台，我在background.js中有相应的处理。
        //   './hqft'
        // ],
        'directories': {
          'output': './release' // 输出文件路径
        },
        'asar': false, // asar打包
        'publish': [
          {
            'provider': 'generic',
            'url': 'http://10.98.98.182:8000/file/%E5%85%B6%E4%BB%96/release' // 更新服务器地址,可为空
          }
        ],
        'win': { // win相关配置
          'icon': './app.ico', // 图标，当前图标在根目录下，注意图标格式，保证图标存在；
          'requestedExecutionLevel': 'requireAdministrator', // 获取管理员权限
          'target': [{
            'target': 'nsis', // 利用nsis制作安装程序
            'arch': [ // 这个意思是打出来32 bit + 64 bit的包，但是这样打包出来的安装包体积比较大
              'x64', // 64位
              'ia32'
            ]
          }]
        },
        'nsis': {
          'oneClick': false, // 是否一键安装
          'allowElevation': true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          'allowToChangeInstallationDirectory': true, // 允许修改安装目录
          'installerIcon': './app.ico', // 安装图标
          'uninstallerIcon': './app.ico', // 卸载图标
          'installerHeaderIcon': './app.ico', // 安装时头部图标
          'createDesktopShortcut': true, // 创建桌面图标
          'createStartMenuShortcut': true, // 创建开始菜单图标
          'shortcutName': 'LampControlExe', // 图标名称(项目名称)
          'license': 'LICENSE.txt' // 说明文件
        }
      }
    }
  },
  devServer: {
    // proxy: {
    //   '/': {
    //     target: 'http://10.29.175.5:8088/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
    //     ws: false,
    //     changOrigin: true, // 允许跨域
    //     pathRewrite: {
    //       '^/': ''// 请求的时候使用这个api就可以
    //     }
    //   }
    // },
    host: '0.0.0.0',
    // port: 8084,
    disableHostCheck: true
  }
}
