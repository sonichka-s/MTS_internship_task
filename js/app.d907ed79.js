(function(){"use strict";var e={9469:function(e,a,t){var r=t(7195),n=function(){var e=this,a=e._self._c;return a("div",{attrs:{id:"app"}},[a("main-page")],1)},s=[],i=function(){var e=this,a=e._self._c;return a("div",[e.isLoading?a("div",[e._v("Загрузка...")]):e._e(),e.isError?a("div",[e._v("Возникла ошибка")]):e._e(),a("page-footer",{attrs:{value:e.currentPage,numberOfPages:e.numberOfPages},on:{"update:value":a=>e.currentPage=a}}),a("div",{staticClass:"cards__grid",class:{loaging:!0===e.isLoading}},e._l(e.characterData,(function(e){return a("single-card",{key:e.id,class:{cards__item_left:e.id%2!==0,cards__item_right:e.id%2===0},attrs:{data:e}})})),1)],1)},u=[],c=(t(7658),function(){var e=this,a=e._self._c;return a("div",{staticClass:"card"},[a("div",{staticClass:"card__data"},[a("div",{staticClass:"card__info_main"},[e._v(e._s(e.data.name))]),a("div",{staticClass:"card__info_main",class:{card__info_alive:"Alive"===e.data.status,card__info_dead:"Dead"===e.data.status,card__info_undefined:"unknown"===e.data.status}},[e._v(" "+e._s(e.data.status)+" ")])]),a("div",{staticClass:"card__data"},[a("div",{staticClass:"card__info_extra"},[e._v(e._s(e.data.gender))]),a("div",{staticClass:"card__info_extra"},[e._v(e._s(e.data.location))])]),a("img",{staticClass:"card__image",attrs:{alter:e.data.name,src:e.data.image}})])}),o=[],l={props:{data:{type:Object,required:!0}}},_=l,d=t(1001),f=(0,d.Z)(_,c,o,!1,null,null,null),v=f.exports,g=function(){var e=this,a=e._self._c,t=e._self._setupProxy;return a("div",{staticClass:"footer"},[a("p",{staticClass:"footer__display"},[t.currentPage&&t.currentPage>2?a("span",{staticClass:"footer__pages",on:{click:function(e){return t.setCurrentPage(1)}}},[e._v("1")]):e._e(),t.currentPage&&t.currentPage>3?a("span",{staticClass:"footer__pages"},[e._v("...")]):e._e(),t.currentPage&&t.currentPage>1?a("span",{staticClass:"footer__pages",on:{click:function(e){return t.setCurrentPage(t.prevPage)}}},[e._v(" "+e._s(t.prevPage)+" ")]):e._e(),a("span",{staticClass:"footer__pages footer__current",attrs:{value:t.currentPage}},[e._v(" "+e._s(t.currentPage)+" ")]),t.currentPage&&t.currentPage<t.numberOfPages?a("span",{staticClass:"footer__pages",on:{click:function(e){return t.setCurrentPage(t.nextPage)}}},[e._v(" "+e._s(t.nextPage)+" ")]):e._e(),t.currentPage&&t.currentPage<t.numberOfPages-2?a("span",{staticClass:"footer__pages"},[e._v("...")]):e._e(),t.currentPage&&t.currentPage<t.numberOfPages-1?a("span",{staticClass:"footer__pages",on:{click:function(e){return t.setCurrentPage(t.numberOfPages)}}},[e._v(e._s(t.numberOfPages))]):e._e()])])},p=[],m=(0,r.aZ)({__name:"PageFooter",props:{numberOfPages:{type:Number,required:!0},value:{requred:!0,type:Number}},emits:["update:value"],setup(e,{emit:a}){const t=e,{numberOfPages:n,value:s}=(0,r.BK)(t),i=e=>{a("update:value",e)};let u=(0,r.iH)(),c=(0,r.iH)();return(0,r.m0)((()=>{u.value=s?.value-1,c.value=s?.value+1})),{__sfc:!0,props:t,emit:a,numberOfPages:n,currentPage:s,setCurrentPage:i,prevPage:u,nextPage:c}}}),P=m,h=(0,d.Z)(P,g,p,!1,null,"016b6b2a",null),b=h.exports,C=t(8358);const y="/api/character/",O=C.Z.create({baseURL:"https://rickandmortyapi.com"}),w=768,k=4,x=2;var H={components:{SingleCard:v,PageFooter:b},setup(){const e=(0,r.iH)([]),a=(0,r.iH)(0),t=(0,r.iH)(!1),n=(0,r.iH)(!1),s=(0,r.iH)(document.documentElement.clientWidth),i=(0,r.iH)(0),u=(0,r.iH)(1),c=(0,r.Fl)((()=>Math.ceil(a.value/i.value))),o=e=>e.map((e=>({id:e.id,name:e.name,gender:e.gender,status:e.status,location:e.location.name,image:e.image})));async function l(){return await(await O(y)).data.info.count}async function _(e){let a=[];for(let t=i.value*(e-1)+1;t<i.value*e+1;t++)a.push(t);t.value=!0;const r=await O(`${y}${a.join(",")}`);return t.value=!1,Array.isArray(r.data)?o(r.data):null}(0,r.m0)((async()=>{try{const a=await _(u.value);a&&(e.value=a)}catch(a){console.log(`error in ${u.value} page:`,a),n.value=!0}})),(0,r.m0)((()=>{s.value>=w?i.value=k:i.value=x}));const d=()=>{s.value=document.documentElement.clientWidth};return(0,r.bv)((async()=>{window.addEventListener("resize",d);try{a.value=await l()}catch{console.log("error in character amount"),n.value=!0}try{const a=await _(u.value);a&&(e.value=a)}catch(t){console.log("error in first page:",t),n.value=!0}})),{characterData:e,currentPage:u,numberOfPages:c,cardsPerPage:i,isLoading:t,isError:n}}},j=H,Z=(0,d.Z)(j,i,u,!1,null,null,null),E=Z.exports,L={components:{MainPage:E}},F=L,$=(0,d.Z)(F,n,s,!1,null,null,null),q=$.exports;r.ZP.config.productionTip=!1,new r.ZP({render:e=>e(q)}).$mount("#app")}},a={};function t(r){var n=a[r];if(void 0!==n)return n.exports;var s=a[r]={exports:{}};return e[r](s,s.exports,t),s.exports}t.m=e,function(){var e=[];t.O=function(a,r,n,s){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],n=e[l][1],s=e[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&s||i>=s)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(u=!1,s<i&&(i=s));if(u){e.splice(l--,1);var o=n();void 0!==o&&(a=o)}}return a}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[r,n,s]}}(),function(){t.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(a,{a:a}),a}}(),function(){t.d=function(e,a){for(var r in a)t.o(a,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){var e={143:0};t.O.j=function(a){return 0===e[a]};var a=function(a,r){var n,s,i=r[0],u=r[1],c=r[2],o=0;if(i.some((function(a){return 0!==e[a]}))){for(n in u)t.o(u,n)&&(t.m[n]=u[n]);if(c)var l=c(t)}for(a&&a(r);o<i.length;o++)s=i[o],t.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return t.O(l)},r=self["webpackChunkmts_internship_task"]=self["webpackChunkmts_internship_task"]||[];r.forEach(a.bind(null,0)),r.push=a.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(9469)}));r=t.O(r)})();
//# sourceMappingURL=app.d907ed79.js.map