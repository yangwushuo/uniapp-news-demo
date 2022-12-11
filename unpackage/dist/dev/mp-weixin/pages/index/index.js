"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_tool = require("../../utils/tool.js");
const _sfc_main = {
  data() {
    return {
      activeColumnIndex: "0",
      newColunmList: [],
      newList: [],
      page: 1,
      num: 10,
      noNewPicUrl: "../../static/img/nonew.png",
      refreshNewConfig: {
        refresherEnabled: true,
        refresherDefaultStyle: "none",
        refresherThreshold: 0,
        refresherTriggered: false,
        lowerThreshold: 50
      },
      moreShow: false,
      moreStatus: true,
      popPicConfig: {
        show: false,
        popPicUrl: ""
      }
    };
  },
  onLoad() {
    this.getNewColumn();
  },
  methods: {
    popNewBoxPicShow(e) {
      this.popPicConfig.show = true;
      this.popPicConfig.popPicUrl = e;
    },
    popNewBoxPicClose() {
      this.popPicConfig.show = false;
    },
    goNewsDetail(e) {
      common_vendor.index.navigateTo({
        url: `/pages/newsDetail/newsDetail?cid=${e.cid}&id=${e.id}`
      });
    },
    refreshNews() {
      this.getNews(1, 1);
    },
    contentWrapperBottom() {
      this.moreShow = true;
      this.moreStatus = true;
      this.page += 1;
      this.getNews(2);
    },
    changeActiveColunm(colunmIndex) {
      this.activeColumnIndex = colunmIndex;
      this.page = 1;
      this.getNews();
    },
    getNewColumn() {
      utils_request.API.get(
        "/dataApi/news/navlist.php",
        {}
      ).then((res) => {
        if (res.length == 0) {
          return;
        }
        this.newColunmList = res;
        this.activeColumnIndex = res[0].id;
        this.getNews();
      });
    },
    getNews(dir = 0, page = this.page) {
      utils_request.API.get("/dataApi/news/newslist.php", {
        cid: this.activeColumnIndex,
        num: this.num,
        page
      }).then((res) => {
        res.forEach((item) => {
          item.posttime = utils_tool.timestampFormat(item.posttime);
        });
        if (dir == 1) {
          res.forEach((nitem) => {
            var findRes = this.newList.find((oitem) => {
              return nitem.id == oitem.id;
            });
            console.log(findRes);
            if (!findRes.id) {
              this.newList.unshift(nitem);
            }
          });
        } else if (dir == 2) {
          if (res.length == 0) {
            this.moreStatus = false;
          } else {
            this.newList.push(...res);
            this.moreShow = false;
          }
        } else {
          this.newList = res;
          if (res.length < this.num) {
            this.moreShow = true;
            this.moreStatus = false;
          } else if (res.length == 5) {
            utils_request.API.get("/dataApi/news/newslist.php", {
              cid: this.activeColumnIndex,
              num: this.num,
              page: 2
            }).then((res2) => {
              if (res2.length == 0) {
                this.moreShow = true;
                this.moreStatus = false;
              }
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_newBox2 = common_vendor.resolveComponent("newBox");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_easycom_newBox2 + _component_van_popup)();
}
const _easycom_newBox = () => "../../components/newBox/newBox.js";
if (!Math) {
  _easycom_newBox();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.newColunmList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.classname),
        b: common_vendor.n($data.activeColumnIndex == item.id ? "new-column-active" : ""),
        c: item.id,
        d: common_vendor.o(($event) => $options.changeActiveColunm(item.id), item.id)
      };
    }),
    b: $data.newList.length != 0
  }, $data.newList.length != 0 ? common_vendor.e({
    c: common_vendor.f($data.newList, (item, k0, i0) => {
      return {
        a: item.id,
        b: common_vendor.o($options.popNewBoxPicShow, item.id),
        c: common_vendor.o($options.goNewsDetail, item.id),
        d: common_vendor.o(($event) => _ctx.goNewDetail(1), item.id),
        e: "1cf27b2a-0-" + i0,
        f: common_vendor.p({
          item
        })
      };
    }),
    d: $data.newList.length != 0 && $data.moreShow
  }, $data.newList.length != 0 && $data.moreShow ? common_vendor.e({
    e: $data.moreStatus
  }, $data.moreStatus ? {} : {}) : {}, {
    f: common_vendor.o((...args) => $options.contentWrapperBottom && $options.contentWrapperBottom(...args)),
    g: $data.refreshNewConfig.refresherEnabled,
    h: $data.refreshNewConfig.refresherDefaultStyle,
    i: $data.refreshNewConfig.refresherThreshold,
    j: $data.refreshNewConfig.lowerThreshold,
    k: $data.refreshNewConfig.refresherTriggered,
    l: common_vendor.o((...args) => $options.refreshNews && $options.refreshNews(...args))
  }) : {}, {
    m: $data.newList.length == 0
  }, $data.newList.length == 0 ? {
    n: $data.noNewPicUrl
  } : {}, {
    o: $data.popPicConfig.popPicUrl,
    p: common_vendor.o($options.popNewBoxPicClose),
    q: common_vendor.p({
      customStyle: "height: auto; background-color: transparent;",
      show: $data.popPicConfig.show
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "G:/uni_basic/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
