"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/request.js"),o=require("../../utils/tool.js"),i={data:()=>({activeColumnIndex:"0",newColunmList:[],newList:[],page:1,num:10,noNewPicUrl:"../../static/img/nonew.png",refreshNewConfig:{refresherEnabled:!0,refresherDefaultStyle:"none",refresherThreshold:0,refresherTriggered:!1,lowerThreshold:50},moreShow:!1,moreStatus:!0,popPicConfig:{show:!1,popPicUrl:""}}),onLoad(){this.getNewColumn()},methods:{popNewBoxPicShow(e){this.popPicConfig.show=!0,this.popPicConfig.popPicUrl=e},popNewBoxPicClose(){this.popPicConfig.show=!1},goNewsDetail(t){e.index.navigateTo({url:`/pages/newsDetail/newsDetail?cid=${t.cid}&id=${t.id}`})},refreshNews(){this.getNews(1,1)},contentWrapperBottom(){this.moreShow=!0,this.moreStatus=!0,this.page+=1,this.getNews(2)},changeActiveColunm(e){this.activeColumnIndex=e,this.page=1,this.getNews()},getNewColumn(){t.API.get("/dataApi/news/navlist.php",{}).then((e=>{0!=e.length&&(this.newColunmList=e,this.activeColumnIndex=e[0].id,this.getNews())}))},getNews(e=0,i=this.page){t.API.get("/dataApi/news/newslist.php",{cid:this.activeColumnIndex,num:this.num,page:i}).then((i=>{i.forEach((e=>{e.posttime=o.timestampFormat(e.posttime)})),1==e?i.forEach((e=>{var t=this.newList.find((t=>e.id==t.id));console.log(t),t.id||this.newList.unshift(e)})):2==e?0==i.length?this.moreStatus=!1:(this.newList.push(...i),this.moreShow=!1):(this.newList=i,i.length<this.num?(this.moreShow=!0,this.moreStatus=!1):5==i.length&&t.API.get("/dataApi/news/newslist.php",{cid:this.activeColumnIndex,num:this.num,page:2}).then((e=>{0==e.length&&(this.moreShow=!0,this.moreStatus=!1)})))}))}}};if(!Array){(e.resolveComponent("newBox")+e.resolveComponent("van-popup"))()}Math;const s=e._export_sfc(i,[["render",function(t,o,i,s,n,r){return e.e({a:e.f(n.newColunmList,((t,o,i)=>({a:e.t(t.classname),b:e.n(n.activeColumnIndex==t.id?"new-column-active":""),c:t.id,d:e.o((e=>r.changeActiveColunm(t.id)),t.id)}))),b:0!=n.newList.length},0!=n.newList.length?e.e({c:e.f(n.newList,((o,i,s)=>({a:o.id,b:e.o(r.popNewBoxPicShow,o.id),c:e.o(r.goNewsDetail,o.id),d:e.o((e=>t.goNewDetail(1)),o.id),e:"67e367b4-0-"+s,f:e.p({item:o})}))),d:0!=n.newList.length&&n.moreShow},0!=n.newList.length&&n.moreShow?e.e({e:n.moreStatus},(n.moreStatus,{})):{},{f:e.o(((...e)=>r.contentWrapperBottom&&r.contentWrapperBottom(...e))),g:n.refreshNewConfig.refresherEnabled,h:n.refreshNewConfig.refresherDefaultStyle,i:n.refreshNewConfig.refresherThreshold,j:n.refreshNewConfig.lowerThreshold,k:n.refreshNewConfig.refresherTriggered,l:e.o(((...e)=>r.refreshNews&&r.refreshNews(...e)))}):{},{m:0==n.newList.length},0==n.newList.length?{n:n.noNewPicUrl}:{},{o:n.popPicConfig.popPicUrl,p:e.o(r.popNewBoxPicClose),q:e.p({customStyle:"height: auto; background-color: transparent;",show:n.popPicConfig.show})})}],["__scopeId","data-v-67e367b4"]]);wx.createPage(s);
