(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{19:function(e,t,n){},20:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var o=n(2),a=n(13),i=n.n(a),c=(n(19),n(3)),s=(n(20),n(14)),r=n.n(s),l=n(0),d=function(){var e=Object(o.useState)(!1),t=Object(c.a)(e,2),n=t[0],a=t[1],i=Object(o.useState)(""),s=Object(c.a)(i,2),d=s[0],j=s[1],p=Object(o.useState)(),h=Object(c.a)(p,2),m=h[0],u=h[1];return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)("h1",{className:"App-title",children:"Waste Image Classification App"}),Object(l.jsxs)("div",{className:"App-upload",children:[Object(l.jsx)("p",{children:"Upload an image for classification"}),Object(l.jsx)("div",{className:"image",children:n&&Object(l.jsx)("img",{height:400,alt:"",src:n})}),Object(l.jsx)("div",{children:Object(l.jsx)("input",{type:"file",name:"file",onChange:function(e){var t=e.target.files[0];t&&(u(t),function(e,t){var n=new FileReader;n.readAsDataURL(e),n.onloadend=function(e){return t(n.result)}}(t,(function(e){a(e),j("")})))}})}),Object(l.jsx)("div",{children:Object(l.jsx)("input",{type:"submit",onClick:function(e){var t=new FormData;console.log("imageFile:",m),t.append("file",m,"img.png");var n=performance.now(),o=window.location.origin,a="".concat(o,"/upload");console.log("endpoint:",a),console.log("formData:",t),r.a.post(a,t).then((function(e){var t=e.data;j(t);var o=performance.now();console.log("The time it took to predict the image "+(o-n)+" milliseconds.")})).catch((function(e){console.log(e)}))}})}),d&&Object(l.jsx)("div",{className:"Prediction-area",children:Object(l.jsxs)("p",{children:["The model predicted that this image is of the waste image category: ",d]})})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(l.jsx)(d,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.1bf2ac82.chunk.js.map