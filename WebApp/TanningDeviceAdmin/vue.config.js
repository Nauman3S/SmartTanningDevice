// vue.config.js
module.exports = {
    // options...
    devServer: {
        proxyTable: {
            '/v1': {
               target: 'http://localhost:3000',
               changeOrigin: true // or true depending on your needs
            },
        },
    }
  }