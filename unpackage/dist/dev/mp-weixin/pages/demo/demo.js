"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      demo: "\u6211\u4E5F\u662F\u4E00\u4E2A\u5927\u5E05\u54E5"
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.demo)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uni_basic/uni_basic/pages/demo/demo.vue"]]);
wx.createPage(MiniProgramPage);
