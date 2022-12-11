"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_tool = require("../../utils/tool.js");
const _sfc_main = {
  data() {
    return {
      detail: {
        title: "xxxx",
        author: "xxxx",
        posttime: 13413412341,
        content: "xxxxx",
        contentStatus: false,
        loadFailedPicUrl: "../../static/img/loadFailed.png"
      }
    };
  },
  methods: {
    getNewsDetail(data) {
      utils_request.API.get("/dataApi/news/detail.php", data).then((res) => {
        if (!res.id) {
          this.contentStatus = true;
          return;
        }
        res.content = res.content.replace(/<img/gi, '<img style="max-width:100%;border-radius:5px"');
        res.posttime = utils_tool.timestampFormat(res.posttime);
        this.detail = res;
        this.saveHistory();
        common_vendor.index.setNavigationBarTitle({
          title: this.detail.title
        });
      }).catch((err) => {
        this.contentStatus = true;
      });
    },
    saveHistory() {
      let historyArr = common_vendor.index.getStorageSync("historyArr") || [];
      let item = {
        id: this.detail.id,
        classid: this.detail.classid,
        picurl: this.detail.picurl,
        title: this.detail.title,
        author: this.detail.author,
        hits: this.detail.hits,
        looktime: utils_tool.timestampFormat(Date.now() / 1e3)
      };
      let index = historyArr.findIndex((i) => {
        return i.id == this.detail.id;
      });
      if (index >= 0) {
        historyArr.splice(index, 1);
      }
      historyArr.unshift(item);
      historyArr = historyArr.slice(0, 10);
      common_vendor.index.setStorageSync("historyArr", historyArr);
    }
  },
  onLoad(e) {
    this.getNewsDetail(e);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.detail.title),
    b: common_vendor.t($data.detail.author),
    c: common_vendor.t($data.detail.posttime),
    d: $data.detail.content,
    e: _ctx.contentStatus
  }, _ctx.contentStatus ? {
    f: _ctx.loadFailedPicUrl
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/uni_basic/pages/newsDetail/newsDetail.vue"]]);
wx.createPage(MiniProgramPage);
