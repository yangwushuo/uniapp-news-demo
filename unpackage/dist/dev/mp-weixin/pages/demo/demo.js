"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      viewData: {
        text: "\u6211\u662F\u4E00\u4E2A\u5927\u5E05\u54E5",
        hoverStartTime: 0,
        hoverClass: "view-hover"
      },
      textData: {
        text: "\u6211\u4E5F\u662F\u4E00\u4E2A\u5927\u5E05\u54E5"
      },
      scrollData: {
        scrollY: true
      },
      swiperData: {
        indicatorDots: true,
        autoplay: true,
        interval: 55e3,
        imageData: {
          src: [
            "../../static/img/portrait_1.JPEG",
            "../../static/img/portrait_2.JPEG",
            "../../static/img/portrait_3.JPEG",
            "../../static/img/portrait_4.JPEG"
          ],
          mode: "widthFix"
        }
      },
      progressData: {
        pgList: [0, 25, 50, 75, 100]
      },
      audioData: {}
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.viewData.text),
    b: $data.viewData.hoverStartTime,
    c: $data.viewData.hoverClass,
    d: common_vendor.t($data.viewData.text),
    e: common_vendor.t($data.textData.text),
    f: common_vendor.t($data.textData.text),
    g: common_vendor.f(6, (value, index, i0) => {
      return {
        a: common_vendor.t(value),
        b: index
      };
    }),
    h: $data.viewData.hoverClass,
    i: $data.scrollData.scrollY,
    j: common_vendor.f($data.swiperData.imageData.src, (value, index, i0) => {
      return {
        a: value,
        b: index
      };
    }),
    k: $data.swiperData.imageData.mode,
    l: $data.swiperData.indicatorDots,
    m: $data.swiperData.autoplay,
    n: $data.swiperData.interval,
    o: $data.progressData.pgList[2]
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uni_basic/uni_basic/pages/demo/demo.vue"]]);
wx.createPage(MiniProgramPage);
