(window["webpackJsonp_www.operationsystem.admin"]=window["webpackJsonp_www.operationsystem.admin"]||[]).push([[2],{"1W/9":function(e,t,n){"use strict";var r=n("1OyB"),o=n("vuIU"),i=n("Ji7U"),a=n("LK+K"),c=n("U8pU"),u=n("q1tI"),l=n("wgJM"),s=n("QC+M"),f=n("MNnm"),d=n("qx4F");function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return{};var n=t.element,r=void 0===n?document.body:n,o={},i=Object.keys(e);return i.forEach((function(e){o[e]=r.style[e]})),i.forEach((function(t){r.style[t]=e[t]})),o}var h=v;function p(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}var g={},m=function(e){if(p()||e){var t="ant-scrolling-effect",n=new RegExp("".concat(t),"g"),r=document.body.className;if(e){if(!n.test(r))return;return h(g),g={},void(document.body.className=r.replace(n,"").trim())}var o=Object(d["a"])();if(o&&(g=h({position:"relative",width:"calc(100% - ".concat(o,"px)")}),!n.test(r))){var i="".concat(r," ").concat(t);document.body.className=i.trim()}}},b=n("KQm4"),w=[],y="ant-scrolling-effect",O=new RegExp("".concat(y),"g"),k=0,C=new Map,E=Object(o["a"])((function e(t){var n=this;Object(r["a"])(this,e),this.lockTarget=void 0,this.options=void 0,this.getContainer=function(){var e;return null===(e=n.options)||void 0===e?void 0:e.container},this.reLock=function(e){var t=w.find((function(e){var t=e.target;return t===n.lockTarget}));t&&n.unLock(),n.options=e,t&&(t.options=e,n.lock())},this.lock=function(){var e;if(!w.some((function(e){var t=e.target;return t===n.lockTarget})))if(w.some((function(e){var t,r=e.options;return(null===r||void 0===r?void 0:r.container)===(null===(t=n.options)||void 0===t?void 0:t.container)})))w=[].concat(Object(b["a"])(w),[{target:n.lockTarget,options:n.options}]);else{var t=0,r=(null===(e=n.options)||void 0===e?void 0:e.container)||document.body;(r===document.body&&window.innerWidth-document.documentElement.clientWidth>0||r.scrollHeight>r.clientHeight)&&(t=Object(d["a"])());var o=r.className;if(0===w.filter((function(e){var t,r=e.options;return(null===r||void 0===r?void 0:r.container)===(null===(t=n.options)||void 0===t?void 0:t.container)})).length&&C.set(r,h({width:0!==t?"calc(100% - ".concat(t,"px)"):void 0,overflow:"hidden",overflowX:"hidden",overflowY:"hidden"},{element:r})),!O.test(o)){var i="".concat(o," ").concat(y);r.className=i.trim()}w=[].concat(Object(b["a"])(w),[{target:n.lockTarget,options:n.options}])}},this.unLock=function(){var e,t=w.find((function(e){var t=e.target;return t===n.lockTarget}));if(w=w.filter((function(e){var t=e.target;return t!==n.lockTarget})),t&&!w.some((function(e){var n,r=e.options;return(null===r||void 0===r?void 0:r.container)===(null===(n=t.options)||void 0===n?void 0:n.container)}))){var r=(null===(e=n.options)||void 0===e?void 0:e.container)||document.body,o=r.className;O.test(o)&&(h(C.get(r),{element:r}),C.delete(r),r.className=r.className.replace(O,"").trim())}},this.lockTarget=k++,this.options=t})),j=0,R=Object(f["a"])();var T={},L=function(e){if(!R)return null;if(e){if("string"===typeof e)return document.querySelectorAll(e)[0];if("function"===typeof e)return e();if("object"===Object(c["a"])(e)&&e instanceof window.HTMLElement)return e}return document.body},N=function(e){Object(i["a"])(n,e);var t=Object(a["a"])(n);function n(e){var o;return Object(r["a"])(this,n),o=t.call(this,e),o.container=void 0,o.componentRef=u["createRef"](),o.rafId=void 0,o.scrollLocker=void 0,o.renderComponent=void 0,o.updateScrollLocker=function(e){var t=e||{},n=t.visible,r=o.props,i=r.getContainer,a=r.visible;a&&a!==n&&R&&L(i)!==o.scrollLocker.getContainer()&&o.scrollLocker.reLock({container:L(i)})},o.updateOpenCount=function(e){var t=e||{},n=t.visible,r=t.getContainer,i=o.props,a=i.visible,c=i.getContainer;a!==n&&R&&L(c)===document.body&&(a&&!n?j+=1:e&&(j-=1));var u="function"===typeof c&&"function"===typeof r;(u?c.toString()!==r.toString():c!==r)&&o.removeCurrentContainer()},o.attachToParent=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e||o.container&&!o.container.parentNode){var t=L(o.props.getContainer);return!!t&&(t.appendChild(o.container),!0)}return!0},o.getContainer=function(){return R?(o.container||(o.container=document.createElement("div"),o.attachToParent(!0)),o.setWrapperClassName(),o.container):null},o.setWrapperClassName=function(){var e=o.props.wrapperClassName;o.container&&e&&e!==o.container.className&&(o.container.className=e)},o.removeCurrentContainer=function(){var e,t;null===(e=o.container)||void 0===e||null===(t=e.parentNode)||void 0===t||t.removeChild(o.container)},o.switchScrollingEffect=function(){1!==j||Object.keys(T).length?j||(h(T),T={},m(!0)):(m(),T=h({overflow:"hidden",overflowX:"hidden",overflowY:"hidden"}))},o.scrollLocker=new E({container:L(e.getContainer)}),o}return Object(o["a"])(n,[{key:"componentDidMount",value:function(){var e=this;this.updateOpenCount(),this.attachToParent()||(this.rafId=Object(l["a"])((function(){e.forceUpdate()})))}},{key:"componentDidUpdate",value:function(e){this.updateOpenCount(e),this.updateScrollLocker(e),this.setWrapperClassName(),this.attachToParent()}},{key:"componentWillUnmount",value:function(){var e=this.props,t=e.visible,n=e.getContainer;R&&L(n)===document.body&&(j=t&&j?j-1:j),this.removeCurrentContainer(),l["a"].cancel(this.rafId)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.forceRender,r=e.visible,o=null,i={getOpenCount:function(){return j},getContainer:this.getContainer,switchScrollingEffect:this.switchScrollingEffect,scrollLocker:this.scrollLocker};return(n||r||this.componentRef.current)&&(o=u["createElement"](s["a"],{getContainer:this.getContainer,ref:this.componentRef},t(i))),o}}]),n}(u["Component"]);t["a"]=N},Lpa7:function(e,t,n){"use strict";n.d(t,"a",(function(){return le})),n.d(t,"b",(function(){return se})),n.d(t,"c",(function(){return oe}));var r=n("q1tI");function o(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(t){i(t)}}function c(e){try{u(r["throw"](e))}catch(t){i(t)}}function u(e){e.done?n(e.value):o(e.value).then(a,c)}u((r=r.apply(e,t||[])).next())}))}function i(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(e){return function(t){return u([e,t])}}function u(i){if(n)throw new TypeError("Generator is already executing.");while(a)try{if(n=1,r&&(o=2&i[0]?r["return"]:i[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(o=a.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(c){i=[6,c],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}}var a=function(){},c=a(),u=Object,l=function(e){return e===c},s=function(e){return"function"==typeof e},f=function(e,t){return u.assign({},e,t)},d="undefined",v=function(){return typeof window!=d},h=function(){return typeof document!=d},p=function(){return v()&&typeof window["requestAnimationFrame"]!=d},g=new WeakMap,m=0,b=function(e){var t,n,r=typeof e,o=e&&e.constructor,i=o==Date;if(u(e)!==e||i||o==RegExp)t=i?e.toJSON():"symbol"==r?e.toString():"string"==r?JSON.stringify(e):""+e;else{if(t=g.get(e),t)return t;if(t=++m+"~",g.set(e,t),o==Array){for(t="@",n=0;n<e.length;n++)t+=b(e[n])+",";g.set(e,t)}if(o==u){t="#";var a=u.keys(e).sort();while(!l(n=a.pop()))l(e[n])||(t+=n+":"+b(e[n])+",");g.set(e,t)}}return t},w=!0,y=function(){return w},O=v(),k=h(),C=O&&window.addEventListener?window.addEventListener.bind(window):a,E=k?document.addEventListener.bind(document):a,j=O&&window.removeEventListener?window.removeEventListener.bind(window):a,R=k?document.removeEventListener.bind(document):a,T=function(){var e=k&&document.visibilityState;return l(e)||"hidden"!==e},L=function(e){return E("visibilitychange",e),C("focus",e),function(){R("visibilitychange",e),j("focus",e)}},N=function(e){var t=function(){w=!0,e()},n=function(){w=!1};return C("online",t),C("offline",n),function(){j("online",t),j("offline",n)}},S={isOnline:y,isVisible:T},x={initFocus:L,initReconnect:N},W=!v()||"Deno"in window,I=function(e){return p()?window["requestAnimationFrame"](e):setTimeout(e,1)},V=W?r["useEffect"]:r["useLayoutEffect"],D="undefined"!==typeof navigator&&navigator.connection,M=!W&&D&&(["slow-2g","2g"].includes(D.effectiveType)||D.saveData),P=function(e){if(s(e))try{e=e()}catch(r){e=""}var t=[].concat(e);e="string"==typeof e?e:(Array.isArray(e)?e.length:e)?b(e):"";var n=e?"$swr$"+e:"";return[e,t,n]},F=new WeakMap,q=0,H=1,U=2,A=function(e,t,n,r,o,i,a){void 0===a&&(a=!0);var c=F.get(e),u=c[0],l=c[1],s=c[3],f=u[t],d=l[t];if(a&&d)for(var v=0;v<d.length;++v)d[v](n,r,o);return i&&(delete s[t],f&&f[0])?f[0](U).then((function(){return e.get(t)})):e.get(t)},J=0,K=function(){return++J},$=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return o(void 0,void 0,void 0,(function(){var t,n,r,o,a,u,d,v,h,p,g,m,b,w,y,O,k,C,E,j;return i(this,(function(i){switch(i.label){case 0:if(t=e[0],n=e[1],r=e[2],o=e[3],a="boolean"===typeof o?{revalidate:o}:o||{},u=!!l(a.populateCache)||a.populateCache,d=!1!==a.revalidate,v=!1!==a.rollbackOnError,h=a.optimisticData,p=P(n),g=p[0],m=p[2],!g)return[2];if(b=F.get(t),w=b[2],e.length<3)return[2,A(t,g,t.get(g),c,c,d,!0)];if(y=r,k=K(),w[g]=[k,0],C=!l(h),E=t.get(g),C&&(t.set(g,h),A(t,g,h)),s(y))try{y=y(t.get(g))}catch(R){O=R}return y&&s(y.then)?[4,y.catch((function(e){O=e}))]:[3,2];case 1:if(y=i.sent(),k!==w[g][0]){if(O)throw O;return[2,y]}O&&C&&v&&(u=!0,y=E,t.set(g,E)),i.label=2;case 2:return u&&(O||(s(u)&&(y=u(y,E)),t.set(g,y)),t.set(m,f(t.get(m),{error:O}))),w[g][1]=K(),[4,A(t,g,y,O,c,d,!!u)];case 3:if(j=i.sent(),O)throw O;return[2,u?j:y]}}))}))},Q=function(e,t){for(var n in e)e[n][0]&&e[n][0](t)},X=function(e,t){if(!F.has(e)){var n=f(x,t),r={},o=$.bind(c,e),i=a;if(F.set(e,[r,{},{},{},o]),!W){var u=n.initFocus(setTimeout.bind(c,Q.bind(c,r,q))),l=n.initReconnect(setTimeout.bind(c,Q.bind(c,r,H)));i=function(){u&&u(),l&&l(),F.delete(e)}}return[e,o,i]}return[e,F.get(e)[4]]},Y=function(e,t,n,r,o){var i=n.errorRetryCount,a=o.retryCount,c=~~((Math.random()+.5)*(1<<(a<8?a:8)))*n.errorRetryInterval;!l(i)&&a>i||setTimeout(r,c,o)},_=X(new Map),B=_[0],G=_[1],z=f({onLoadingSlow:a,onSuccess:a,onError:a,onErrorRetry:Y,onDiscarded:a,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:M?1e4:5e3,focusThrottleInterval:5e3,dedupingInterval:2e3,loadingTimeout:M?5e3:3e3,compare:function(e,t){return b(e)==b(t)},isPaused:function(){return!1},cache:B,mutate:G,fallback:{}},S),Z=function(e,t){var n=f(e,t);if(t){var r=e.use,o=e.fallback,i=t.use,a=t.fallback;r&&i&&(n.use=r.concat(i)),o&&a&&(n.fallback=f(o,a))}return n},ee=Object(r["createContext"])({}),te=function(e){var t=e.value,n=Z(Object(r["useContext"])(ee),t),o=t&&t.provider,i=Object(r["useState"])((function(){return o?X(o(n.cache||B),t):c}))[0];return i&&(n.cache=i[0],n.mutate=i[1]),V((function(){return i?i[2]:c}),[]),Object(r["createElement"])(ee.Provider,f(e,{value:n}))},ne=function(e,t){var n=Object(r["useState"])({})[1],o=Object(r["useRef"])(e),i=Object(r["useRef"])({data:!1,error:!1,isValidating:!1}),a=Object(r["useCallback"])((function(e){var r=!1,a=o.current;for(var c in e){var u=c;a[u]!==e[u]&&(a[u]=e[u],i.current[u]&&(r=!0))}r&&!t.current&&n({})}),[]);return V((function(){o.current=e})),[o,i.current,a]},re=function(e){return s(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(null===e[1]?e[2]:e[1])||{}]},oe=function(){return f(z,Object(r["useContext"])(ee))},ie=function(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=oe(),o=re(t),i=o[0],a=o[1],c=o[2],u=Z(r,c),l=e,s=u.use;if(s)for(var f=s.length;f-- >0;)l=s[f](l);return l(i,a||u.fetcher,u)}},ae=function(e,t,n){var r=t[e]||(t[e]=[]);return r.push(n),function(){var e=r.indexOf(n);e>=0&&(r[e]=r[r.length-1],r.pop())}},ce={dedupe:!0},ue=function(e,t,n){var a=n.cache,u=n.compare,d=n.fallbackData,v=n.suspense,h=n.revalidateOnMount,p=n.refreshInterval,g=n.refreshWhenHidden,m=n.refreshWhenOffline,b=F.get(a),w=b[0],y=b[1],O=b[2],k=b[3],C=P(e),E=C[0],j=C[1],R=C[2],T=Object(r["useRef"])(!1),L=Object(r["useRef"])(!1),N=Object(r["useRef"])(E),S=Object(r["useRef"])(t),x=Object(r["useRef"])(n),D=function(){return x.current},M=function(){return D().isVisible()&&D().isOnline()},J=function(e){return a.set(R,f(a.get(R),e))},Q=a.get(E),X=l(d)?n.fallback[E]:d,Y=l(Q)?X:Q,_=a.get(R)||{},B=_.error,G=!T.current,z=function(){return G&&!l(h)?h:!D().isPaused()&&(v?!l(Y):l(Y)||n.revalidateIfStale)},Z=function(){return!(!E||!t)&&(!!_.isValidating||G&&z())},ee=Z(),te=ne({data:Y,error:B,isValidating:ee},L),re=te[0],oe=te[1],ie=te[2],ue=Object(r["useCallback"])((function(e){return o(void 0,void 0,void 0,(function(){var t,r,o,f,d,v,h,p,g,m,b,w,y;return i(this,(function(i){switch(i.label){case 0:if(t=S.current,!E||!t||L.current||D().isPaused())return[2,!1];f=!0,d=e||{},v=!k[E]||!d.dedupe,h=function(){return!L.current&&E===N.current&&T.current},p=function(){var e=k[E];e&&e[1]===o&&delete k[E]},g={isValidating:!1},m=function(){J({isValidating:!1}),h()&&ie(g)},J({isValidating:!0}),ie({isValidating:!0}),i.label=1;case 1:return i.trys.push([1,3,,4]),v&&(A(a,E,re.current.data,re.current.error,!0),n.loadingTimeout&&!a.get(E)&&setTimeout((function(){f&&h()&&D().onLoadingSlow(E,n)}),n.loadingTimeout),k[E]=[t.apply(void 0,j),K()]),y=k[E],r=y[0],o=y[1],[4,r];case 2:return r=i.sent(),v&&setTimeout(p,n.dedupingInterval),k[E]&&k[E][1]===o?(J({error:c}),g.error=c,b=O[E],!l(b)&&(o<=b[0]||o<=b[1]||0===b[1])?(m(),v&&h()&&D().onDiscarded(E),[2,!1]):(u(re.current.data,r)?g.data=re.current.data:g.data=r,u(a.get(E),r)||a.set(E,r),v&&h()&&D().onSuccess(r,E,n),[3,4])):(v&&h()&&D().onDiscarded(E),[2,!1]);case 3:return w=i.sent(),p(),D().isPaused()||(J({error:w}),g.error=w,v&&h()&&(D().onError(w,E,n),("boolean"===typeof n.shouldRetryOnError&&n.shouldRetryOnError||s(n.shouldRetryOnError)&&n.shouldRetryOnError(w))&&M()&&D().onErrorRetry(w,E,n,ue,{retryCount:(d.retryCount||0)+1,dedupe:!0}))),[3,4];case 4:return f=!1,m(),h()&&v&&A(a,E,g.data,g.error,!1),[2,!0]}}))}))}),[E]),le=Object(r["useCallback"])($.bind(c,a,(function(){return N.current})),[]);if(V((function(){S.current=t,x.current=n})),V((function(){if(E){var e=E!==N.current,t=ue.bind(c,ce),n=function(e,t,n){ie(f({error:t,isValidating:n},u(re.current.data,e)?c:{data:e}))},r=0,o=function(e){if(e==q){var n=Date.now();D().revalidateOnFocus&&n>r&&M()&&(r=n+D().focusThrottleInterval,t())}else if(e==H)D().revalidateOnReconnect&&M()&&t();else if(e==U)return ue()},i=ae(E,y,n),a=ae(E,w,o);return L.current=!1,N.current=E,T.current=!0,e&&ie({data:Y,error:B,isValidating:ee}),z()&&(l(Y)||W?t():I(t)),function(){L.current=!0,i(),a()}}}),[E,ue]),V((function(){var e;function t(){var t=s(p)?p(Y):p;t&&-1!==e&&(e=setTimeout(n,t))}function n(){re.current.error||!g&&!D().isVisible()||!m&&!D().isOnline()?t():ue(ce).then(t)}return t(),function(){e&&(clearTimeout(e),e=-1)}}),[p,g,m,ue]),Object(r["useDebugValue"])(Y),v&&l(Y)&&E)throw S.current=t,x.current=n,L.current=!1,l(B)?ue(ce):B;return{mutate:le,get data(){return oe.data=!0,Y},get error(){return oe.error=!0,B},get isValidating(){return oe.isValidating=!0,ee}}},le=u.defineProperty(te,"default",{value:z}),se=ie(ue)},qx4F:function(e,t,n){"use strict";var r;function o(e){if("undefined"===typeof document)return 0;if(e||void 0===r){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var n=document.createElement("div"),o=n.style;o.position="absolute",o.top="0",o.left="0",o.pointerEvents="none",o.visibility="hidden",o.width="200px",o.height="150px",o.overflow="hidden",n.appendChild(t),document.body.appendChild(n);var i=t.offsetWidth;n.style.overflow="scroll";var a=t.offsetWidth;i===a&&(a=n.clientWidth),document.body.removeChild(n),r=i-a}return r}function i(e){var t=e.match(/^(.*)px$/),n=Number(null===t||void 0===t?void 0:t[1]);return Number.isNaN(n)?o():n}function a(e){if("undefined"===typeof document||!e||!(e instanceof Element))return{width:0,height:0};var t=getComputedStyle(e,"::-webkit-scrollbar"),n=t.width,r=t.height;return{width:i(n),height:i(r)}}n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return a}))}}]);