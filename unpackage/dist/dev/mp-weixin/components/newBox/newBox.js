"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "newBox",
  props: {
    item: {
      type: Object,
      default() {
        return {
          title: "\u65B0\u95FB\u6807\u9898",
          picurl: "/static/img/nopic.png",
          posttime: "2000-1-1 00:00:00",
          hits: "999",
          classid: "50",
          author: "\u76D8\u53E4",
          looktime: ""
        };
      }
    }
  },
  data() {
    return {
      titleClicked: false
    };
  },
  methods: {
    popPic() {
      this.$emit("popPic", this.item.picurl);
    },
    goNewsDetail() {
      this.titleClicked = true;
      this.$emit("goNewsDetail", {
        cid: this.item.classid,
        id: this.item.id,
        title: this.item.title
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.item.picurl,
    b: common_vendor.o((...args) => $options.popPic && $options.popPic(...args)),
    c: common_vendor.t($props.item.title),
    d: $data.titleClicked == true ? "#a5a9ab" : "",
    e: common_vendor.t($props.item.author),
    f: common_vendor.t($props.item.hits),
    g: $props.item.looktime
  }, $props.item.looktime ? {
    h: common_vendor.t($props.item.looktime)
  } : {
    i: common_vendor.t($props.item.posttime)
  }, {
    j: common_vendor.o((...args) => $options.goNewsDetail && $options.goNewsDetail(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-48b00000"], ["__file", "G:/uni_basic/components/newBox/newBox.vue"]]);
wx.createComponent(Component);
