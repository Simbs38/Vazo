(function(e){function t(t){for(var r,a,i=t[0],s=t[1],u=t[2],l=0,b=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&b.push(c[a][0]),c[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(b.length)b.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==c[s]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},c={app:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var d=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"04ad":function(e,t,n){},"596f":function(e,t,n){},bdc7:function(e,t,n){"use strict";n("596f")},c9cd:function(e,t,n){"use strict";n("04ad")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("e792"),n("0cdd"),n("ab8b"),n("2dd8");var r=n("7a23");function c(e,t,n,c,o,a){var i=Object(r["w"])("navbar"),s=Object(r["w"])("router-view");return Object(r["r"])(),Object(r["f"])(r["a"],null,[Object(r["i"])(i),Object(r["i"])(s)],64)}n("b0c0");var o={id:"menu",class:"topnav"};function a(e,t,n,c,a,i){var s=Object(r["w"])("router-link");return Object(r["r"])(),Object(r["f"])("div",o,[(Object(r["r"])(!0),Object(r["f"])(r["a"],null,Object(r["v"])(e.routeList,(function(e){return Object(r["r"])(),Object(r["d"])(s,{key:e.path,to:e.path},{default:Object(r["C"])((function(){return[Object(r["h"])(Object(r["y"])(e.name),1)]})),_:2},1032,["to"])})),128))])}var i=Object(r["j"])({name:"navbar",data:function(){return{routeList:[]}},created:function(){this.routeList=this.$router.getRoutes()}}),s=(n("c9cd"),n("6b0d")),u=n.n(s);const d=u()(i,[["render",a]]);var l=d,b=Object(r["j"])({name:"Base",components:{navbar:l}});const h=u()(b,[["render",c]]);var f=h,p=n("6c02"),j={id:"headCanvas"};function v(e,t,n,c,o,a){return Object(r["r"])(),Object(r["f"])("div",j)}var m=n("d4ec"),O=n("bee2"),w=n("ade3"),g=n("4721"),y=n("5a89"),C=function(){function e(t){Object(m["a"])(this,e),Object(w["a"])(this,"scene",void 0),Object(w["a"])(this,"renderer",void 0),Object(w["a"])(this,"controls",void 0),this.scene=new y["I"],this.renderer=new y["T"],this.renderer.setSize(window.innerWidth,window.innerHeight),this.controls=new g["a"](t,this.renderer.domElement),this.controls.enablePan=!1}return Object(O["a"])(e,[{key:"AddMeshToScene",value:function(e){this.scene.add(e)}},{key:"AddLigth",value:function(e,t,n){var r=new y["k"](n,t,2);this.scene.add(r);var c=new y["L"](e,4);return c.castShadow=!0,c.shadow.bias=-1e-5,c.shadow.mapSize.height=4096,c.shadow.mapSize.width=4096,this.scene.add(c),c}},{key:"CreateCube",value:function(){var e=new y["b"],t=new y["t"]({color:65280,wireframe:!1}),n=new y["s"](e,t);return this.scene.add(n),n}},{key:"getDomElement",value:function(){return this.renderer.domElement}}]),e}(),k=n("1da1"),x=(n("96cf"),n("e642")),S=function(){function e(){Object(m["a"])(this,e)}return Object(O["a"])(e,null,[{key:"CreateMesh",value:function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t,n,r){var c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(new x["a"]).loadAsync(t);case 2:return c=e.sent,c.scale.set(r.x,r.y,r.z),c.position.set(n.x,n.y,n.z),e.abrupt("return",c);case 6:case"end":return e.stop()}}),e)})));function t(t,n,r){return e.apply(this,arguments)}return t}()},{key:"ChangeToNormals",value:function(e){var t=new y["w"];e.material=t}},{key:"ChangeToToon",value:function(e,t){var n=new y["y"];n.color.set(t),e.material=n}},{key:"ChangeColor",value:function(e,t){var n=new y["v"];n.color.set(t),e.material=n}}]),e}(),T=n("32d9"),M=n("93e9"),L=n("4e15"),P=n("1294"),R=function(){function e(){Object(m["a"])(this,e)}return Object(O["a"])(e,null,[{key:"CreateText",value:function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){var n,r,c,o,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new P["a"],e.next=3,n.loadAsync("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/optimer_regular.typeface.json");case 3:return r=e.sent,c=new y["O"](t,{font:r,size:.5,height:.1,curveSegments:10,bevelThickness:1,bevelSize:1}),c.computeBoundingBox(),o=new y["t"],a=new y["s"](c,o),e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),A=new y["B"](75,window.innerWidth/window.innerHeight,.1,1e3);A.position.set(0,1.1,2),A.lookAt(0,0,0);var z=new C(A);z.renderer.toneMapping=y["H"],z.renderer.toneMappingExposure=2,z.renderer.shadowMap.enabled=!0,R.CreateText("Hello").then((function(e){z.scene.add(e);var t=new L["a"](new y["Q"](1024,1024),z.scene,A,[e]);t.visibleEdgeColor.set(16777215),t.edgeThickness=2,t.edgeStrength=10,t.overlayMaterial.blending=y["M"],E.addPass(t)}));var E=new T["a"](z.renderer);E.addPass(new M["a"](z.scene,A));var H=z.AddLigth(16755036,1118244,15136748);function _(){var e=document.getElementById("headCanvas");e.appendChild(z.renderer.domElement);var t="https://raw.githubusercontent.com/Simbs38/Vazo/master/src/public/static/vaso.obj",n=S.CreateMesh(t,new y["R"](0,-1,0),new y["R"](.05,.05,.05));n.then((function(e){S.ChangeToToon(e.children[0],16777215),S.ChangeColor(e.children[1],1564259);var t=new L["a"](new y["Q"](1024,1024),z.scene,A,[e.children[0],e.children[1]]);t.visibleEdgeColor.set(16777215),t.edgeThickness=2,t.edgeStrength=10,t.overlayMaterial.blending=y["M"],E.addPass(t),z.scene.add(e)})).catch((function(e){return console.log(e)})),B()}function V(){A.aspect=window.innerWidth/window.innerHeight,A.updateProjectionMatrix(),z.renderer.setSize(window.innerWidth,window.innerHeight),F()}function B(){requestAnimationFrame(B),z.controls.update(),F()}function F(){H.position.set(A.position.x+10,A.position.y+10,A.position.z+10),E.render()}document.body.appendChild(z.getDomElement()),z.scene.background=new y["e"](4549008),window.addEventListener("resize",V,!1);var W=Object(r["j"])({name:"Home",mounted:function(){_()}});n("bdc7");const D=u()(W,[["render",v]]);var I=D;function J(e,t,n,c,o,a){var i=Object(r["w"])("Form");return Object(r["r"])(),Object(r["d"])(i)}var Q={class:"container"},q={class:"mb-3"},N=Object(r["g"])("label",{for:"country",class:"form-label"},"Country",-1),U=Object(r["g"])("option",{value:""},null,-1),$=["value"],G={key:0,class:"mb-3"},K=Object(r["g"])("label",{for:"city",class:"form-label"},"City",-1),X={name:"city",id:"city",class:"form-control form-select"},Y=Object(r["g"])("option",{value:""},null,-1),Z=Object(r["g"])("div",{class:"mb-3"},[Object(r["g"])("label",{for:"text",class:"form-label"},"Text"),Object(r["g"])("textarea",{name:"text",class:"form-control",id:"text",rows:"3"})],-1);function ee(e,t,n,c,o,a){return Object(r["r"])(),Object(r["f"])("div",Q,[Object(r["g"])("form",null,[Object(r["g"])("div",q,[N,Object(r["D"])(Object(r["g"])("select",{onChange:t[0]||(t[0]=function(t){return e.countryChanged()}),"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.selectedCountry=t}),ref:"country",name:"country",id:"country",class:"form-control form-select"},[U,(Object(r["r"])(!0),Object(r["f"])(r["a"],null,Object(r["v"])(e.countryList,(function(e){return Object(r["r"])(),Object(r["f"])("option",{value:e.code,key:e.code},Object(r["y"])(e.name),9,$)})),128))],544),[[r["A"],e.selectedCountry]])]),e.isCityVisible?(Object(r["r"])(),Object(r["f"])("div",G,[K,Object(r["g"])("select",X,[Y,(Object(r["r"])(!0),Object(r["f"])(r["a"],null,Object(r["v"])(e.cityList,(function(e){return Object(r["r"])(),Object(r["f"])("option",{key:e},Object(r["y"])(e),1)})),128))])])):Object(r["e"])("",!0),Z,Object(r["g"])("button",{onClick:t[2]||(t[2]=function(t){return e.submit()}),type:"button",class:"btn btn-success"},"Submit")])])}n("d3b7"),n("159b"),n("4de4");var te=Object(O["a"])((function e(t,n,r){Object(m["a"])(this,e),Object(w["a"])(this,"code",void 0),Object(w["a"])(this,"name",void 0),Object(w["a"])(this,"cities",void 0),this.code=t,this.name=n,this.cities=r})),ne=Object(r["j"])({name:"Form",data:function(){return{countryList:Array(),cityList:Array(),selectedCountry:"",selectedCity:String,isCityVisible:!1}},created:function(){this.loadCountries()},methods:{loadCountries:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://countriesnow.space/api/v0.1/countries");case 2:return n=t.sent,t.next=5,n.json();case 5:r=t.sent,r.data.forEach((function(t){var n=new te(t.iso2,t.country,t.cities);e.countryList.push(n)}));case 7:case"end":return t.stop()}}),t)})))()},countryChanged:function(){var e=this,t=this.countryList.filter((function(t){if(t.code===e.selectedCountry)return!0}));t.length>0?(this.cityList=t[0].cities,this.isCityVisible=!0):this.isCityVisible=!1},submit:function(){return Object(k["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:3000/api/form",{mode:"cors"});case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})))()}}});const re=u()(ne,[["render",ee]]);var ce=re,oe=Object(r["j"])({name:"Register",components:{Form:ce}});const ae=u()(oe,[["render",J]]);var ie=ae,se={class:"check"},ue=Object(r["g"])("h1",null,"This is an check page",-1),de=[ue];function le(e,t,n,c,o,a){return Object(r["r"])(),Object(r["f"])("div",se,de)}var be=Object(r["j"])({name:"Check"});const he=u()(be,[["render",le]]);var fe=he,pe={class:"print"},je=Object(r["g"])("h1",null,"This is an print page",-1),ve=[je];function me(e,t,n,c,o,a){return Object(r["r"])(),Object(r["f"])("div",pe,ve)}var Oe=Object(r["j"])({name:"Print"});const we=u()(Oe,[["render",me]]);var ge=we,ye={class:"about"},Ce=Object(r["g"])("h1",null,"This is an about page",-1),ke=[Ce];function xe(e,t,n,c,o,a){return Object(r["r"])(),Object(r["f"])("div",ye,ke)}var Se=Object(r["j"])({name:"About"});const Te=u()(Se,[["render",xe]]);var Me=Te,Le=[{path:"/",name:"Home",component:I},{path:"/register",name:"Register",component:ie},{path:"/check",name:"Check",component:fe},{path:"/print",name:"Print",component:ge},{path:"/about",name:"About",component:Me}],Pe=Object(p["a"])({history:Object(p["b"])("/"),routes:Le}),Re=Pe;Object(r["c"])(f).use(Re).mount("#app")}});
//# sourceMappingURL=app.c21984cb.js.map