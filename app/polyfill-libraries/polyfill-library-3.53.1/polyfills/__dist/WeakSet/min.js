!function(e){var t=Symbol("undef"),r=function a(){if(!(this instanceof a))throw new TypeError('Constructor WeakSet requires "new"');var e=OrdinaryCreateFromConstructor(this,a.prototype,{_values:[],_size:0,_es6WeakSet:!0}),t=arguments.length>0?arguments[0]:undefined;if(null===t||t===undefined)return e;var r=Get(e,"add");if(!IsCallable(r))throw new TypeError("WeakSet.prototype.add is not a function");try{for(var o=GetIterator(t);;){var n=IteratorStep(o);if(!1===n)return e;var l=IteratorValue(n);try{Call(r,e,[l])}catch(c){return IteratorClose(o,c)}}}catch(c){if(IsArray(t)||"[object Arguments]"===Object.prototype.toString.call(t)||t.callee){var p,i=t.length;for(p=0;p<i;p++)Call(r,e,[t[p]])}}return e};Object.defineProperty(r,"prototype",{configurable:!1,enumerable:!1,writable:!1,value:{}}),CreateMethodProperty(r.prototype,"add",function n(e){var r=this;if("object"!==Type(r))throw new TypeError("Method WeakSet.prototype.add called on incompatible receiver "+Object.prototype.toString.call(r));if(!0!==r._es6WeakSet)throw new TypeError("Method WeakSet.prototype.add called on incompatible receiver "+Object.prototype.toString.call(r));if("object"!==Type(e))throw new TypeError("Invalid value used in weak set");for(var o=r._values,a=0;a<o.length;a++){var n=o[a];if(n!==t&&SameValueZero(n,e))return r}return r._values.push(e),r}),CreateMethodProperty(r.prototype,"constructor",r),CreateMethodProperty(r.prototype,"delete",function(e){var r=this;if("object"!==Type(r))throw new TypeError("Method WeakSet.prototype.delete called on incompatible receiver "+Object.prototype.toString.call(r));if(!0!==r._es6WeakSet)throw new TypeError("Method WeakSet.prototype.delete called on incompatible receiver "+Object.prototype.toString.call(r));if("object"!==Type(e))return!1;for(var o=r._values,a=0;a<o.length;a++){var n=o[a];if(n!==t&&SameValueZero(n,e))return o[a]=t,!0}return!1}),CreateMethodProperty(r.prototype,"has",function l(e){var r=this;if("object"!==Type(r))throw new TypeError("Method WeakSet.prototype.has called on incompatible receiver "+Object.prototype.toString.call(r));if(!0!==r._es6WeakSet)throw new TypeError("Method WeakSet.prototype.has called on incompatible receiver "+Object.prototype.toString.call(r));var o=r._values;if("object"!==Type(e))return!1;for(var a=0;a<o.length;a++){var n=o[a];if(n!==t&&SameValueZero(n,e))return!0}return!1}),"name"in r||Object.defineProperty(r,"name",{configurable:!0,enumerable:!1,writable:!1,value:"WeakSet"});try{CreateMethodProperty(e,"WeakSet",r)}catch(o){e.WeakSet=r}}(self);