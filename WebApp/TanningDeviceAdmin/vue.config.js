// vue.config.js
module.exports = {
    // options...
    devServer: {
        proxyTable: {
            "/": "http://localhost:3000/v1/login"
          }
    }
  }