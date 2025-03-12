const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
