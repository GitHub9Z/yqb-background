(window["webpackJsonp_www.operationsystem.admin"]=window["webpackJsonp_www.operationsystem.admin"]||[]).push([[5],{"+ego":function(e,t,n){"use strict";n.r(t);n("IM3S");var a=n("5hKd"),r=(n("U5kN"),n("duHP")),o=n("tJVT"),i=n("9og8"),c=n("WmNS"),u=n.n(c),s=n("GtkC"),d=n("cJ7L"),l=n("q1tI"),p=n("ALsR");function f(e){p["a"].dispatch({type:"SET_INFO",payload:e})}var h=n("gNnn"),b=n("nKUr"),v=e=>{var t=e.location.query.token,n=void 0===t?localStorage.getItem("token"):t,c=function(){var e=Object(i["a"])(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h["e"]();case 2:t=e.sent,n=t.data,f(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=Object(l["useState"])({}),m=Object(o["a"])(v,2),j=m[0],w=m[1];Object(l["useEffect"])((()=>{p["a"].subscribe((()=>{var e,t;w(null===(e=p["a"].getState())||void 0===e||null===(t=e.user)||void 0===t?void 0:t.info)})),n&&(localStorage.setItem("token",n),c())}),[]);var O=()=>{w({}),localStorage.removeItem("token"),f(null)},y=function(){var e=Object(i["a"])(u.a.mark((function e(){var t,n,a,r,o,i;return u.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h["a"]();case 2:if(e.t0=e.sent,e.t0){e.next=5;break}e.t0={};case 5:t=e.t0,n=t.success,a=t.data,n&&(r={appKey:null===a||void 0===a?void 0:a.appKey,path:null===a||void 0===a?void 0:a.appLoginUrl},o="".concat(null===r||void 0===r?void 0:r.path,"?appKey=").concat(r.appKey),i=o+"&redirect_url="+encodeURIComponent(window.location.href),window.location.replace(i));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(b["jsx"])(s["a"],{contentStyle:{margin:"0"},rightContentRender:()=>{var e;return null!==j&&void 0!==j&&j.userName?Object(b["jsx"])(a["a"],{title:"\u662f\u5426\u786e\u8ba4\u9000\u51fa?",onConfirm:O,onCancel:()=>{},okText:"Yes",cancelText:"No",placement:"topRight",children:Object(b["jsx"])("div",{style:{cursor:"pointer"},children:Object(b["jsx"])(r["a"],{shape:"square",size:"small",style:{backgroundColor:"#f56a00"},children:null===j||void 0===j||null===(e=j.userName)||void 0===e?void 0:e.at(-1)})})}):Object(b["jsx"])("div",{style:{cursor:"pointer"},onClick:y,children:Object(b["jsx"])(r["a"],{shape:"square",size:"small",icon:Object(b["jsx"])(d["a"],{}),children:"1"})})},menuRender:!1,children:e.children})};t["default"]=v},ALsR:function(e,t,n){"use strict";var a=n("ANjH"),r=(e,t)=>{var n=t.type,a=t.payload;switch(n){case"SET_INFO":return Object.assign({},e,{info:a});default:return e||{}}},o=Object(a["a"])({user:r}),i=o,c=Object(a["b"])(i,{user:{info:{}}});t["a"]=c},gNnn:function(e,t,n){"use strict";n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return l})),n.d(t,"g",(function(){return p})),n.d(t,"f",(function(){return f})),n.d(t,"a",(function(){return h})),n.d(t,"e",(function(){return b}));var a=n("k1fw"),r=n("9og8"),o=n("WmNS"),i=n.n(o),c=n("9kvl"),u=n("ALsR");function s(e){return Object(c["d"])("/dbfe/cloud/find_files_by_path",{method:"GET",params:e,headers:{"Content-Type":"application/json"}})}function d(e){var t,n,a=e.info,r=void 0===a?"{}":a;return r=JSON.parse(r),r.author=null===(t=u["a"].getState())||void 0===t||null===(n=t.user)||void 0===n?void 0:n.info,e.info=JSON.stringify(r),Object(c["d"])("/dbfe/cloud/create",{method:"GET",params:e,headers:{"Content-Type":"application/json"}})}function l(e){return Object(c["d"])("/dbfe/cloud/update",{method:"GET",params:{id:null===e||void 0===e?void 0:e.id,path:""},headers:{"Content-Type":"application/json"}})}function p(e){return Object(c["d"])("/dbfe/cloud/update",{method:"POST",data:e,headers:{"Content-Type":"application/json"}})}function f(e){return Object(c["d"])("/dbfe/cloud/find_files_by_keyword",{method:"GET",params:e,headers:{"Content-Type":"application/json"}})}function h(e){return Object(c["d"])("http://newostestadmin.dangbei.net/newOs/base/getEnv",{method:"GET",params:e})}function b(e){return v.apply(this,arguments)}function v(){return v=Object(r["a"])(i.a.mark((function e(t){return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(c["d"])("http://newostestadmin.dangbei.net/newOs/common/getLoginUserInfo",Object(a["a"])({method:"GET"},t||{})));case 1:case"end":return e.stop()}}),e)}))),v.apply(this,arguments)}}}]);