const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  transpileDependencies: true,
  // devServer: {
  //   open: true,
  //   port: 8081,
  //   proxy: {
  //     // 匹配所有以 '/api'开头的请求路径
  //     "/api": {
  //       target: "http://127.0.0.1:5000", // 代理目标的基础路径
  //       changeOrigin: true,
  //       pathRewrite: { "^/api": "" },
  //     },
  //   },
  // },
})
