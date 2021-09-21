// vue.config.js
module.exports = {
    // options...
    devServer: {
        proxy: {
            proxy: 'http://localhost:3000/',
        }
    }
  }