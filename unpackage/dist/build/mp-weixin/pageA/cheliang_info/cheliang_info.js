(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pageA/cheliang_info/cheliang_info"],{"0ae6":function(t,e,i){"use strict";var a=i("7ecb"),n=i.n(a);n.a},"18a6":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("510c"));function n(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{file1:"",file2:"",show:!1,show2:!1,mode:"date",fileList:[],jazhao:"",minDate:"1970-01-01",first:"",end:"",chepai:"",car_color:"",owner:"",pin_type:"",long:"",js_zheng_photo:"",js_fan_photo:"",data:{}}},onLoad:function(e){this.data=t.getStorageSync("jiashi_info"),console.log(this.data[0])},methods:{next:function(){t.navigateTo({url:"/pages/car_info/car_info"})},jiashi_zheng:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(i){e.file1=i.tempFilePaths[0],t.uploadFile({url:e.configURL.BaseURL+"uploadPictures",filePath:i.tempFilePaths[0],name:"file",header:{"apply-secret":e.configURL.secret,Authorization:"Bearer "+t.getStorageSync("dsshopApplytoken")},formData:{type:1,size:512e3},success:function(t){e.js_zheng_photo=t.data}})}})},jiashi_zheng2:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(i){e.file2=i.tempFilePaths[0],t.uploadFile({url:e.configURL.BaseURL+"uploadPictures",filePath:i.tempFilePaths[0],name:"file",header:{"apply-secret":e.configURL.secret,Authorization:"Bearer "+t.getStorageSync("dsshopApplytoken")},formData:{type:1,size:512e3},success:function(t){e.js_fan_photo=t.data}})}})},submit:function(){""==this.js_zheng_photo?this.$api.msg("请输入行驶证正面"):""==this.js_fan_photo?this.$api.msg("请输入行驶证反面"):""==this.chepai?this.$api.msg("请输入车牌号"):""==this.car_color?this.$api.msg("请输入车牌颜色"):""==this.owner?this.$api.msg("请输入车辆持有人"):""==this.car_color?this.$api.msg("请输入车牌颜色"):""==this.pin_type?this.$api.msg("请输入品牌型号"):""==this.long?this.$api.msg("请输入车型车长"):(console.log(this.data[0]),a.default.driver_post({realname:this.data[0],driving_number:this.data[1],driving_car:this.data[2],driving_first:this.data[3],driving_valid:this.data[4],car_number:this.chepai,car_color:this.car_color,car_belong:this.owner,car_brand:this.pin_type,car_length:this.long,driving_back:this.data[6],driving_front:this.data[5],travel_front:this.js_zheng_photo,travel_back:this.js_fan_photo,type:1},(function(e){"更新成功"==e&&t.showToast({title:"提交成功",icon:"none",success:function(e){setTimeout((function(){t.switchTab({url:"/pages/mine/mine"})}),700)}})})))}}};e.default=o}).call(this,i("543d")["default"])},"7ecb":function(t,e,i){},8421:function(t,e,i){"use strict";i.r(e);var a=i("18a6"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"99a4":function(t,e,i){"use strict";(function(t){i("9472");a(i("66fd"));var e=a(i("fad7"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},f369:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement;t._self._c},o=[]},fad7:function(t,e,i){"use strict";i.r(e);var a=i("f369"),n=i("8421");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("0ae6");var s,c=i("f0c5"),r=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"3bd07032",null,!1,a["a"],s);e["default"]=r.exports}},[["99a4","common/runtime","common/vendor"]]]);