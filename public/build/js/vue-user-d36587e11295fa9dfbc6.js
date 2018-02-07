!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return webpackJsonp([15],{165:function(t,e,n){"use strict";function r(t,e){if(t&&t.user_settings){var n=t.user_settings.find(function(t){return t.name===e});if(n)return n.value}}n.d(e,"b",function(){return i}),n.d(e,"a",function(){return s}),e.c=r;var i={defaultEvaluationRange:["currentQuarter","currentSemester","currentYear","allTime"]},s={defaultEvaluationRange:'Warning: selecting "All time" by default may result in longer loading times'}},19:function(t,e,n){"use strict";var r=n(40),i=n(41),s=n(0),a=s(r.a,i.a,!1,null,null,null);e.a=a.exports},40:function(t,e,n){"use strict";var r=n(39);e.a={props:{value:{type:Array,required:!0}},methods:{removeAlert:function(t){var e=this.value.slice();e.splice(t,1),this.$emit("input",e)}},components:{BootstrapAlert:r.a}}},41:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",t._l(t.value,function(e,r){return n("bootstrap-alert",t._b({key:r,attrs:{dismissable:""},on:{close:function(e){t.removeAlert(r)}}},"bootstrap-alert",e,!1))}))},i=[],s={render:r,staticRenderFns:i};e.a=s},7:function(t,e,n){"use strict";var r=n(19);e.a={data:function(){return{alerts:[]}},components:{AlertList:r.a}}},905:function(t,e,n){"use strict";function r(t,e){return new s.a({mixins:[a.a],el:t,props:{user:{type:Object,required:!0}},propsData:e,data:function(){var t=Object(c.n)(this.user,["user_settings","notifications","reminder_frequency"]);return t.remind_only_if_pending="yes"===this.user.remind_only_if_pending,t},computed:{USER_SETTINGS:function(){return o.b},SETTINGS_HELP:function(){return o.a}},methods:{handleNotificationsUpdate:function(t){var e=this;t.preventDefault(),fetch("/user/notifications",Object.assign({},Object(c.g)(),{method:"POST",body:JSON.stringify({_method:"PATCH",notifications:this.notifications})})).then(c.z).then(function(){e.alerts.push({type:"success",text:"Notification preferences saved successfully!"})}).catch(function(t){Object(u.b)(t,e,"There was a problem saving your notification preferences")})},handleRemindersUpdate:function(t){var e=this;t.preventDefault(),fetch("/user/reminders",Object.assign({},Object(c.g)(),{method:"POST",body:JSON.stringify({_method:"PATCH",reminder_frequency:this.reminder_frequency,remind_only_if_pending:this.remind_only_if_pending?"yes":"no"})})).then(c.z).then(function(){e.alerts.push({type:"success",text:"Reminder preferences saved successfully!"})}).catch(function(t){Object(u.b)(t,e,"There was a problem saving your notification preferences")})},getUserSetting:function(t){return Object(o.c)(this,t)},displaySetting:c.c,handleSettingsSubmit:function(t){var e=this;t.preventDefault();var n=new FormData(t.target);fetch("/users/settings",Object.assign({},Object(c.g)({contentType:null}),{method:"POST",body:n})).then(c.w).then(function(t){var r=Array.from(Object.entries(t)),i=r.filter(function(t){var e=f(t,2);e[0];return e[1]}).map(function(t){var e=f(t,2),n=e[0];e[1];return n}),s=r.filter(function(t){var e=f(t,2);e[0];return!e[1]}).map(function(t){var e=f(t,2),n=e[0];e[1];return n});if(i.length>0){var a=i.length;e.alerts.push({type:"success",text:a+" "+Object(c.A)("setting",a)+" saved successfully"});var u=e.user_settings,o=!0,l=!1,d=void 0;try{for(var p,h=i[Symbol.iterator]();!(o=(p=h.next()).done);o=!0){var v=p.value;!function(t){var e={name:t,value:n.get(t)},r=u.findIndex(function(e){return e.name===t});-1===r?u.push(e):u.splice(r,1,e)}(v)}}catch(t){l=!0,d=t}finally{try{!o&&h.return&&h.return()}finally{if(l)throw d}}e.user_settings=u}if(s.length>0){var y=s.length;e.alerts.push({type:"error",html:"\n\t\t\t\t\t\t\t\t<p>"+y+" "+Object(c.A)("setting",y)+" not saved</p>\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t"+s.map(function(t){return"<li>"+e.displaySetting(t)+"</li>"})+"\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t"})}}).catch(function(t){Object(u.b)(t,e,"There was a problem saving your settings")})}}})}Object.defineProperty(e,"__esModule",{value:!0}),e.createUserSettingsPage=r;var i=n(12),s=n.n(i),a=n(7),u=n(3),o=n(165),c=n(1),f=function(){function t(t,e){var n=[],r=!0,i=!1,s=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,s=t}finally{try{!r&&u.return&&u.return()}finally{if(i)throw s}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()}},[905])});
//# sourceMappingURL=vue-user-d36587e11295fa9dfbc6.js.map