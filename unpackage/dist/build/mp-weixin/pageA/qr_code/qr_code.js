(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pageA/qr_code/qr_code"],{"0b62":function(e,t,n){},1764:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=c(n("a34a")),a=c(n("5088"));function c(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,o,a,c,s){try{var i=e[c](s),r=i.value}catch(u){return void n(u)}i.done?t(r):Promise.resolve(r).then(o,a)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var c=e.apply(t,n);function i(e){s(c,o,a,i,r,"next",e)}function r(e){s(c,o,a,i,r,"throw",e)}i(void 0)}))}}var r={components:{},data:function(){return{canvasW:0,canvasH:0,SystemInfo:{},goodsImg:{},ewmImg:{},ewmW:200,title:"COCOSILIYA抖音爆款男女士鎏金沙香水持久自然淡香流沙金香水",price:"158.00",Oldprice:"350.00",name:"天涯过客",photo:""}},onLoad:function(){var t=this;return i(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.getCode().then((function(e){console.log(e.path)})),a=e.getStorageSync("qrcode"),n.next=4,t.getSystemInfo();case 4:return t.SystemInfo=n.sent,n.next=7,t.getImageInfo("https://huaxue.juaiweb.com/storage/static/images/index1.png");case 7:return t.goodsImg=n.sent,n.next=10,t.getImageInfo(a);case 10:t.ewmImg=n.sent,t.canvasW=t.SystemInfo.windowWidth,t.canvasH=t.goodsImg.height+t.ewmW+50,"getImageInfo:ok"==t.goodsImg.errMsg&&"getImageInfo:ok"==t.ewmImg.errMsg&&"getSystemInfo:ok"==t.SystemInfo.errMsg?(console.log("ok"),e.showToast({icon:"loading",mask:!0,duration:1e4,title:"海报绘制中"}),setTimeout((function(){var n=e.createCanvasContext("myCanvas",t);n.setFillStyle("#fff"),n.fillRect(0,0,t.canvasW,t.canvasH),n.drawImage(t.goodsImg.path,0,0,t.canvasW,t.canvasW),n.drawImage(t.ewmImg.path,t.canvasW-300,t.canvasW-300,t.ewmW,t.ewmW),n.setFontSize(16),n.setFillStyle("#333"),n.draw(!0,(function(n){console.log(n),e.showToast({icon:"success",mask:!0,title:"绘制完成"});var o=t;e.canvasToTempFilePath({canvasId:"myCanvas",quality:1,complete:function(e){console.log(e),o.photo=e.tempFilePath}})}))}),1500)):console.log("err");case 14:case"end":return n.stop()}}),n)})))()},onShow:function(){this.getCode()},methods:{getCode:function(){return new Promise((function(e,t){a.default.getCode({path:"/pages/index/index"},(function(t){console.log(t),e(t)}))}))},getImageInfo:function(t){return new Promise((function(n,o){e.getImageInfo({src:t,success:function(e){n(e)}})}))},saveImgToLocal:function(t){var n=this;console.log(this.photo),e.showModal({title:"提示",content:"确定保存到相册吗",success:function(t){var o=n;t.confirm?(console.log(n.photo),e.uploadFile({url:o.configURL.BaseURL+"uploadPictures",filePath:n.photo,name:"file",header:{"apply-secret":o.configURL.secret,Authorization:"Bearer "+e.getStorageSync("dsshopApplytoken")},formData:{type:1,size:1e12},success:function(e){console.log(e.data),n.photo=e.data}}),e.downloadFile({url:n.photo,success:function(t){console.log(t),200===t.statusCode&&e.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){e.showToast({title:"保存成功",icon:"none"})},fail:function(t){e.showToast({title:"保存失败",icon:"none"})}})}})):t.cancel}})},getSystemInfo:function(){return new Promise((function(t,n){e.getSystemInfo({success:function(e){t(e)}})}))}}};t.default=r}).call(this,n("543d")["default"])},"2b01":function(e,t,n){"use strict";var o=n("0b62"),a=n.n(o);a.a},"55cb":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},c=[]},"70fa":function(e,t,n){"use strict";n.r(t);var o=n("55cb"),a=n("c336");for(var c in a)"default"!==c&&function(e){n.d(t,e,(function(){return a[e]}))}(c);n("2b01");var s,i=n("f0c5"),r=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=r.exports},"9acb":function(e,t,n){"use strict";(function(e){n("9472");o(n("66fd"));var t=o(n("70fa"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c336:function(e,t,n){"use strict";n.r(t);var o=n("1764"),a=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=a.a}},[["9acb","common/runtime","common/vendor"]]]);