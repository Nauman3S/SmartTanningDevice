// vue.config.js
module.exports = {
    devServer: {
      proxyTable: {
        "/": "http://127.0.0.1:3000/api/v1/loginAdmin"
      }
    }
  }