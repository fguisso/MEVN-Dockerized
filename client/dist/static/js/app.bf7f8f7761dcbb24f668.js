webpackJsonp([5,6],{108:function(t,n,e){var a=e(11)(e(75),e(110),null,null);t.exports=a.exports},109:function(t,n,e){var a=e(11)(e(76),e(111),null,null);t.exports=a.exports},110:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"column is-3"},[e("aside",{staticClass:"menu"},[e("ul",{staticClass:"menu-list"},[e("li",[e("a",{on:{click:function(n){t.navigate("dashboard")}}},[t._m(0),t._v(" "),e("span",[t._v("Home")])])]),t._v(" "),e("li",[e("a",{on:{click:function(n){t.navigate("users.list")}}},[t._m(1),t._v(" "),e("span",[t._v("Usuários")])])]),t._v(" "),e("li",[e("a",{on:{click:function(n){t.navigate("items.list")}}},[t._m(2),t._v(" "),e("span",[t._v("Itens")])])]),t._v(" "),e("li",[e("a",{on:{click:t.logout}},[t._m(3),t._v(" "),e("span",[t._v("Sair")])])])])])])},staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-home"})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-user"})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-list"})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-sign-out"})])}]}},111:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("nav",{staticClass:"nav has-shadow tabs is-large"},[e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("div",{staticClass:"nav-right"},[e("a",{staticClass:"nav-item is-tab"},[e("figure",{staticClass:"image is-32x32",staticStyle:{"margin-right":"10px"}},[e("img",{staticStyle:{"border-radius":"4px"},attrs:{src:t.getUser.avatarUrl}})]),t._v("\n        "+t._s(t.getUser.name)+"\n      ")])])])])},staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"nav-left"},[e("p",{staticClass:"nav-item title is-3"},[t._v("\n        Portal Gestor\n      ")])])}]}},112:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("cc-nav-bar",{directives:[{name:"show",rawName:"v-show",value:!(["auth.signin","auth.signup"].indexOf(t.$route.name)>-1),expression:"!(['auth.signin', 'auth.signup'].indexOf($route.name) > -1)"}]}),t._v(" "),e("div",{staticClass:"columns"},[e("cc-menu",{directives:[{name:"show",rawName:"v-show",value:!(["auth.signin","auth.signup"].indexOf(t.$route.name)>-1),expression:"!(['auth.signin', 'auth.signup'].indexOf($route.name) > -1)"}]}),t._v(" "),e("router-view")],1)],1)},staticRenderFns:[]}},115:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(10),r=e.n(a),i=e(43),u=e.n(i),s=e(41),c=e(28),o=e(42);r.a.use(c.a),new r.a({router:s.a,el:"#app",store:o.a,render:function(t){return t(u.a)}})},28:function(t,n,e){"use strict";function a(t){Object.defineProperty(t.prototype,"http",{get:function(){return s}})}var r=e(45),i=e.n(r);e.d(n,"b",function(){return c}),n.a=a;var u="http://localhost:3000",s=i.a.create({baseURL:u}),c=function(t){s.defaults.headers.common.Authorization="Bearer "+t}},41:function(t,n,e){"use strict";var a=e(29),r=e.n(a),i=e(10),u=e.n(i),s=e(113),c=e.n(s),o=e(73),l=e(68);u.a.use(c.a);var f=[].concat(r()(l.a)),h=new c.a({routes:f,linkActiveClass:"active",mode:"history"});h.beforeEach(o.a),n.a=h},42:function(t,n,e){"use strict";var a=e(10),r=e.n(a),i=e(22);r.a.use(i.b),n.a=new i.b.Store({state:{user:{}},mutations:{SET_USER:function(t,n){t.user=n}},actions:{setUser:function(t,n){var e=t.commit;e("SET_USER",n)}},getters:{getUser:function(t){return t.user}}})},43:function(t,n,e){var a=e(11)(e(74),e(112),null,null);t.exports=a.exports},63:function(t,n,e){"use strict";var a=e(65);e.d(n,"a",function(){return a.a})},64:function(t,n,e){"use strict";e.d(n,"c",function(){return a}),e.d(n,"a",function(){return r}),e.d(n,"b",function(){return i});var a=function(t){return e.e(2).then(function(){return t(e(118))}.bind(null,e)).catch(e.oe)},r=function(t){return e.e(2).then(function(){return t(e(116))}.bind(null,e)).catch(e.oe)},i=function(t){return e.e(2).then(function(){return t(e(117))}.bind(null,e)).catch(e.oe)}},65:function(t,n,e){"use strict";var a=e(64),r=[{name:"auth.signin",path:"signin",component:a.a,meta:{requiresAuth:!1}},{name:"auth.signup",path:"signup",component:a.b,meta:{requiresAuth:!1}}];n.a=[{children:r,name:"auth",path:"/auth",component:a.c,redirect:{name:"auth.signin"},meta:{requiresAuth:!1}}]},66:function(t,n,e){"use strict";var a=e(67);e.d(n,"a",function(){return a.a})},67:function(t,n,e){"use strict";var a=function(t){return e.e(3).then(function(){return t(e(119))}.bind(null,e)).catch(e.oe)};n.a=[{name:"dashboard",path:"/",component:a,meta:{requiresAuth:!0}},{name:"catchall",path:"*",component:a,meta:{requiresAuth:!0}}]},68:function(t,n,e){"use strict";var a=e(29),r=e.n(a),i=e(66),u=e(71),s=e(69),c=e(63);n.a=[].concat(r()(c.a),r()(i.a),r()(u.a),r()(s.a))},69:function(t,n,e){"use strict";var a=e(70);e.d(n,"a",function(){return a.a})},70:function(t,n,e){"use strict";var a=function(t){return e.e(1).then(function(){return t(e(123))}.bind(null,e)).catch(e.oe)},r=function(t){return e.e(1).then(function(){return t(e(120))}.bind(null,e)).catch(e.oe)},i=function(t){return e.e(1).then(function(){return t(e(121))}.bind(null,e)).catch(e.oe)},u=function(t){return e.e(1).then(function(){return t(e(122))}.bind(null,e)).catch(e.oe)},s=[{name:"items.edit",path:"edit/:_id",component:r,meta:{requiresAuth:!0}},{name:"newitem.form",path:"new",component:i,meta:{requiresAuth:!0}},{name:"items.list",path:"list",component:u,meta:{requiresAuth:!0}}];n.a=[{children:s,name:"items",path:"/items",component:a,meta:{requiresAuth:!0}}]},71:function(t,n,e){"use strict";var a=e(72);e.d(n,"a",function(){return a.a})},72:function(t,n,e){"use strict";var a=function(t){return e.e(0).then(function(){return t(e(127))}.bind(null,e)).catch(e.oe)},r=function(t){return e.e(0).then(function(){return t(e(126))}.bind(null,e)).catch(e.oe)},i=function(t){return e.e(0).then(function(){return t(e(124))}.bind(null,e)).catch(e.oe)},u=function(t){return e.e(0).then(function(){return t(e(125))}.bind(null,e)).catch(e.oe)},s=[{name:"newuser.form",path:"new",component:u,meta:{requiresAuth:!0}},{name:"users.edit",path:"edit/:_id",component:i,meta:{requiresAuth:!0}},{name:"users.list",path:"list",component:r,meta:{requiresAuth:!0}}];n.a=[{children:s,name:"users",path:"/users",component:a,meta:{requiresAuth:!0}}]},73:function(t,n,e){"use strict";var a=function(t){return t===!0},r=function(t,n,e){var r=t.meta.requiresAuth;return a(r)?void(null!==localStorage.id_token&&localStorage.length>0?e():e({name:"auth.signin"})):void e()};n.a=r},74:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(109),r=e.n(a),i=e(108),u=e.n(i);n.default={name:"app",components:{CcNavBar:r.a,CcMenu:u.a}}},75:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"ccmenu",methods:{logout:function(){localStorage.clear(),this.$router.push({name:"auth.signin"})},navigate:function(t){this.$router.push({name:t})}}}},76:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(44),r=e.n(a),i=e(22);n.default={name:"navbar",computed:r()({},e.i(i.a)(["getUser"]))}}},[115]);
//# sourceMappingURL=app.bf7f8f7761dcbb24f668.js.map