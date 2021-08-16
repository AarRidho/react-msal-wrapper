(this["webpackJsonpreact-msal-wrapper-example"]=this["webpackJsonpreact-msal-wrapper-example"]||[]).push([[0],{106:function(e,t,n){e.exports=n(121)},114:function(e,t,n){},120:function(e,t,n){},121:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(15),l=n.n(c),o=n(18),i=n(39),u=n(167),s=n(168),m=n(155),p=n(86),f=n.n(p),E=Object(m.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:f.a.A400},background:{default:"#fff"}}}),d=n(87),b=n(88),v=n(98),h=n(97),g=n(26),O=n.n(g),j=n(38),y=n(17),k=n(22),w=n(89),x=n(10);function C(e){var t=e.scopes,n=void 0===t?["User.Read"]:t,r=Object(k.f)(),c=r.instance,l=r.inProgress,o=r.accounts,i=Object(a.useState)(null),u=Object(y.a)(i,2),s=u[0],m=u[1];return Object(a.useEffect)((function(){(function(){var e=Object(j.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("none"===l&&o.length>0)){e.next=14;break}return e.prev=1,e.next=4,c.acquireTokenSilent({account:o[0],scopes:n});case 4:if(!(t=e.sent).accessToken){e.next=8;break}return m(t.accessToken),e.abrupt("return");case 8:m(null),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),s&&m(null);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}})()()}),[s,o,l,c,n]),{accessToken:s}}var R=function(e){Object(v.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this)).router=e,a}return Object(b.a)(n,[{key:"navigateInternal",value:function(){var e=Object(j.a)(O.a.mark((function e(t,n){var a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.replace(window.location.origin,""),n.noHistory?this.router.replace(a):this.router.push(a),e.abrupt("return",!1);case 3:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),n}(w.a),A=function(e){var t=e.instance,n=e.config,a=e.children,c=new R(n.router);t.setNavigationClient(c);var l=t.getAllAccounts();return l.length>0&&t.setActiveAccount(l[0]),t.addEventCallback((function(e){if(e.eventType===x.a.LOGIN_SUCCESS&&e.payload.account){var n=e.payload.account;t.setActiveAccount(n)}})),r.a.createElement(k.c,{instance:t},a)},S=(n(114),n(54)),T=n(161),P=n(162),I=n(163),L=function(){var e=Object(k.f)().accounts,t=Object(a.useState)(null),n=Object(y.a)(t,2),c=n[0],l=n[1];return Object(a.useEffect)((function(){e.length>0&&l(e[0].name.split(" ")[0])}),[e]),c?r.a.createElement(S.a,{variant:"h6"},"Welcome, ",c):null},N=n(125),U=n(158),M=n(170),G=function(){var e=Object(k.f)().instance,t=Object(a.useState)(null),n=Object(y.a)(t,2),c=n[0],l=n[1],o=Boolean(c),i=function(t){l(null),"popup"===t?e.loginPopup():"redirect"===t&&e.loginRedirect()};return r.a.createElement("div",null,r.a.createElement(N.a,{onClick:function(e){return l(e.currentTarget)},color:"inherit"},"Login"),r.a.createElement(M.a,{id:"menu-appbar",anchorEl:c,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:o,onClose:function(){return l(null)}},r.a.createElement(U.a,{onClick:function(){return i("popup")},key:"loginPopup"},"Sign in using Popup"),r.a.createElement(U.a,{onClick:function(){return i("redirect")},key:"loginRedirect"},"Sign in using Redirect")))},z=n(159),B=n(91),q=n.n(B),D=function(){var e=Object(k.f)().instance,t=Object(a.useState)(null),n=Object(y.a)(t,2),c=n[0],l=n[1],o=Boolean(c),i=function(t){l(null),"popup"===t?e.logoutPopup():"redirect"===t&&e.logoutRedirect()};return r.a.createElement("div",null,r.a.createElement(z.a,{onClick:function(e){return l(e.currentTarget)},color:"inherit"},r.a.createElement(q.a,null)),r.a.createElement(M.a,{id:"menu-appbar",anchorEl:c,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:o,onClose:function(){return l(null)}},r.a.createElement(U.a,{onClick:function(){return i("popup")},key:"logoutPopup"},"Logout using Popup"),r.a.createElement(U.a,{onClick:function(){return i("redirect")},key:"logoutRedirect"},"Logout using Redirect")))},F=function(){return Object(k.e)()?r.a.createElement(D,null):r.a.createElement(G,null)},W=n(160),J=Object(W.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}})),H=function(){var e=J();return r.a.createElement("div",{className:e.root},r.a.createElement(T.a,{position:"static"},r.a.createElement(P.a,null,r.a.createElement(S.a,{className:e.title},r.a.createElement(I.a,{component:i.b,to:"/",color:"inherit",variant:"h6"},"MS Identity Platform")),r.a.createElement(L,null),r.a.createElement(F,null))))},Q=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(H,null),r.a.createElement(S.a,{variant:"h5"},r.a.createElement("center",null,"Welcome to the Microsoft Authentication Library For React Quickstart")),r.a.createElement("br",null),r.a.createElement("br",null),e.children)},V=n(164);function _(){var e=Object(o.f)(),t=Object(k.e)();return Object(a.useEffect)((function(){t&&e.push("/profile")}),[e,t]),r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,null,r.a.createElement(V.a,{orientation:"vertical"},r.a.createElement(N.a,{component:i.b,to:"/profile",variant:"contained",color:"primary"},"Request Profile Information"),r.a.createElement(N.a,{component:i.b,to:"/profileWithMsal",variant:"contained",color:"primary"},"Request Profile Information (using withMsal HOC)"),r.a.createElement(N.a,{component:i.b,to:"/profileRawContext",variant:"contained",color:"primary"},"Request Profile Information (using raw context"))),r.a.createElement(k.d,null,r.a.createElement(S.a,{variant:"h6"},r.a.createElement("center",null,"Please sign-in to see your profile information."))))}var K=n(99),X=n(2),Y=n(62),Z=window.navigator.userAgent,$=Z.indexOf("MSIE "),ee=Z.indexOf("Trident/"),te=Z.indexOf("Edge/"),ne=Z.indexOf("Firefox"),ae={auth:{clientId:"bb0c73e2-ab5e-409e-8e0f-7f253799a59d",authority:"https://login.microsoftonline.com/4d0f4d8e-0fbd-4380-a076-4b6b2a83ce42/",redirectUri:"/profile",postLogoutRedirectUri:"/"},cache:{storeAuthStateInCookie:$>0||ee>0||te>0||ne>0},system:{loggerOptions:{loggerCallback:function(e,t,n){if(!n)switch(e){case Y.a.Error:return void console.error(t);case Y.a.Info:return void console.info(t);case Y.a.Verbose:return void console.debug(t);case Y.a.Warning:return void console.warn(t);default:return}}}}},re={scopes:["User.Read"]},ce={apiURL:"https://192.168.16.157:3001/api/tests/middleware/passport",scopes:["api://bb0c73e2-ab5e-409e-8e0f-7f253799a59d/sikur.read.all","api://bb0c73e2-ab5e-409e-8e0f-7f253799a59d/sikur.write.all"]},le=n(157),oe=n(127),ie=n(166),ue=n(165),se=n(171),me=n(92),pe=n.n(me),fe=n(93),Ee=n.n(fe),de=n(94),be=n.n(de),ve=n(95),he=n.n(ve),ge=n(96),Oe=n.n(ge),je=function(e){var t=e.graphData;return r.a.createElement(le.a,{className:"profileData"},r.a.createElement(ye,{name:t.displayName}),r.a.createElement(ke,{jobTitle:t.jobTitle}),r.a.createElement(we,{mail:t.mail}),r.a.createElement(xe,{phone:t.businessPhones[0]}),r.a.createElement(Ce,{location:t.officeLocation}))},ye=function(e){var t=e.name;return r.a.createElement(oe.a,null,r.a.createElement(ue.a,null,r.a.createElement(se.a,null,r.a.createElement(pe.a,null))),r.a.createElement(ie.a,{primary:"Name",secondary:t}))},ke=function(e){var t=e.jobTitle;return r.a.createElement(oe.a,null,r.a.createElement(ue.a,null,r.a.createElement(se.a,null,r.a.createElement(Ee.a,null))),r.a.createElement(ie.a,{primary:"Title",secondary:t}))},we=function(e){var t=e.mail;return r.a.createElement(oe.a,null,r.a.createElement(ue.a,null,r.a.createElement(se.a,null,r.a.createElement(be.a,null))),r.a.createElement(ie.a,{primary:"Mail",secondary:t}))},xe=function(e){var t=e.phone;return r.a.createElement(oe.a,null,r.a.createElement(ue.a,null,r.a.createElement(se.a,null,r.a.createElement(he.a,null))),r.a.createElement(ie.a,{primary:"Phone",secondary:t}))},Ce=function(e){var t=e.location;return r.a.createElement(oe.a,null,r.a.createElement(ue.a,null,r.a.createElement(se.a,null,r.a.createElement(Oe.a,null))),r.a.createElement(ie.a,{primary:"Location",secondary:t}))},Re=function(){return r.a.createElement(S.a,{variant:"h6"},"Authentication in progress...")},Ae=function(e){var t=e.error;return r.a.createElement(S.a,{variant:"h6"},"An Error Occurred: ",t.errorCode)},Se=n(126),Te=function(){var e=C({scopes:ce.scopes}).accessToken,t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.graphEndpoint,n=void 0===t?"https://graph.microsoft.com/v1.0/me":t,r=C({scopes:["User.Read"]}),c=r.accessToken,l=Object(a.useState)(null),o=Object(y.a)(l,2),i=o[0],u=o[1],s=Object(a.useState)(null),m=Object(y.a)(s,2),p=m[0],f=m[1],E=Object(a.useCallback)(function(){var e=Object(j.a)(O.a.mark((function e(t,a){var r,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(n,{method:"GET",headers:{Authorization:"Bearer "+t},signal:a.signal});case 3:return r=e.sent,e.next=6,r.json();case 6:c=e.sent,u(c),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),f(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n){return e.apply(this,arguments)}}(),[n]);return Object(a.useEffect)((function(){var e=new AbortController;return c&&E(c,e),function(){return e.abort()}}),[c,E]),{graphData:i,error:p}}().graphData,n=Object(a.useState)(!1),c=Object(y.a)(n,2),l=c[0],o=c[1],i=Object(a.useState)(!1),u=Object(y.a)(i,2),s=u[0],m=u[1],p=Object(a.useState)(null),f=Object(y.a)(p,2),E=f[0],d=f[1];return Object(a.useEffect)((function(){var t=new AbortController;return e&&function(){var n=Object(j.a)(O.a.mark((function n(){var a,r,c,l;return O.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,fetch(ce.apiURL,{method:"GET",headers:{Authorization:"Bearer "+e},signal:t.signal});case 3:return r=n.sent,n.next=6,r.json();case 6:(null===(c=n.sent)||void 0===c||null===(a=c.data)||void 0===a?void 0:a.claims)&&(o(!0),d(null),m(null===c||void 0===c||null===(l=c.data)||void 0===l?void 0:l.claims)),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),d(n.t0);case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(){return n.apply(this,arguments)}}()(),function(){return t.abort()}}),[e]),r.a.createElement(Se.a,null,t&&r.a.createElement(je,{graphData:t}),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h5",null,ce.apiURL),r.a.createElement(N.a,{variant:"outlined",color:"primary"},l?"Access Is Granted":"Access Not Granted"),r.a.createElement("h5",null,E&&(null===E||void 0===E?void 0:E.message)),r.a.createElement("h5",null,s&&JSON.stringify(s))))};function Pe(){var e=Object(K.a)({},re);return r.a.createElement(k.b,{interactionType:X.g.Popup,authenticationRequest:e,errorComponent:Ae,loadingComponent:Re},r.a.createElement(Te,null))}var Ie=new(n(169).a)(ae),Le=function(){return r.a.createElement(o.c,null,r.a.createElement(o.a,{path:"/profile"},r.a.createElement(Pe,null)),r.a.createElement(o.a,{path:"/"},r.a.createElement(_,null)))},Ne=function(){var e=Object(o.f)();return r.a.createElement(i.a,null,r.a.createElement(u.a,{theme:E},r.a.createElement(A,{instance:Ie,config:{instanceConfig:ae,router:e}},r.a.createElement(Q,null,r.a.createElement(s.a,{container:!0,justify:"center"},r.a.createElement(Le,null))))))};n(120);l.a.render(r.a.createElement(Ne,null),document.getElementById("root"))}},[[106,1,2]]]);
//# sourceMappingURL=main.027bcd1d.chunk.js.map