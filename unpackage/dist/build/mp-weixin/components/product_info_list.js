(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/product_info_list"],{"0a16":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"product_info_list",data:function(){return{}},props:{product:{type:Array,default:[]}},methods:{listDetail:function(n){this.$emit("listDetail",n)},makePhone:function(n){wx.makePhoneCall({phoneNumber:n,success:function(){console.log("接口调用成功的回调函数")},fail:function(){console.log("接口调用失败的回调函数")},complete:function(){console.log("接口调用结束的回调函数（调用成功、失败都会执行）")}})}}};t.default=o},"2c8f":function(n,t,e){},"856e":function(n,t,e){"use strict";e.r(t);var o=e("9eed"),c=e("8b1c");for(var u in c)"default"!==u&&function(n){e.d(t,n,(function(){return c[n]}))}(u);e("9c14");var r,a=e("f0c5"),i=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,"07f353bc",null,!1,o["a"],r);t["default"]=i.exports},"8b1c":function(n,t,e){"use strict";e.r(t);var o=e("0a16"),c=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);t["default"]=c.a},"9c14":function(n,t,e){"use strict";var o=e("2c8f"),c=e.n(o);c.a},"9eed":function(n,t,e){"use strict";var o;e.d(t,"b",(function(){return c})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return o}));var c=function(){var n=this,t=n.$createElement;n._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/product_info_list-create-component',
    {
        'components/product_info_list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("856e"))
        })
    },
    [['components/product_info_list-create-component']]
]);
