// vue.config.js
module.exports = {
    dev: {
      proxyTable: {
        "/": "http://127.0.0.1:3000/api/v1/loginAdmin"
      }
    }
  }