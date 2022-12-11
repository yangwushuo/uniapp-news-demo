"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      historyNews: [],
      historyNewsStatus: true,
      noHistoryNewsPicUrl: "../../static/img/noNewsHistory.png",
      historyNewsPicUrl: "../../static/img/newsHistory.png"
    };
  },
  methods: {
    goNewsDetail(e) {
      common_vendor.index.navigateTo({
        url: `/pages/newsDetail/newsDetail?cid=${e.cid}&id=${e.id}`
      });
    },
    getHistoryNews() {
      var historyNews = common_vendor.index.getStorageSync("historyArr");
      if (historyNews) {
        this.historyNewsStatus = true;
      } else {
        this.historyNewsStatus = false;
      }
      this.historyNews = historyNews;
    }
  },
  onShow() {
    this.getHistoryNews();
  }
};
if (!Array) {
  const _easycom_newBox2 = common_vendor.resolveComponent("newBox");
  _easycom_newBox2();
}
const _easycom_newBox = () => "../../components/newBox/newBox.js";
if (!Math) {
  _easycom_newBox();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.historyNewsStatus ? $data.historyNewsPicUrl : $data.noHistoryNewsPicUrl,
    b: !$data.historyNewsStatus
  }, !$data.historyNewsStatus ? {} : {}, {
    c: common_vendor.f($data.historyNews, (item, k0, i0) => {
      return {
        a: item.id,
        b: common_vendor.o($options.goNewsDetail, item.id),
        c: "2f1ef635-0-" + i0,
        d: common_vendor.p({
          item
        })
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"], ["__file", "G:/uni_basic/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
