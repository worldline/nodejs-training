(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{562:function(e,t,n){"use strict";n.r(t);var r=n(563),o=n.n(r);for(var l in r)["default"].indexOf(l)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(l);t.default=o.a},563:function(e,t){},587:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-card",[n("v-card-title",{staticClass:"headline primary--text"},[e._v("Client HTTP")]),e._v(" "),n("v-card-text",[n("v-card-title",{staticClass:"subheading primary--text"},[e._v("La librairie got")]),e._v(" "),n("p",[e._v("\n            Node.js fournit un "),n("a",{attrs:{href:"https://nodejs.org/api/http.html#http_http_request_options_callback"}},[e._v("client HTTP")]),e._v(" qui est assez bas-niveau.\n            Il est donc préférable d'utiliser une librairie comme "),n("a",{attrs:{href:"https://www.npmjs.com/package/got"}},[e._v("got")]),e._v(" qui ajoute notamment les fonctionnalités suivantes :\n            "),n("ul",[n("li",[e._v("gestion du http et du https avec le même module ;")]),e._v(" "),n("li",[e._v("envoi et réception de JSON ;")]),e._v(" "),n("li",[e._v("gestion des redirections ;")]),e._v(" "),n("li",[e._v("utilisation de promesses.")])])]),e._v(" "),n("p",[e._v("\n            Pour faire une requête GET, il suffit de passer l'URL en premier paramètre de "),n("code",[e._v("got")]),e._v(" "),n("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[n("code",{attrs:{language:"js"}},[e._v("import got from 'got';\n\nconst { body } = await got('http://www.google.com');")])]),e._v(" "),n("br"),e._v(" "),n("ul",[n("li",[n("code",[e._v("response")]),e._v(" : un objet "),n("a",{attrs:{href:"https://nodejs.org/api/http.html#http_class_http_incomingmessage"}},[e._v("IncomingMessage")]),e._v(" qui représente la réponse HTTP (statusCode, headers...)")]),e._v(" "),n("li",[n("code",[e._v("body")]),e._v(" : le body de la réponse (String, ou objet JSON en fonction des options passées à "),n("code",[e._v("got")]),e._v(")")])])]),e._v(" "),n("p",[e._v("\n            Pour faire des requêtes plus complexes, il est aussi possible de passer un objet en deuxième paramètre :\n            "),n("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[n("code",{attrs:{language:"js"}},[e._v("const res = await got('http://www.google.com/search', {\n  method: 'GET',\n  searchParams: {\n    q: 'request'\n  }\n});")])])]),e._v(" "),n("p",[e._v("\n            La liste complète des options est disponible dans le "),n("a",{attrs:{href:"https://www.npmjs.com/package/got"}},[e._v("readme")]),e._v(". Les plus souvent utilisées sont :\n            "),n("ul",[n("li",[n("code",[e._v("method")]),e._v(" : la méthode HTTP (GET, POST...) ;")]),e._v(" "),n("li",[n("code",[e._v("searchParams")]),e._v(" : les paramètres en query-string ;")]),e._v(" "),n("li",[n("code",[e._v("body")]),e._v(" : le corps de la requête ;")]),e._v(" "),n("li",[n("code",[e._v("responseType: 'json'")]),e._v(" permet de parser automatiquement la réponse JSON ;")]),e._v(" "),n("li",[n("code",[e._v("agent")]),e._v(" : permet de fournir un agent HTTP/HTTPS/HTTP2 (utile notamment pour utiliser un proxy).")])])]),e._v(" "),n("v-alert",{attrs:{outlined:"",value:!0,color:"info",icon:"info",outline:""}},[e._v("\n            La librairie "),n("a",{attrs:{href:"https://www.npmjs.com/package/request"}},[e._v("request")]),e._v(" est actuellement la plus utilisée comme client HTTP.\n            Cependant, elle est dorénavant en "),n("a",{attrs:{href:"https://github.com/request/request/issues/3142"}},[e._v("maintenance")]),e._v(" et n'aura plus de nouvelles fonctionnalités.\n          ")])],1),e._v(" "),n("v-card-text",[n("v-card-title",{staticClass:"subheading secondary--text"},[e._v("TP Fil rouge")]),e._v(" "),n("p",[e._v("\n            Dans un nouveau module "),n("code",[e._v("app/jokes.js")]),e._v(" :\n            "),n("ol",[n("li",[e._v("créer la fonction asynchrone "),n("code",[e._v("getJoke()")]),e._v(" qui appelle l'API "),n("a",{attrs:{href:"http://api.icndb.com/jokes/random"}},[e._v("http://api.icndb.com/jokes/random")]),e._v(" et qui retourne le champ "),n("code",[e._v("joke")]),e._v(" de la réponse ;")]),e._v(" "),n("li",[e._v("tester "),n("code",[e._v("getJoke()")]),e._v(" (utiliser "),n("a",{attrs:{href:"https://github.com/nock/nock"}},[e._v("nock")]),e._v(" pour bouchonner l'API) ;")]),e._v(" "),n("li",[e._v("modifier "),n("code",[e._v("getJoke()")]),e._v(" pour remplacer de la prénom de la joke par votre prénom (voir la "),n("a",{attrs:{href:"http://www.icndb.com/api/"}},[e._v("documentation de l'API")]),e._v(").")])])]),e._v(" "),n("v-alert",{attrs:{outlined:"",value:!0,color:"warning",icon:"warning",outline:""}},[n("ul",[n("li",[e._v("Si vous utilisez un proxy, utilisez "),n("a",{attrs:{href:"https://www.npmjs.com/package/caw"}},[e._v("caw")]),e._v(" comme agent HTTP (il gère automatiquement le proxy en fonction des variables d'environnement ;")]),e._v(" "),n("li",[n("code",[e._v("got")]),e._v(" va en cas d'erreur automatiquement réessayer de faire la requête (voir le paramètre "),n("a",{attrs:{href:"https://www.npmjs.com/package/got#retry"}},[e._v("retry")]),e._v(") ;")]),e._v(" "),n("li",[e._v("Pensez également à configurer un timeout.")])])])],1)],1)],1)},o=[]},594:function(e,t,n){"use strict";n.r(t);var r=n(587),o=n(562);for(var l in o)["default"].indexOf(l)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(l);var v=n(83),c=n(177),_=n.n(c),d=n(612),m=n(549),h=n(547),f=n(543),component=Object(v.a)(o.default,r.a,r.b,!1,null,null,null);t.default=component.exports,_()(component,{VAlert:d.a,VCard:m.a,VCardText:h.a,VCardTitle:h.b,VContainer:f.a})}}]);