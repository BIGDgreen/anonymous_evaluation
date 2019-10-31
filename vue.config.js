// const mockIndexData = require("./mock/data/Swape");
const apiData = require("webpack-api-mocker");
var path = require('path');
module.exports = {
  //...
  devServer: {
    // before(app) {
    //   apiData(app, path.resolve('./mock/api.js'))
    // },
//
    port: 8888
  },
}

