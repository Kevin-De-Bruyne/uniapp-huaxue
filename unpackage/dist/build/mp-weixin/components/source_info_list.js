(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/source_info_list"],{"02fc":function(n,e,t){},"4de6":function(n,e,t){"use strict";t.r(e);var o=t("a4e3"),c=t("bc1e");for(var u in c)"default"!==u&&function(n){t.d(e,n,(function(){return c[n]}))}(u);t("e105");var a,r=t("f0c5"),f=Object(r["a"])(c["default"],o["b"],o["c"],!1,null,"ef144c22",null,!1,o["a"],a);e["default"]=f.exports},"6cae":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={name:"driver_info_list",data:function(){return{phone:""}},props:{source:{type:Array,default:[]}},onLoad:function(){this.phone=n.getStorageSync("cellphone"),console.log(this.phone)},methods:{makePhone:function(n){wx.makePhoneCall({phoneNumber:n,success:function(){console.log("接口调用成功的回调函数")},fail:function(){console.log("接口调用失败的回调函数")},complete:function(){console.log("接口调用结束的回调函数（调用成功、失败都会执行）")}})}}};e.default=t}).call(this,t("543d")["default"])},a4e3:function(n,e,t){"use strict";var o;t.d(e,"b",(function(){return c})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return o}));var c=function(){var n=this,e=n.$createElement;n._self._c},u=[]},bc1e:function(n,e,t){"use strict";t.r(e);var o=t("6cae"),c=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=c.a},e105:function(n,e,t){"use strict";var o=t("02fc"),c=t.n(o);c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/source_info_list-create-component',
    {
        'components/source_info_list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4de6"))
        })
    },
    [['components/source_info_list-create-component']]
]);
