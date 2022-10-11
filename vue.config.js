const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy:{
      '/e':{
        target:'http://cookbooksoft.com',
        changeOrigin:true,
        pathRewrite:{
          '':''
        }
      }
    }
  }
})
