(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){e.exports=a(46)},24:function(e,t,a){},26:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(13),o=a.n(i),l=(a(24),a(14)),c=a(15),s=a(2),u=a(17),d=a(18),m=a(3),h=(a(26),a(16)),p=a.n(h);function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(m.a)(e);if(t){var r=Object(m.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(d.a)(this,a)}}var g=function(e){Object(u.a)(a,e);var t=f(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={previewImageUrl:!1,imageHeight:200,imagePrediction:""},e.generatePreviewImageUrl=e.generatePreviewImageUrl.bind(Object(s.a)(e)),e.handleChange=e.handleChange.bind(Object(s.a)(e)),e.uploadHandler=e.uploadHandler.bind(Object(s.a)(e)),e}return Object(c.a)(a,[{key:"generatePreviewImageUrl",value:function(e,t){var a=new FileReader;a.readAsDataURL(e);a.onloadend=function(e){return t(a.result)}}},{key:"handleChange",value:function(e){var t=this,a=e.target.files[0];a&&(this.setState({imageFile:a}),this.generatePreviewImageUrl(a,function(e){t.setState({previewImageUrl:e,imagePrediction:""})}))}},{key:"uploadHandler",value:function(e){var t=this,a=new FormData;a.append("file",this.state.imageFile,"img.png");var n=performance.now();p.a.post("https://react-flask-waste-classifier.herokuapp.com/upload",a).then(function(e,a){a=e.data,t.setState({imagePrediction:a});var r=performance.now();console.log("The time it took to predict the image "+(r-n)+" milliseconds.")})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("div",{className:"App-upload"},r.a.createElement("p",null,"Upload an image for classification"),r.a.createElement("div",null,r.a.createElement("input",{type:"file",name:"file",onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("input",{type:"submit",onClick:this.uploadHandler})),r.a.createElement("div",null,this.state.previewImageUrl&&r.a.createElement("img",{height:this.state.imageHeight,alt:"",src:this.state.previewImageUrl})),r.a.createElement("div",null,this.state.imagePrediction&&r.a.createElement("p",null,"The model predicted: ",this.state.imagePrediction)))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.5b28db90.chunk.js.map