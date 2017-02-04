!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var o in n)("object"==typeof exports?exports:t)[o]=n[o]}}(this,function(){return webpackJsonp([6,10],{11:function(t,e,n){var o=n(0)(n(20),n(28),null,null);t.exports=o.exports},113:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(322),i=n.n(o),s=n(324),r=n.n(s),a=n(5),l=n.n(a),u=n(2);e.default={props:["oldFormContents"],created:function(){var t=this;n.i(u.t)().then(function(e){t.groupedMilestones=e}).catch(function(t){console.error(t)}),fetch("/competencies",{credentials:"same-origin"}).then(function(t){if(t.ok)return t.json();var e=new Error(t.statusText);throw e.response=t,e}).then(function(e){t.competencies=e}).catch(function(t){console.error(t)})},data:function(){return{title:"",formType:"resident",periodType:"month",nextQuestionIdNum:1,groupedMilestones:[],competencies:[],items:[],customOptions:[],alerts:[]}},methods:{addInstruction:function(){this.items.push({type:"instruction",text:""})},addQuestion:function(){this.items.push({type:"question",text:"",questionIdNum:this.nextQuestionIdNum++,questionType:"radio",milestones:[],competencies:"",options:[],required:!1,weight:100})},changeItem:function(t,e){this.items.splice(t,1,Object.assign(this.items[t],e))},removeItem:function(t){var e=this.items[t];"question"===e.type&&e.questionIdNum===this.nextQuestionIdNum-1&&this.nextQuestionIdNum--,this.items.splice(t,1)},submitForm:function(t){var e=this;t.preventDefault();var o=JSON.stringify({title:this.title,formType:this.formType,evaluation_period_type:this.periodType,items:this.items.map(function(t){return t.questionId="q"+t.questionIdNum,t})});this.isFormValid()&&fetch("/forms",{method:"POST",headers:n.i(u.c)(),credentials:"same-origin",body:o}).then(function(t){if(t.ok)return t.text();throw new Error(t)}).then(function(t){if("success"!==t)throw new Error(t);window.location="/manage/forms"}).catch(function(t){e.alerts.push({type:"error",text:"Error saving form"}),console.error(t)})},isFormValid:function(){if(!this.title)return this.alerts.push({type:"error",text:"Please enter a title for the form"}),!1;if(!this.items||this.items.length<1)return this.alerts.push({type:"error",text:"Please enter at least one question"}),!1;var t=!0,e=!1,n=void 0;try{for(var o,i=this.items[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var s=o.value;if("question"===s.type){if(!s.text)return this.alerts.push({type:"error",text:"Please enter question text for question "+s.questionIdNum}),!1;if(["radio","radiononnumeric","checkbox"].includes(s.questionType)){if(!s.options||s.options.length<1)return this.alerts.push({type:"error",text:"Please add at least one option for each multiple-choice question"}),!1;var r=!0,a=!1,l=void 0;try{for(var u,c=s.options[Symbol.iterator]();!(r=(u=c.next()).done);r=!0){var p=u.value;if(!("value"in p))return this.alerts.push({type:"error",text:"An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question "+s.questionIdNum}),!1}}catch(t){a=!0,l=t}finally{try{!r&&c.return&&c.return()}finally{if(a)throw l}}}}else{if("instruction"!==s.type)return this.alerts.push({type:"error",text:"Unrecognized item type in form"}),!1;if(!s.text)return this.alerts.push({type:"error",text:"Please complete or remove all empty instruction blocks"}),!1}}}catch(t){e=!0,n=t}finally{try{!t&&i.return&&i.return()}finally{if(e)throw n}}return!0}},watch:{oldFormContents:function(t){this.title=t.title,this.formType=t.formType,this.items=t.items.slice();var e=!0,n=!1,o=void 0;try{for(var i,s=this.items[Symbol.iterator]();!(e=(i=s.next()).done);e=!0){var r=i.value;r.questionIdNum&&r.questionIdNum>=this.nextQuestionIdNum&&(this.nextQuestionIdNum=r.questionIdNum+1)}}catch(t){n=!0,o=t}finally{try{!e&&s.return&&s.return()}finally{if(n)throw o}}}},components:{FormBuilderInstruction:i.a,FormBuilderQuestion:r.a,AlertList:l.a}}},114:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["text"],data:function(){return{}},methods:{onInput:function(t){this.$emit("input",t.target.value)}}}},115:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["type","text","value","description","isWorkingOption"],computed:{displayType:function(){return"checkbox"===this.type?"checkbox":"radio"}},data:function(){return{isFocused:!1}},methods:{handleInputFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},handleInputBlur:function(t){this.isFocused=!1,this.$emit("blur",t)}}}},116:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(323),i=n.n(o),s=n(17),r=n.n(s),a=n(5),l=n.n(a),u=n(12),c=n(2);e.default={props:["formType","groupedMilestones","allCompetencies","questionIdNum","text","questionType","milestones","competencies","options","required","customOptions"],data:function(){return{workingOption:{text:"",value:"",description:""},alerts:[]}},computed:{questionId:function(){return"q"+this.questionIdNum},shouldShowMilestonesAndCompetencies:function(){return["radio","number"].includes(this.questionType)&&["resident","self-resident","fellow","self-fellow"].includes(this.formType)},optionsWithWorking:function(){if(this.options){var t=this.options.slice();return t.push(this.workingOption),t}},workingOptionIndex:function(){if(this.options)return this.options.length},competencyOptions:function(){return this.allCompetencies.map(function(t){return{id:t.id,text:t.title}}).sort(c.u)}},methods:{changeQuestionType:function(t){var e=t.target.value,n=[];this.$emit("change",{questionType:e,options:n})},handleWorkingOptionInput:function(t,e){t===this.workingOptionIndex&&(this.workingOption=Object.assign({},this.workingOption,e))},handleOptionChange:function(t,e){if(t===this.workingOptionIndex){var n=this.options.slice();n.push(Object.assign({},this.workingOption,e)),this.workingOption={text:"",value:"",description:""},this.$emit("change",{options:n})}else{var o=this.options.slice();o[t]=Object.assign(o[t],e),o[t].text||o[t].value||o[t].description||o.splice(t,1),this.$emit("change",{options:o})}},setStandardOptions:function(){var t=void 0;switch(this.formType){case"resident":case"self-resident":t=u.i.RESIDENT.slice();break;case"fellow":case"self-fellow":t=u.i.FELLOW.slice();break;case"faculty":"radiononnumeric"===this.questionType&&(t=u.i.FACULTY.slice())}return t?void this.$emit("change",{options:t}):void this.alerts.push({type:"error",text:"No standard options found for form type and question type"})},setMilestoneOptions:function(){var t=this;return 1!==this.milestones.length?void this.alerts.push({type:"error",text:"You can only use milestone options with a single selected milestone"}):void fetch("/milestones/"+this.milestones[0],{credentials:"same-origin"}).then(function(t){if(t.ok)return t.json();throw new Error(t)}).then(function(e){if(!e||!e.levels||e.levels.length<1)return void t.alerts.push({type:"error",text:"No milestone levels found"});var n=[{value:0,text:"Not yet "+e.levels[0].name}],o=!0,i=!1,s=void 0;try{for(var r,a=e.levels[Symbol.iterator]();!(o=(r=a.next()).done);o=!0){var l=r.value,u=2*parseInt(l.level_number,10);n.push({value:u-1,text:"",description:""}),n.push({value:u,text:l.name,description:l.description})}}catch(t){i=!0,s=t}finally{try{!o&&a.return&&a.return()}finally{if(i)throw s}}t.$emit("change",{options:n})}).catch(function(t){console.error(t)})},setCustomOptions:function(){return this.customOptions.length<1?void this.alerts.push({type:"error",text:"No custom options set"}):void this.$emit("change",{options:this.customOptions.slice()})}},components:{FormBuilderOption:i.a,SelectTwo:r.a,AlertList:l.a}}},17:function(t,e,n){var o=n(0)(n(35),n(41),null,null);t.exports=o.exports},19:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(11),i=n.n(o);e.default={props:{value:{type:Array,required:!0}},methods:{removeAlert:function(t){var e=this.value.slice();e.splice(t,1),this.$emit("input",e)}},components:{BootstrapAlert:i.a}}},20:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:"error",validator:function(t){return["info","success","warning","error","danger"].includes(t)}},text:{type:String,required:!1},html:{type:String,required:!1},dismissable:{type:Boolean,default:!1}},computed:{alertTypeClass:function(){return"error"===this.type?"alert-danger":"alert-"+this.type}}}},212:function(t,e,n){e=t.exports=n(1)(),e.push([t.i,".form-builder-question-option[data-v-09008ada]{margin-top:10px}.working-option[data-v-09008ada]{opacity:.5}.working-option.is-focused[data-v-09008ada],.working-option[data-v-09008ada]:active,.working-option[data-v-09008ada]:hover{opacity:1}textarea.form-option-description[data-v-09008ada]{resize:vertical;height:100px}",""])},218:function(t,e,n){e=t.exports=n(1)(),e.push([t.i,"",""])},233:function(t,e,n){e=t.exports=n(1)(),e.push([t.i,".question-id[data-v-aaf882ea]{font-size:larger;text-transform:uppercase;font-weight:700}",""])},28:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"alert",class:t.alertTypeClass},[t.dismissable?n("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){t.$emit("close")}}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]):t._e(),t._v("\n\t"+t._s(t.text)+"\n\t"),t.html?n("div",{domProps:{innerHTML:t._s(t.html)}}):t._e(),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},29:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",t._l(t.value,function(e,o){return n("bootstrap-alert",t._b({attrs:{dismissable:!0},on:{close:function(e){t.removeAlert(o)}}},"bootstrap-alert",e))}))},staticRenderFns:[]}},322:function(t,e,n){var o=n(0)(n(114),n(340),null,null);t.exports=o.exports},323:function(t,e,n){n(370);var o=n(0)(n(115),n(339),"data-v-09008ada",null);t.exports=o.exports},324:function(t,e,n){n(391);var o=n(0)(n(116),n(367),"data-v-aaf882ea",null);t.exports=o.exports},339:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center",class:{"working-option":t.isWorkingOption,"is-focused":t.isFocused}},[n("input",{attrs:{type:t.displayType,disabled:""}}),t._v(" "),n("input",{staticClass:"form-input form-option form-option-text form-control",attrs:{type:"text",placeholder:"Option Text"},domProps:{value:t.text},on:{input:function(e){t.$emit("input",{text:e.target.value})},change:function(e){t.$emit("change",{text:e.target.value})},focus:function(e){t.handleInputFocus("text")},blur:function(e){t.handleInputBlur("text")}}}),t._v(" "),n("input",{staticClass:"form-input form-option form-option-value form-control",attrs:{type:"radio"===t.type?"number":"text",placeholder:"Option Value"},domProps:{value:t.value},on:{input:function(e){t.$emit("input",{value:e.target.value})},change:function(e){t.$emit("change",{value:e.target.value})},focus:function(e){t.handleInputFocus("value")},blur:function(e){t.handleInputBlur("value")}}}),t._v(" "),n("textarea",{staticClass:"form-input form-option form-option-description form-control",attrs:{placeholder:"Hover Description"},domProps:{value:t.description},on:{input:function(e){t.$emit("input",{description:e.target.value})},change:function(e){t.$emit("change",{description:e.target.value})},focus:function(e){t.handleInputFocus("description")},blur:function(e){t.handleInputBlur("description")}}})])},staticRenderFns:[]}},340:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid form-instruction-block form-block"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-10"},[n("label",[t._v("Instruction block")]),t._v(" "),t._m(0),t._v(" "),n("textarea",{staticClass:"form-control form-instruction-text",attrs:{required:""},domProps:{value:t.text},on:{input:function(e){t.$emit("change",{text:e.target.value})}}})]),t._v(" "),n("div",{staticClass:"col-md-1 col-md-offset-1"},[n("button",{staticClass:"form-block-delete btn btn-danger del-btn",attrs:{type:"button"},on:{click:function(e){t.$emit("remove")}}},[t._v("Delete")])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("small",[t._v("Supports "),n("a",{attrs:{href:"http://daringfireball.net/projects/markdown/basics",target:"_blank"}},[t._v("markdown")]),t._v(" (except inline HTML)")])}]}},348:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"form-header"},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6"},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"form-title"}},[t._v("Form title")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.title,expression:"title",modifiers:{trim:!0}}],staticClass:"form-control input-lg",attrs:{type:"text",id:"form-title",name:"formTitle",placeholder:"Form Title",required:""},domProps:{value:t._s(t.title)},on:{input:function(e){e.target.composing||(t.title=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),n("div",{staticClass:"col-md-3"},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"form-type"}},[t._v("Form type")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.formType,expression:"formType"}],staticClass:"form-control input-lg",attrs:{id:"form-type",name:"form_type"},on:{change:function(e){t.formType=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e})[0]}}},[n("option",{attrs:{value:"resident"}},[t._v("Resident/Intern")]),t._v(" "),n("option",{attrs:{value:"self-resident"}},[t._v("Resident/Intern (self)")]),t._v(" "),n("option",{attrs:{value:"fellow"}},[t._v("Fellow")]),t._v(" "),n("option",{attrs:{value:"self-fellow"}},[t._v("Fellow (self)")]),t._v(" "),n("option",{attrs:{value:"faculty"}},[t._v("Faculty")]),t._v(" "),n("option",{attrs:{value:"staff"}},[t._v("Staff")])])])]),t._v(" "),n("div",{staticClass:"col-md-3"},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"form-period-type"}},[t._v("Evaluation period type")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.periodType,expression:"periodType"}],staticClass:"form-control input-lg",attrs:{id:"form-period-type"},on:{change:function(e){t.periodType=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e})[0]}}},[n("option",{attrs:{value:"month"}},[t._v("Month")]),t._v(" "),n("option",{attrs:{value:"quarter"}},[t._v("Quarter")])])])])])]),t._v(" "),n("div",{staticClass:"form-body"},[n("div",{staticClass:"form-items"},[t._l(t.items,function(e,o){return["instruction"===e.type?n("form-builder-instruction",t._b({on:{change:function(e){t.changeItem(o,e)},input:function(e){t.changeItem(o,e)},remove:function(e){t.removeItem(o)}}},"form-builder-instruction",e)):t._e(),t._v(" "),"question"===e.type?n("form-builder-question",t._b({attrs:{formType:t.formType,groupedMilestones:t.groupedMilestones,allCompetencies:t.competencies,customOptions:t.customOptions},on:{change:function(e){t.changeItem(o,e)},remove:function(e){t.removeItem(o)}}},"form-builder-question",e)):t._e()]})],2)]),t._v(" "),n("div",{attrs:{id:"form-footer"}},[n("alert-list",{directives:[{name:"model",rawName:"v-model",value:t.alerts,expression:"alerts"}],domProps:{value:t.alerts},on:{input:function(e){t.alerts=e}}}),t._v(" "),n("button",{staticClass:"btn btn-default",attrs:{type:"button",id:"add-instruction-block"},on:{click:t.addInstruction}},[t._v("Add instruction block")]),t._v(" "),n("button",{staticClass:"btn btn-info",attrs:{type:"button",id:"addQuestion"},on:{click:t.addQuestion}},[t._v("Add Question")]),t._v(" "),n("button",{staticClass:"btn btn-success",attrs:{type:"submit"},on:{click:t.submitForm}},[t._v("Submit Form")])],1)])},staticRenderFns:[]}},35:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{options:{type:Array,required:!1},name:{type:String,required:!1},id:{type:String,required:!1},required:{type:Boolean,required:!1},value:{required:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:"Please select"}},computed:{stringOptions:function(){if(!this.options)return[];var t=this.options.slice(),e=!0,n=!1,o=void 0;try{for(var i,s=t[Symbol.iterator]();!(e=(i=s.next()).done);e=!0){var r=i.value;if(r.id&&(r.id=r.id.toString()),r.children){var a=!0,l=!1,u=void 0;try{for(var c,p=r.children[Symbol.iterator]();!(a=(c=p.next()).done);a=!0){var d=c.value;d.id&&(d.id=d.id.toString())}}catch(t){l=!0,u=t}finally{try{!a&&p.return&&p.return()}finally{if(l)throw u}}}}}catch(t){n=!0,o=t}finally{try{!e&&s.return&&s.return()}finally{if(n)throw o}}return t},stringValue:function(){return this.value?Array.isArray(this.value)?this.value.slice().map(function(t){return t.toString()}):this.value.toString():""}},mounted:function(){var t=this;$(this.$el).on("change",function(){t.$emit("input",$(t.$el).val())}),$(this.$el).val(this.stringValue).select2({placeholder:this.placeholder,tags:this.multiple,createTag:function(){}})},updated:function(){$(this.$el).val(this.stringValue).select2({placeholder:this.placeholder,tags:this.multiple,createTag:function(){}}).trigger("change")},watch:{multiple:function(t){this.value&&(t&&!Array.isArray(this.value)?this.$emit("input",[this.value]):!t&&Array.isArray(this.value)&&this.$emit("input",this.value[0]))},stringValue:function(t){$(this.$el).val(t).trigger("change.select2")}},beforeDestroyed:function(){$(this.$el).off().select2("destroy")}}},367:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"form-question panel panel-default form-block",attrs:{id:t.questionId}},[n("div",{staticClass:"panel-heading form-horizontal"},[n("div",{staticClass:"panel-title form-group"},[n("div",{staticClass:"col-sm-12"},[n("label",{staticClass:"containing-label"},[t._v("\n\t\t\t\t\tQuestion Text\n\t\t\t\t\t"),n("div",{staticClass:"input-group"},[n("span",{staticClass:"question-id input-group-addon"},[t._v(t._s(t.questionId))]),t._v(" "),n("input",{staticClass:"form-input form-question-text form-control",attrs:{type:"text",placeholder:"Question Text",required:""},domProps:{value:t.text},on:{input:function(e){t.$emit("change",{text:e.target.value})}}})])])])]),t._v(" "),n("div",{staticClass:"hr-question"}),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4"},[n("label",{staticClass:"containing-label"},[t._v("\n\t\t\t\t\tQuestion Type\n\t\t\t\t\t"),n("select",{staticClass:"form-control form-question-type",attrs:{name:"questionType"},domProps:{value:t.questionType},on:{change:t.changeQuestionType}},[n("option",{attrs:{value:"radio"}},[t._v("Radio")]),t._v(" "),n("option",{attrs:{value:"text"}},[t._v("Text")]),t._v(" "),n("option",{attrs:{value:"radiononnumeric"}},[t._v("Radio (non-numeric)")]),t._v(" "),n("option",{attrs:{value:"number"}},[t._v("Number")]),t._v(" "),n("option",{attrs:{value:"checkbox"}},[t._v("Checkbox")])])])]),t._v(" "),n("div",{staticClass:"col-md-6"},[n("label",[t._v("Question Options")]),t._v(" "),n("div",{staticClass:"btn-group btn-group-justified"},[n("div",{staticClass:"btn-group"},[n("button",{staticClass:"form-question-standard-options btn btn-info",attrs:{type:"button"},on:{click:t.setStandardOptions}},[t._v("\n\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t")])]),t._v(" "),n("div",{staticClass:"btn-group"},[n("button",{staticClass:"form-question-milestone-level-options btn btn-info",attrs:{disabled:!t.milestones||1!==t.milestones.length,type:"button"},on:{click:t.setMilestoneOptions}},[t._v("\n\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t")])]),t._v(" "),n("div",{staticClass:"btn-group"},[n("button",{staticClass:"form-question-custom-options btn btn-info",attrs:{disabled:!t.customOptions||t.customOptions.length<1,type:"button"},on:{click:t.setCustomOptions}},[t._v("\n\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t")])])])]),t._v(" "),n("div",{staticClass:"col-md-1 labelless-button"},[n("button",{staticClass:"form-block-delete btn btn-danger del-btn",attrs:{type:"button"},on:{click:function(e){t.$emit("remove")}}},[t._v("\n\t\t\t\t\tDelete\n\t\t\t\t")])]),t._v(" "),n("div",{staticClass:"col-md-1"},[n("label",{staticClass:"containing-label"},[t._v("\n\t\t\t\t\tRequired\n\t\t\t\t\t"),n("input",{staticClass:"form-control form-question-required",attrs:{type:"checkbox",value:"required"},domProps:{checked:t.required},on:{change:function(e){t.$emit("change",{required:e.target.checked})}}})])])]),t._v(" "),n("div",{staticClass:"hr-question"}),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-8"},[n("label",{directives:[{name:"show",rawName:"v-show",value:t.shouldShowMilestonesAndCompetencies,expression:"shouldShowMilestonesAndCompetencies"}],staticClass:"containing-label"},[t._v("\n\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t"),n("select-two",{staticClass:"form-control form-question-milestone",attrs:{value:t.milestones,options:t.groupedMilestones,multiple:!0},on:{input:function(e){t.$emit("change",{milestones:arguments[0]})}}})],1)]),t._v(" "),n("div",{staticClass:"col-md-4"},[n("label",{directives:[{name:"show",rawName:"v-show",value:t.shouldShowMilestonesAndCompetencies,expression:"shouldShowMilestonesAndCompetencies"}],staticClass:"containing-label"},[t._v("\n\t\t\t\t\tQuestion Competency\n\t\t\t\t\t"),n("select-two",{staticClass:"form-control form-question-competency",attrs:{value:t.competencies,placeholder:"Competency",options:t.competencyOptions,multiple:!0},on:{input:function(e){t.$emit("change",{competencies:arguments[0]})}}})],1)])])]),t._v(" "),n("div",{staticClass:"panel-body"},[n("div",{staticClass:"row form-options",staticStyle:{"margin-bottom":"5px"}},[["radio","radiononnumeric","checkbox"].includes(t.questionType)?t._l(t.optionsWithWorking,function(e,o){return n("form-builder-option",t._b({attrs:{type:t.questionType,"is-working-option":e===t.workingOption},on:{input:function(e){t.handleWorkingOptionInput(o,arguments[0])},change:function(e){t.handleOptionChange(o,arguments[0])}}},"form-builder-option",e))}):t._e(),t._v(" "),"text"===t.questionType?n("div",{staticClass:"col-sm-12"},[n("textarea",{staticClass:"form-control",attrs:{placeholder:"Text",disabled:""}})]):t._e(),t._v(" "),"number"===t.questionType?n("div",{staticClass:"col-md-8"},[n("input",{staticClass:"form-control",attrs:{type:"number",placeholder:"Number",disabled:""}})]):t._e()],2)]),t._v(" "),n("alert-list",{directives:[{name:"model",rawName:"v-model",value:t.alerts,expression:"alerts"}],domProps:{value:t.alerts},on:{input:function(e){t.alerts=e}}})],1)},staticRenderFns:[]}},370:function(t,e,n){var o=n(212);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(3)("4426bde0",o,!0)},376:function(t,e,n){var o=n(218);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(3)("c5529d98",o,!0)},391:function(t,e,n){var o=n(233);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(3)("2d3fade8",o,!0)},396:function(t,e,n){"use strict";function o(t){return new s.a({el:t,data:function(){return{oldFormContents:{}}},render:function(t){return t(a.a,{props:{oldFormContents:this.oldFormContents}})}})}Object.defineProperty(e,"__esModule",{value:!0});var i=n(7),s=n.n(i),r=n(95),a=n.n(r);e.createFormBuilder=o},41:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("select",{attrs:{name:t.name,id:t.id,required:t.required,multiple:t.multiple}},[t._t("default"),t._v(" "),t._l(t.stringOptions,function(e){return[e.children&&e.children.length>0?n("optgroup",{attrs:{label:e.text}},t._l(e.children,function(e){return n("option",{domProps:{value:e.id}},[t._v("\n\t\t\t\t"+t._s(e.text)+"\n\t\t\t")])})):e.id?n("option",{domProps:{value:e.id}},[t._v("\n\t\t\t"+t._s(e.text)+"\n\t\t")]):t._e()]})],2)},staticRenderFns:[]}},5:function(t,e,n){var o=n(0)(n(19),n(29),null,null);t.exports=o.exports},95:function(t,e,n){n(376);var o=n(0)(n(113),n(348),"data-v-27da62f6",null);t.exports=o.exports}},[396])});
//# sourceMappingURL=vue-form-builder.js.map