"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "https://ku.qingnian8.com";
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url || "",
      method: options.type || "GET",
      data: options.data || {},
      header: options.header || {}
    }).then((data) => {
      if (data.statusCode != 200) {
        reject("\u83B7\u53D6\u680F\u76EE\u5931\u8D25");
      } else {
        resolve(data.data);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};
const get = (url, data, options = {}) => {
  options.type = "GET";
  options.data = data;
  options.url = url;
  return request(options);
};
const post = (url, data, options = {}) => {
  options.type = "POST";
  options.data = data;
  options.url = url;
  return request(options);
};
const API = {
  request,
  get,
  post
};
exports.API = API;
