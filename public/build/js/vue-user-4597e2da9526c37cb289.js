!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return webpackJsonp([13],{168:function(t,e,n){"use strict";function r(t,e){if(t&&t.user_settings){var n=t.user_settings.find(function(t){return t.name===e});if(n)return n.value}}n.d(e,"b",function(){return i}),n.d(e,"a",function(){return a}),e.c=r;var i={defaultEvaluationRange:["currentQuarter","currentSemester","currentYear","allTime"]},a={defaultEvaluationRange:'Warning: selecting "All time" by default may result in longer loading times'}},19:function(t,e,n){"use strict";var r=n(40),i=n(44),a=n(0),s=a(r.a,i.a,!1,null,null,null);e.a=s.exports},23:function(t,e,n){"use strict";function r(t){n(41)}var i=n(42),a=n(43),s=n(0),u=r,o=s(i.a,a.a,!1,u,"data-v-60b11fda",null);e.a=o.exports},40:function(t,e,n){"use strict";var r=n(23);e.a={props:{value:{type:Array,required:!0}},methods:{removeAlert:function(t){var e=this.value.slice();e.splice(t,1),this.$emit("input",e)}},components:{BootstrapAlert:r.a}}},41:function(t,e){},42:function(t,e,n){"use strict";e.a={props:{type:{type:String,default:"error",validator:function(t){return["info","success","warning","error","danger"].includes(t)}},text:{type:String,required:!1},html:{type:String,required:!1},dismissable:{type:Boolean,default:!1}},computed:{alertTypeClass:function(){return"error"===this.type?"alert-danger":"alert-"+this.type}}}},43:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"alert",class:t.alertTypeClass},[t.dismissable?n("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){t.$emit("close")}}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]):t._e(),t._v("\n\t"+t._s(t.text)+"\n\t"),t.html?n("div",{domProps:{innerHTML:t._s(t.html)}}):t._e(),t._v(" "),t._t("default")],2)},i=[],a={render:r,staticRenderFns:i};e.a=a},44:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",t._l(t.value,function(e,r){return n("bootstrap-alert",t._b({key:r,attrs:{dismissable:""},on:{close:function(e){t.removeAlert(r)}}},"bootstrap-alert",e,!1))}))},i=[],a={render:r,staticRenderFns:i};e.a=a},8:function(t,e,n){"use strict";var r=n(19);e.a={data:function(){return{alerts:[]}},components:{AlertList:r.a}}},892:function(t,e,n){"use strict";function r(t,e){return new a.a({mixins:[s.a],el:t,props:{user:{type:Object,required:!0}},propsData:e,data:function(){return{user_settings:this.user.user_settings}},computed:{USER_SETTINGS:function(){return o.b},SETTINGS_HELP:function(){return o.a}},methods:{getUserSetting:function(t){return Object(o.c)(this,t)},displaySetting:c.c,handleSettingsSubmit:function(t){var e=this;t.preventDefault();var n=new FormData(t.target);fetch("/users/settings",Object.assign({},Object(c.g)({contentType:null}),{method:"POST",body:n})).then(c.u).then(function(t){var r=Array.from(Object.entries(t)),i=r.filter(function(t){var e=l(t,2);e[0];return e[1]}).map(function(t){var e=l(t,2),n=e[0];e[1];return n}),a=r.filter(function(t){var e=l(t,2);e[0];return!e[1]}).map(function(t){var e=l(t,2),n=e[0];e[1];return n});if(i.length>0){var s=i.length;e.alerts.push({type:"success",text:s+" "+Object(c.y)("setting",s)+" saved successfully"});var u=e.user_settings,o=!0,f=!1,p=void 0;try{for(var d,v=i[Symbol.iterator]();!(o=(d=v.next()).done);o=!0){var y=d.value;!function(t){var e={name:t,value:n.get(t)},r=u.findIndex(function(e){return e.name===t});-1===r?u.push(e):u.splice(r,1,e)}(y)}}catch(t){f=!0,p=t}finally{try{!o&&v.return&&v.return()}finally{if(f)throw p}}e.user_settings=u}if(a.length>0){var m=a.length;e.alerts.push({type:"error",html:"\n\t\t\t\t\t\t\t\t<p>"+m+" "+Object(c.y)("setting",m)+" not saved</p>\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t"+a.map(function(t){return"<li>"+e.displaySetting(t)+"</li>"})+"\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t"})}}).catch(function(t){Object(u.b)(t,e,"There was a problem saving your settings")})}}})}Object.defineProperty(e,"__esModule",{value:!0}),e.createUserSettingsPage=r;var i=n(17),a=n.n(i),s=n(8),u=n(4),o=n(168),c=n(1),l=function(){function t(t,e){var n=[],r=!0,i=!1,a=void 0;try{for(var s,u=t[Symbol.iterator]();!(r=(s=u.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(t){i=!0,a=t}finally{try{!r&&u.return&&u.return()}finally{if(i)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()}},[892])});
//# sourceMappingURL=vue-user-4597e2da9526c37cb289.js.map