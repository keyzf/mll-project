/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// shim phantomjs for testing
	Function.prototype.bind = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var implementation = __webpack_require__(3);

	module.exports = Function.prototype.bind || implementation;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(5);

	var _vue2 = _interopRequireDefault(_vue);

	var _store = __webpack_require__(7);

	var _store2 = _interopRequireDefault(_store);

	var _App = __webpack_require__(14);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _vue2.default({
	  store: _store2.default, // inject store to all children
	  el: 'body',
	  components: { App: _App2.default }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.26
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
	var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

	// detecting iOS UIWebView by indexedDB
	var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;

	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIos: isIos,
		iosVersionMatch: iosVersionMatch,
		iosVersion: iosVersion,
		hasMutationObserverBug: hasMutationObserverBug,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

	function noop() {}

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);

	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var _this = this;

	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	    if (!inDoc(el)) {
	      nextTick(this.forceUpdate);
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop$1() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    var length = args.length;
	    if (length > 1) {
	      var index = value % 10 - 1;
	      return index in args ? args[index] : args[length - 1];
	    } else {
	      return args[0] + (value === 1 ? '' : 's');
	    }
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.26';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _vue = __webpack_require__(5);

	var _vue2 = _interopRequireDefault(_vue);

	var _src = __webpack_require__(8);

	var _src2 = _interopRequireDefault(_src);

	var _middlewares = __webpack_require__(12);

	var _middlewares2 = _interopRequireDefault(_middlewares);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_src2.default);

	var state = {
	   modalShow: false,
	   modalTitle: '',
	   editShow: false,
	   storeShow: false,
	   deletShow: false,
	   openOrShow: '',
	   itemInfo: {
	      id: '',
	      state: ''
	   },
	   modalType: [{ type: '0', text: '修改配置' }, { type: '1', text: '提示' }, { type: '2', text: '编辑规则' }, { type: '3', text: '新增规则' }, { type: '4', text: '指定门店' }]
	};

	var mutations = {
	   MODAL_SHOW: function MODAL_SHOW(state, type) {
	      state.modalShow = !state.modalShow;
	      if (type === undefined) {
	         state.modalTitle == '';
	      } else {
	         state.modalTitle = state.modalType[type].text;
	      }
	   },
	   ADD_RULES: function ADD_RULES(state, uid) {
	      console.log(uid);
	      if (uid === undefined) {
	         state.modalTitle = state.modalType[3].text;
	         state.editShow = !state.editShow;
	      } else {
	         state.modalTitle = state.modalType[2].text;
	         state.editShow = !state.editShow;
	      }
	   },
	   STORE_MODAL: function STORE_MODAL(state) {
	      state.storeShow = !state.storeShow;
	      state.modalTitle = state.modalType[4].text;
	   },
	   DELETE_ITEM: function DELETE_ITEM(state, uid, t) {
	      if (t === 0) {
	         state.openOrShow = '停用';
	      }
	      if (t === 1) {
	         state.openOrShow = '启用';
	      }
	      state.itemInfo.id = uid;
	      state.itemInfo.state = t;
	      console.log(state.itemInfo);
	      state.modalTitle = state.modalType[1].text;
	      state.deletShow = !state.deletShow;
	   }
	};

	exports.default = new _src2.default.Store({
	   state: state,
	   mutations: mutations,
	   middlewares: _middlewares2.default
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(9);

	var _devtool = __webpack_require__(10);

	var _devtool2 = _interopRequireDefault(_devtool);

	var _override = __webpack_require__(11);

	var _override2 = _interopRequireDefault(_override);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vue = void 0;
	var uid = 0;

	var Store = function () {

	  /**
	   * @param {Object} options
	   *        - {Object} state
	   *        - {Object} actions
	   *        - {Object} mutations
	   *        - {Array} middlewares
	   *        - {Boolean} strict
	   */

	  function Store() {
	    var _this = this;

	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$state = _ref.state;
	    var state = _ref$state === undefined ? {} : _ref$state;
	    var _ref$mutations = _ref.mutations;
	    var mutations = _ref$mutations === undefined ? {} : _ref$mutations;
	    var _ref$modules = _ref.modules;
	    var modules = _ref$modules === undefined ? {} : _ref$modules;
	    var _ref$middlewares = _ref.middlewares;
	    var middlewares = _ref$middlewares === undefined ? [] : _ref$middlewares;
	    var _ref$strict = _ref.strict;
	    var strict = _ref$strict === undefined ? false : _ref$strict;

	    _classCallCheck(this, Store);

	    this._getterCacheId = 'vuex_store_' + uid++;
	    this._dispatching = false;
	    this._rootMutations = this._mutations = mutations;
	    this._modules = modules;
	    // bind dispatch to self
	    var dispatch = this.dispatch;
	    this.dispatch = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      dispatch.apply(_this, args);
	    };
	    // use a Vue instance to store the state tree
	    // suppress warnings just in case the user has added
	    // some funky global mixins
	    if (!Vue) {
	      throw new Error('[vuex] must call Vue.use(Vuex) before creating a store instance.');
	    }
	    var silent = Vue.config.silent;
	    Vue.config.silent = true;
	    this._vm = new Vue({
	      data: state
	    });
	    Vue.config.silent = silent;
	    this._setupModuleState(state, modules);
	    this._setupModuleMutations(modules);
	    this._setupMiddlewares(middlewares, state);
	    // add extra warnings in strict mode
	    if (strict) {
	      this._setupMutationCheck();
	    }
	  }

	  /**
	   * Getter for the entire state tree.
	   * Read only.
	   *
	   * @return {Object}
	   */

	  _createClass(Store, [{
	    key: 'dispatch',


	    /**
	     * Dispatch an action.
	     *
	     * @param {String} type
	     */

	    value: function dispatch(type) {
	      for (var _len2 = arguments.length, payload = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        payload[_key2 - 1] = arguments[_key2];
	      }

	      var silent = false;
	      // compatibility for object actions, e.g. FSA
	      if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.type && arguments.length === 1) {
	        payload = [type.payload];
	        if (type.silent) silent = true;
	        type = type.type;
	      }
	      var mutation = this._mutations[type];
	      var state = this.state;
	      if (mutation) {
	        this._dispatching = true;
	        // apply the mutation
	        if (Array.isArray(mutation)) {
	          mutation.forEach(function (m) {
	            return m.apply(undefined, [state].concat(_toConsumableArray(payload)));
	          });
	        } else {
	          mutation.apply(undefined, [state].concat(_toConsumableArray(payload)));
	        }
	        this._dispatching = false;
	        if (!silent) this._applyMiddlewares(type, payload);
	      } else {
	        console.warn('[vuex] Unknown mutation: ' + type);
	      }
	    }

	    /**
	     * Watch state changes on the store.
	     * Same API as Vue's $watch, except when watching a function,
	     * the function gets the state as the first argument.
	     *
	     * @param {String|Function} expOrFn
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	  }, {
	    key: 'watch',
	    value: function watch(expOrFn, cb, options) {
	      var _this2 = this;

	      return this._vm.$watch(function () {
	        return typeof expOrFn === 'function' ? expOrFn(_this2.state) : _this2._vm.$get(expOrFn);
	      }, cb, options);
	    }

	    /**
	     * Hot update mutations & modules.
	     *
	     * @param {Object} options
	     *        - {Object} [mutations]
	     *        - {Object} [modules]
	     */

	  }, {
	    key: 'hotUpdate',
	    value: function hotUpdate() {
	      var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var mutations = _ref2.mutations;
	      var modules = _ref2.modules;

	      this._rootMutations = this._mutations = mutations || this._rootMutations;
	      this._setupModuleMutations(modules || this._modules);
	    }

	    /**
	     * Attach sub state tree of each module to the root tree.
	     *
	     * @param {Object} state
	     * @param {Object} modules
	     */

	  }, {
	    key: '_setupModuleState',
	    value: function _setupModuleState(state, modules) {
	      Object.keys(modules).forEach(function (key) {
	        Vue.set(state, key, modules[key].state || {});
	      });
	    }

	    /**
	     * Bind mutations for each module to its sub tree and
	     * merge them all into one final mutations map.
	     *
	     * @param {Object} updatedModules
	     */

	  }, {
	    key: '_setupModuleMutations',
	    value: function _setupModuleMutations(updatedModules) {
	      var modules = this._modules;
	      var allMutations = [this._rootMutations];
	      Object.keys(updatedModules).forEach(function (key) {
	        modules[key] = updatedModules[key];
	      });
	      Object.keys(modules).forEach(function (key) {
	        var module = modules[key];
	        if (!module || !module.mutations) return;
	        // bind mutations to sub state tree
	        var mutations = {};
	        Object.keys(module.mutations).forEach(function (name) {
	          var original = module.mutations[name];
	          mutations[name] = function (state) {
	            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	              args[_key3 - 1] = arguments[_key3];
	            }

	            original.apply(undefined, [state[key]].concat(args));
	          };
	        });
	        allMutations.push(mutations);
	      });
	      this._mutations = (0, _util.mergeObjects)(allMutations);
	    }

	    /**
	     * Setup mutation check: if the vuex instance's state is mutated
	     * outside of a mutation handler, we throw en error. This effectively
	     * enforces all mutations to the state to be trackable and hot-reloadble.
	     * However, this comes at a run time cost since we are doing a deep
	     * watch on the entire state tree, so it is only enalbed with the
	     * strict option is set to true.
	     */

	  }, {
	    key: '_setupMutationCheck',
	    value: function _setupMutationCheck() {
	      var _this3 = this;

	      var Watcher = (0, _util.getWatcher)(this._vm);
	      /* eslint-disable no-new */
	      new Watcher(this._vm, '$data', function () {
	        if (!_this3._dispatching) {
	          throw new Error('[vuex] Do not mutate vuex store state outside mutation handlers.');
	        }
	      }, { deep: true, sync: true });
	      /* eslint-enable no-new */
	    }

	    /**
	     * Setup the middlewares. The devtools middleware is always
	     * included, since it does nothing if no devtool is detected.
	     *
	     * A middleware can demand the state it receives to be
	     * "snapshots", i.e. deep clones of the actual state tree.
	     *
	     * @param {Array} middlewares
	     * @param {Object} state
	     */

	  }, {
	    key: '_setupMiddlewares',
	    value: function _setupMiddlewares(middlewares, state) {
	      var _this4 = this;

	      this._middlewares = [_devtool2.default].concat(middlewares);
	      this._needSnapshots = middlewares.some(function (m) {
	        return m.snapshot;
	      });
	      if (this._needSnapshots) {
	        console.log('[vuex] One or more of your middlewares are taking state snapshots ' + 'for each mutation. Make sure to use them only during development.');
	      }
	      var initialSnapshot = this._prevSnapshot = this._needSnapshots ? (0, _util.deepClone)(state) : null;
	      // call init hooks
	      this._middlewares.forEach(function (m) {
	        if (m.onInit) {
	          m.onInit(m.snapshot ? initialSnapshot : state, _this4);
	        }
	      });
	    }

	    /**
	     * Apply the middlewares on a given mutation.
	     *
	     * @param {String} type
	     * @param {Array} payload
	     */

	  }, {
	    key: '_applyMiddlewares',
	    value: function _applyMiddlewares(type, payload) {
	      var _this5 = this;

	      var state = this.state;
	      var prevSnapshot = this._prevSnapshot;
	      var snapshot = void 0,
	          clonedPayload = void 0;
	      if (this._needSnapshots) {
	        snapshot = this._prevSnapshot = (0, _util.deepClone)(state);
	        clonedPayload = (0, _util.deepClone)(payload);
	      }
	      this._middlewares.forEach(function (m) {
	        if (m.onMutation) {
	          if (m.snapshot) {
	            m.onMutation({ type: type, payload: clonedPayload }, snapshot, prevSnapshot, _this5);
	          } else {
	            m.onMutation({ type: type, payload: payload }, state, _this5);
	          }
	        }
	      });
	    }
	  }, {
	    key: 'state',
	    get: function get() {
	      return this._vm._data;
	    },
	    set: function set(v) {
	      throw new Error('[vuex] Vuex root state is read only.');
	    }
	  }]);

	  return Store;
	}();

	function install(_Vue) {
	  if (Vue) {
	    console.warn('[vuex] already installed. Vue.use(Vuex) should be called only once.');
	    return;
	  }
	  Vue = _Vue;
	  (0, _override2.default)(Vue);
	}

	// auto install in dist mode
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue);
	}

	function createLogger() {
	  console.warn('[vuex] Vuex.createLogger has been deprecated.' + 'Use `import createLogger from \'vuex/logger\' instead.');
	}

	exports.default = {
	  Store: Store,
	  install: install,
	  createLogger: createLogger
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.mergeObjects = mergeObjects;
	exports.deepClone = deepClone;
	exports.getWatcher = getWatcher;
	exports.getDep = getDep;
	/**
	 * Merge an array of objects into one.
	 *
	 * @param {Array<Object>} arr
	 * @return {Object}
	 */

	function mergeObjects(arr) {
	  return arr.reduce(function (prev, obj) {
	    Object.keys(obj).forEach(function (key) {
	      var existing = prev[key];
	      if (existing) {
	        // allow multiple mutation objects to contain duplicate
	        // handlers for the same mutation type
	        if (Array.isArray(existing)) {
	          existing.push(obj[key]);
	        } else {
	          prev[key] = [prev[key], obj[key]];
	        }
	      } else {
	        prev[key] = obj[key];
	      }
	    });
	    return prev;
	  }, {});
	}

	/**
	 * Deep clone an object. Faster than JSON.parse(JSON.stringify()).
	 *
	 * @param {*} obj
	 * @return {*}
	 */

	function deepClone(obj) {
	  if (Array.isArray(obj)) {
	    return obj.map(deepClone);
	  } else if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    var cloned = {};
	    var keys = Object.keys(obj);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      cloned[key] = deepClone(obj[key]);
	    }
	    return cloned;
	  } else {
	    return obj;
	  }
	}

	/**
	 * Hacks to get access to Vue internals.
	 * Maybe we should expose these...
	 */

	var Watcher = void 0;
	function getWatcher(vm) {
	  if (!Watcher) {
	    var unwatch = vm.$watch('__vuex__', function (a) {
	      return a;
	    });
	    Watcher = vm._watchers[0].constructor;
	    unwatch();
	  }
	  return Watcher;
	}

	var Dep = void 0;
	function getDep(vm) {
	  if (!Dep) {
	    Dep = vm._data.__ob__.dep.constructor;
	  }
	  return Dep;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var hook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	exports.default = {
	  onInit: function onInit(state, store) {
	    if (!hook) return;
	    hook.emit('vuex:init', store);
	    hook.on('vuex:travel-to-state', function (targetState) {
	      var currentState = store._vm._data;
	      store._dispatching = true;
	      Object.keys(targetState).forEach(function (key) {
	        currentState[key] = targetState[key];
	      });
	      store._dispatching = false;
	    });
	  },
	  onMutation: function onMutation(mutation, state) {
	    if (!hook) return;
	    hook.emit('vuex:mutation', mutation, state);
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (Vue) {
	  // override init and inject vuex init procedure
	  var _init = Vue.prototype._init;
	  Vue.prototype._init = function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
	    _init.call(this, options);
	  };

	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */

	  function vuexInit() {
	    var options = this.$options;
	    var store = options.store;
	    var vuex = options.vuex;
	    // store injection

	    if (store) {
	      this.$store = store;
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store;
	    }
	    // vuex option handling
	    if (vuex) {
	      if (!this.$store) {
	        console.warn('[vuex] store not injected. make sure to ' + 'provide the store option in your root component.');
	      }
	      var state = vuex.state;
	      var getters = vuex.getters;
	      var actions = vuex.actions;
	      // handle deprecated state option

	      if (state && !getters) {
	        console.warn('[vuex] vuex.state option will been deprecated in 1.0. ' + 'Use vuex.getters instead.');
	        getters = state;
	      }
	      // getters
	      if (getters) {
	        options.computed = options.computed || {};
	        for (var key in getters) {
	          defineVuexGetter(this, key, getters[key]);
	        }
	      }
	      // actions
	      if (actions) {
	        options.methods = options.methods || {};
	        for (var _key in actions) {
	          options.methods[_key] = makeBoundAction(this.$store, actions[_key], _key);
	        }
	      }
	    }
	  }

	  /**
	   * Setter for all getter properties.
	   */

	  function setter() {
	    throw new Error('vuex getter properties are read-only.');
	  }

	  /**
	   * Define a Vuex getter on an instance.
	   *
	   * @param {Vue} vm
	   * @param {String} key
	   * @param {Function} getter
	   */

	  function defineVuexGetter(vm, key, getter) {
	    if (typeof getter !== 'function') {
	      console.warn('[vuex] Getter bound to key \'vuex.getters.' + key + '\' is not a function.');
	    } else {
	      Object.defineProperty(vm, key, {
	        enumerable: true,
	        configurable: true,
	        get: makeComputedGetter(vm.$store, getter),
	        set: setter
	      });
	    }
	  }

	  /**
	   * Make a computed getter, using the same caching mechanism of computed
	   * properties. In addition, it is cached on the raw getter function using
	   * the store's unique cache id. This makes the same getter shared
	   * across all components use the same underlying watcher, and makes
	   * the getter evaluated only once during every flush.
	   *
	   * @param {Store} store
	   * @param {Function} getter
	   */

	  function makeComputedGetter(store, getter) {
	    var id = store._getterCacheId;

	    // cached
	    if (getter[id]) {
	      return getter[id];
	    }
	    var vm = store._vm;
	    var Watcher = (0, _util.getWatcher)(vm);
	    var Dep = (0, _util.getDep)(vm);
	    var watcher = new Watcher(vm, function (state) {
	      return getter(state);
	    }, null, { lazy: true });
	    var computedGetter = function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	    getter[id] = computedGetter;
	    return computedGetter;
	  }

	  /**
	   * Make a bound-to-store version of a raw action function.
	   *
	   * @param {Store} store
	   * @param {Function} action
	   * @param {String} key
	   */

	  function makeBoundAction(store, action, key) {
	    if (typeof action !== 'function') {
	      console.warn('[vuex] Action bound to key \'vuex.actions.' + key + '\' is not a function.');
	    }
	    return function vuexBoundAction() {
	      for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return action.call.apply(action, [this, store].concat(args));
	    };
	  }

	  // option merging
	  var merge = Vue.config.optionMergeStrategies.computed;
	  Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
	    if (!toVal) return fromVal;
	    if (!fromVal) return toVal;
	    return {
	      getters: merge(toVal.getters, fromVal.getters),
	      state: merge(toVal.state, fromVal.state),
	      actions: merge(toVal.actions, fromVal.actions)
	    };
	  };
	};

	var _util = __webpack_require__(9);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(7);

	var _logger = __webpack_require__(13);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var localStorageMiddleware = {
	  onMutation: function onMutation(mutation, _ref) {
	    var todos = _ref.todos;

	    localStorage.setItem(_store.STORAGE_KEY, JSON.stringify(todos));
	  }
	};

	exports.default = process.env.NODE_ENV !== 'production' ? [(0, _logger2.default)(), localStorageMiddleware] : [localStorageMiddleware];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createLogger;
	// Credits: borrowed code from fcomb/redux-logger

	function createLogger() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$collapsed = _ref.collapsed;
	  var collapsed = _ref$collapsed === undefined ? true : _ref$collapsed;
	  var _ref$transformer = _ref.transformer;
	  var transformer = _ref$transformer === undefined ? function (state) {
	    return state;
	  } : _ref$transformer;
	  var _ref$mutationTransfor = _ref.mutationTransformer;
	  var mutationTransformer = _ref$mutationTransfor === undefined ? function (mut) {
	    return mut;
	  } : _ref$mutationTransfor;

	  return {
	    snapshot: true,
	    onMutation: function onMutation(mutation, nextState, prevState) {
	      if (typeof console === 'undefined') {
	        return;
	      }
	      var time = new Date();
	      var formattedTime = ' @ ' + pad(time.getHours(), 2) + ':' + pad(time.getMinutes(), 2) + ':' + pad(time.getSeconds(), 2) + '.' + pad(time.getMilliseconds(), 3);
	      var formattedMutation = mutationTransformer(mutation);
	      var message = 'mutation ' + mutation.type + formattedTime;
	      var startMessage = collapsed ? console.groupCollapsed : console.group;

	      // render
	      try {
	        startMessage.call(console, message);
	      } catch (e) {
	        console.log(message);
	      }

	      console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', prevState);
	      console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
	      console.log('%c next state', 'color: #4CAF50; font-weight: bold', nextState);

	      try {
	        console.groupEnd();
	      } catch (e) {
	        console.log('—— log end ——');
	      }
	    }
	  };
	}

	function repeat(str, times) {
	  return new Array(times + 1).join(str);
	}

	function pad(num, maxLength) {
	  return repeat('0', maxLength - num.toString().length) + num;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(15)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] pro\\red-configuration\\components\\App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(54)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2886c2c8/App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _dataList = __webpack_require__(16);

	var _dataList2 = _interopRequireDefault(_dataList);

	var _tablelist = __webpack_require__(30);

	var _tablelist2 = _interopRequireDefault(_tablelist);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	   components: { datalist: _dataList2.default, tablelist: _tablelist2.default }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(17)
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] pro\\red-configuration\\components\\dataList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(29)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3810669e/dataList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3810669e&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dataList.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3810669e&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dataList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".listContent[_v-3810669e] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 30px;\n  border: 1px solid #eee;\n  height: 100px;\n  box-sizing: border-box;\n  padding: 20px;\n}\n.listContent .left_content[_v-3810669e],\n.listContent .right_content[_v-3810669e] {\n  box-sizing: border-box;\n}\n.listContent .left_content[_v-3810669e] {\n  width: 70%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n}\n.listContent .left_content *[_v-3810669e] {\n  line-height: 1;\n}\n.listContent .left_content p.mon[_v-3810669e] {\n  font-size: 26px;\n  vertical-align: middle;\n}\n.listContent .left_content p.mon span[_v-3810669e] {\n  color: #63a8eb;\n}\n.listContent .left_content .tel[_v-3810669e] {\n  margin-left: 20px;\n  font-size: 18px;\n}\n.listContent .left_content a[_v-3810669e] {\n  color: #63a8eb;\n  margin-left: 20px;\n}\n.listContent .right_content[_v-3810669e] {\n  width: 360px;\n  font-size: 12px;\n  color: #666;\n  padding-left: 10px;\n  position: relative;\n}\n.listContent .right_content[_v-3810669e]:before {\n  content: '*';\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n", ""]);

	// exports


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _modal = __webpack_require__(22);

	var _modal2 = _interopRequireDefault(_modal);

	var _data2 = __webpack_require__(28);

	var _data3 = _interopRequireDefault(_data2);

	var _actions = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: { modal: _modal2.default },
		vuex: {
			getters: {
				show: function show(state) {
					return state.modalShow;
				}
			},
			actions: {
				modalShow: _actions.modalShow
			}
		},
		data: function data() {
			return {
				deposit: _data3.default.deposit
			};
		},

		methods: {
			todo: function todo() {
				var _ = this;
				$.post('show/deposit', function (data) {
					_.deposit = data;
				});
			}
		}
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(23)
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] pro\\red-configuration\\components\\modal.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(27)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-115295b4/modal.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-115295b4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./modal.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-115295b4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./modal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".modal-container[_v-115295b4] {\n  width: 480px;\n  box-sizing: border-box;\n  text-align: left;\n  margin: 0px auto;\n  padding: 0px 30px 30px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n.modal-wrapper[_v-115295b4] {\n  display: table-cell;\n  vertical-align: middle;\n  color: #666;\n  text-align: center;\n}\n.modal-head[_v-115295b4] {\n  position: relative;\n  border-bottom: 1px solid #e8e8e8;\n  margin-bottom: 20px;\n}\n.modal-head .modal-title[_v-115295b4] {\n  /* height: 65px;\n   line-height: 65px; */\n  line-height: 1;\n  padding-bottom: 15px;\n  padding-top: 25px;\n  font-size: 25px;\n  text-align: center;\n  font-weight: normal;\n  color: #333;\n}\n.modal-head .modal-close[_v-115295b4] {\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAylpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTA0OTAxMjY5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTA0OTAxMjU5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjU2OTBmNmJiLTA5MmItMjA0YS1iOTU3LTE4NmFhMDY1MjY3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjkwZjZiYi0wOTJiLTIwNGEtYjk1Ny0xODZhYTA2NTI2NzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UCCNHAAAAbElEQVR42pSRyQ3AMAgEzfbfANUSxVEkZLOI5cWDGS5z91hf2NJic0hgqPDL4ugeCvxPsATJtS6Ogk5S3gpFYSWhhwYZNUvaL6HZ10g+FgTJR4I8dvsdDK9NJZi8qpNgCFMJBLiUQIQvySPAADnqHeikkPSlAAAAAElFTkSuQmCC') no-repeat;\n  position: absolute;\n  top: 25px;\n  right: 0;\n  cursor: pointer;\n}\n.modal-foot[_v-115295b4] {\n  text-align: center;\n  margin-top: 10px;\n}\n.modal-mask[_v-115295b4] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.modal-content[_v-115295b4] {\n  font-size: 14px;\n  padding: 20px;\n  position: relative;\n}\n.modal-content .search-group[_v-115295b4] {\n  position: relative;\n  margin-right: 0;\n}\n.modal-content .search-group label[_v-115295b4] {\n  display: inline-block;\n  width: 56px;\n}\n.modal-content .search-group input[_v-115295b4] {\n  width: 200px;\n}\n.modal-content .search-group span[_v-115295b4] {\n  font-size: 14px;\n  margin-left: 10px;\n  text-align: left;\n}\n.modal-content .search-group .error[_v-115295b4] {\n  font-size: 14px;\n  display: inline-block;\n  position: relative;\n  left: 65px;\n  font-style: normal;\n  color: #f94a05;\n  line-height: 1;\n  margin-top: 5px;\n}\n.modal-content .search-group h5[_v-115295b4] {\n  font-weight: normal;\n  font-size: 14px;\n}\n.modal-content .search-group .must-point[_v-115295b4] {\n  top: 9px;\n  left: -10px;\n}\n.modal-foot button[_v-115295b4] {\n  font-size: 16px;\n  width: 130px;\n  height: 40px;\n  line-height: 40px;\n  border-radius: 3px;\n  cursor: pointer;\n  border: none;\n  outline: none;\n}\n.modal-foot .btn-cancel[_v-115295b4] {\n  color: #666;\n  background: #ddd;\n  margin-right: 20px;\n}\n.modal-foot .btn-save[_v-115295b4] {\n  color: #fff;\n  background: #63a8eb;\n}\n.modal-foot .btn-save[_v-115295b4]:hover {\n  background: #548ce5;\n}\n.modal-enter[_v-115295b4],\n.modal-leave[_v-115295b4] {\n  opacity: 0;\n}\n.modal-enter .modal-container[_v-115295b4],\n.modal-leave .modal-container[_v-115295b4] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n", ""]);

	// exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _modal = __webpack_require__(22);

	var _modal2 = _interopRequireDefault(_modal);

	var _actions = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: { modal: _modal2.default },
		props: ['deposit'],
		vuex: {
			getters: {
				show: function show(state) {
					return state.modalShow;
				},
				title: function title(state) {
					return state.modalTitle;
				}
			},
			actions: {
				modalShow: _actions.modalShow
			}
		},
		data: function data() {
			return {
				newMon: '',
				newTel: '',
				monSh: false,
				telSh: false,
				saveDep: {
					deposit: '',
					phone: ''
				}
			};
		},

		watch: {
			newMon: function newMon(val, oldVal) {
				if (val == '') {
					this.monSh = true;
				}

				if (val != '') {
					this.monSh = false;
				}
			},
			newTel: function newTel(val, oldVal) {
				if (val == '' || !/^1[3|4|5|7|8]\d{9}$/.test(val)) {
					this.telSh = true;
				}
				if (val != '' && /^1[3|4|5|7|8]\d{9}$/.test(val)) {
					this.telSh = false;
				}
			}
		},
		ready: function ready() {
			this.todo();
		},

		methods: {
			todo: function todo() {
				this.newMon = this.deposit.deposit;
				this.newTel = this.deposit.phone;
			},
			changeDepose: function changeDepose() {
				var _ = this;
				if (this.monSh === false && this.telSh === false) {
					_.saveDep.deposit = this.newMon;
					_.saveDep.phone = this.newTel;
					$.post('show/saveDeposit', _.saveDep, function (data) {
						console.log(data);
						if (data.success === true) {
							_.deposit.deposit = _.newMon;
							_.deposit.phone = _.newTel;
							_.modalShow();
						} else {
							alert('修改失败');
						}
					});
				}
			}
		}
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var modalShow = exports.modalShow = makeAction('MODAL_SHOW');
	var editShow = exports.editShow = makeAction('ADD_RULES');
	var storeShow = exports.storeShow = makeAction('STORE_MODAL');
	var deleteItem = exports.deleteItem = makeAction('DELETE_ITEM');

	function makeAction(type) {
	  return function (_ref) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var dispatch = _ref.dispatch;
	    return dispatch.apply(undefined, [type].concat(args));
	  };
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div v-show=\"show\" class=\"modal-mask\" transition=\"modal\" _v-115295b4=\"\">\n\t<div class=\"modal-wrapper\" _v-115295b4=\"\">\n\t\t<div class=\"modal-container\" _v-115295b4=\"\">\n\t\t\t<div class=\"modal-head\" _v-115295b4=\"\">\n\t\t\t\t<div class=\"modal-title\" _v-115295b4=\"\">\n\t\t\t\t\t<slot name=\"header\" _v-115295b4=\"\">{{title}}</slot>\n\t\t\t\t</div>\n\t\t\t\t<span class=\"modal-close\" @click=\"modalShow()\" _v-115295b4=\"\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"modal-content\" _v-115295b4=\"\">\n\t\t\t\t<div class=\"search-group\" _v-115295b4=\"\">\n\t\t\t\t\t<em class=\"must-point\" _v-115295b4=\"\">*</em>\n\t\t\t\t\t<label _v-115295b4=\"\">预存款</label>\n\t\t\t\t\t<input v-model=\"newMon\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" type=\"text\" _v-115295b4=\"\">\n\t\t\t\t\t<span _v-115295b4=\"\">元</span>\n\t\t\t\t\t<i v-show=\"monSh\" class=\"error\" _v-115295b4=\"\">请输入大于0的数字</i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-group\" _v-115295b4=\"\">\n\t\t\t\t\t<em class=\"must-point\" _v-115295b4=\"\">*</em>\n\t\t\t\t\t<label _v-115295b4=\"\">客服电话</label>\n\t\t\t\t\t<input v-model=\"newTel\" type=\"text\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" maxlength=\"11\" _v-115295b4=\"\">\n\t\t\t\t\t<span _v-115295b4=\"\">请填写手机号码</span>\n\t\t\t\t\t<i v-show=\"telSh\" class=\"error\" _v-115295b4=\"\">请输入正确的手机号码</i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-group\" _v-115295b4=\"\">\n\t\t\t\t\t<h5 _v-115295b4=\"\">当预存款消耗至2000以下时，会给客服电话发送预警短信</h5>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-foot\" _v-115295b4=\"\">\n\t\t\t\t<button type=\"button\" class=\"btn-cancel\" @click=\"modalShow()\" _v-115295b4=\"\">取 消</button>\n\t\t\t\t<button type=\"button\" class=\"btn-save\" @click=\"changeDepose()\" _v-115295b4=\"\"> 确 认</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.default = {
	   deposit: { "phone": "13812345678", "deposit": 100 },
	   ruleList: {
	      "count": 10,
	      "page": 0,
	      "data": [{
	         "id": null,
	         "mchId": null,
	         "name": "规则",
	         "storeUuids": null,
	         "rule": null,
	         "activityBeginDate": null,
	         "activityEndDate": null,
	         "state": "使用中",
	         "type": null,
	         "avgMoney": 0,
	         "owerRatio": 0
	      }],
	      "size": 10
	   },
	   zNode: [{ "id": "2202", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "修改测试2" }, { "id": "2203", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "SYSUUID门店一号" }, { "id": "2204", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "UUID二号门店123" }, { "id": "2208", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2204", "storeName": "深圳美乐乐南山店" }, { "id": "2209", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "深圳美乐乐南山店2" }, { "id": "2211", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "深圳美乐乐南山店22" }, { "id": "2212", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "啊啊啊啊啊啊啊啊啊啊阿" }, { "id": "2213", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品" }, { "id": "2214", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品2" }, { "id": "2215", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2212", "storeName": "名创饰品3" }, { "id": "2216", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品4" }, { "id": "2217", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品5" }, { "id": "2218", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品5s" }, { "id": "2219", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品5ss" }, { "id": "2220", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品5sss" }, { "id": "2221", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品5ssss" }, { "id": "2223", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品5KK" }, { "id": "2224", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品5KK23" }, { "id": "2225", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "名创饰品秀" }, { "id": "2227", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2208", "storeName": "测试328" }, { "id": "2228", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "test0331" }, { "id": "2229", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "1234" }, { "id": "2230", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "ddd2" }, { "id": "2231", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "滨州滨城区体验馆2" }, { "id": "2232", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "赤峰体验馆2" }, { "id": "2233", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "青州市体验馆2" }, { "id": "2234", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "滨州滨城区体验馆1" }, { "id": "2235", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "赤峰体验馆1" }, { "id": "2236", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "青州市体验馆1" }, { "id": "2237", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "中德英伦联邦样板间2" }, { "id": "2238", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "美乐乐家居广场2" }, { "id": "2239", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "天悦府样板间2" }, { "id": "2240", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "首创.东公元样板间2" }, { "id": "2241", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "华业北新国际样板间2" }, { "id": "2242", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "光明城市样板间2" }, { "id": "2243", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "高新区Icon尚郡样板间2" }, { "id": "2244", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "西安灞桥区体验馆" }, { "id": "2245", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "石家庄裕华区体验馆" }, { "id": "2246", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "银川金凤区体验馆" }, { "id": "2247", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "成都锦江区体验馆" }, { "id": "2248", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "成都武侯区体验馆" }, { "id": "2249", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南昌红谷滩区体验馆" }, { "id": "2250", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "珠海香洲区体验馆" }, { "id": "2251", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "昆明北市区滨江俊园样板间" }, { "id": "2252", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "昆明大商汇体验馆" }, { "id": "2253", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "长沙长沙县体验馆" }, { "id": "2254", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "郑州金水区体验馆" }, { "id": "2255", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京朝阳区体验馆" }, { "id": "2256", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南充嘉陵区体验馆" }, { "id": "2257", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "大连西岗区体验馆" }, { "id": "2258", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "哈尔滨道外区体验馆" }, { "id": "2259", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "郑州郑东新区体验馆" }, { "id": "2260", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "东莞寮步体验馆" }, { "id": "2261", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "济南天桥区体验馆" }, { "id": "2262", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "兰州城关区体验馆" }, { "id": "2263", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "西安高新区体验馆" }, { "id": "2264", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "中山西区体验馆" }, { "id": "2265", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "太原小店区体验馆" }, { "id": "2266", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "武汉汉阳区体验馆" }, { "id": "2267", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "温州鹿城区体验馆" }, { "id": "2268", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "长春市二道区体验馆" }, { "id": "2269", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "广州海珠区琶洲体验馆" }, { "id": "2270", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "深圳龙华新区体验馆" }, { "id": "2271", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南宁江南区体验馆" }, { "id": "2272", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "合肥瑶海区体验馆" }, { "id": "2273", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "太原万柏林区体验馆" }, { "id": "2274", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "重庆沙坪坝区体验馆" }, { "id": "2275", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "长沙岳麓区体验馆" }, { "id": "2276", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "重庆南岸区体验馆" }, { "id": "2277", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "厦门思明区体验馆" }, { "id": "2278", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "乌鲁木齐市高新区体验馆" }, { "id": "2279", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "佛山禅城区体验馆" }, { "id": "2280", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "绵阳涪城区体验馆" }, { "id": "2281", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宝鸡渭滨区体验馆" }, { "id": "2282", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "安康体验馆" }, { "id": "2283", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "嘉峪关体验馆" }, { "id": "2284", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "张掖体验馆" }, { "id": "2285", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "安庆迎江区体验馆" }, { "id": "2286", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "亳州谯城区体验馆" }, { "id": "2287", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "滁州市体验馆" }, { "id": "2288", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "淮北市体验馆" }, { "id": "2289", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "蒙城县体验馆" }, { "id": "2290", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "太湖体验馆" }, { "id": "2291", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宿州体验馆" }, { "id": "2292", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "恩施体验馆" }, { "id": "2293", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "黄石下陆区体验馆" }, { "id": "2294", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "仙桃体验馆" }, { "id": "2295", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "枣阳体验馆" }, { "id": "2296", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "龙岩体验馆" }, { "id": "2297", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "台州市椒江区体验馆" }, { "id": "2298", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "遂宁市船山区体验馆" }, { "id": "2299", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "杭州下城区体验馆" }, { "id": "2300", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "丽水莲都区体验馆" }, { "id": "2301", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宜春体验馆" }, { "id": "2302", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "鹤壁淇滨区体验馆" }, { "id": "2303", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "赣州章贡区体验馆" }, { "id": "2304", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "淮南田家庵区体验馆" }, { "id": "2305", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "资阳雁江区体验馆" }, { "id": "2306", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "安阳北关区体验馆" }, { "id": "2307", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "广州增城万达广场体验馆" }, { "id": "2308", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "衢州柯城区体验馆" }, { "id": "2309", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "桐庐体验馆" }, { "id": "2310", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "西宁海湖新区体验馆" }, { "id": "2311", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "咸阳渭城区体验馆" }, { "id": "2312", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "湘潭岳塘区体验馆" }, { "id": "2313", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "岳阳岳阳楼区体验馆" }, { "id": "2314", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "西安雁塔区体验馆" }, { "id": "2315", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "湛江霞山区体验馆" }, { "id": "2316", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "诸暨体验馆" }, { "id": "2317", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "桂林体验馆" }, { "id": "2318", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "达州通川区体验馆" }, { "id": "2319", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "衡阳蒸湘区体验馆" }, { "id": "2320", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "昭通体验馆" }, { "id": "2321", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "六安市体验馆" }, { "id": "2322", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "江门蓬江区体验馆" }, { "id": "2323", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "钦州体验馆" }, { "id": "2324", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "重庆巴南区体验馆" }, { "id": "2325", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "福清体验馆" }, { "id": "2326", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "随州曾都区体验馆" }, { "id": "2327", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "福州仓山区体验馆" }, { "id": "2328", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "广州白云区体验馆" }, { "id": "2329", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "株洲天元区体验馆" }, { "id": "2330", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "阜阳颍州区体验馆" }, { "id": "2331", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "永州体验馆" }, { "id": "2332", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "杭州萧山区体验馆" }, { "id": "2333", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "库尔勒体验馆" }, { "id": "2334", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宜宾翠屏区体验馆" }, { "id": "2335", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "德阳旌阳区体验馆" }, { "id": "2336", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "商丘睢阳区体验馆" }, { "id": "2337", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "荆门掇刀区体验馆" }, { "id": "2338", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "荆州沙市区体验馆" }, { "id": "2339", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "襄阳襄州区体验馆" }, { "id": "2340", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "桐乡体验馆" }, { "id": "2341", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "义乌体验馆" }, { "id": "2342", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "许昌魏都区体验馆" }, { "id": "2343", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "吉安体验馆" }, { "id": "2344", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宁波海曙区体验馆" }, { "id": "2345", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "湖州吴兴区体验馆" }, { "id": "2346", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "运城空港开发区体验馆" }, { "id": "2347", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "益阳赫山区体验馆" }, { "id": "2348", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "渭南临渭区体验馆" }, { "id": "2349", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "铜陵体验馆" }, { "id": "2350", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "弥勒市体验馆" }, { "id": "2351", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "金华婺城区体验馆" }, { "id": "2352", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "儋州体验馆" }, { "id": "2353", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "三亚市体验馆" }, { "id": "2354", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "琼海体验馆" }, { "id": "2355", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "遵义遵南大道体验馆" }, { "id": "2356", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "漳州芗城区体验馆" }, { "id": "2357", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上饶市体验馆" }, { "id": "2358", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "内江体验馆" }, { "id": "2359", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "郴州苏仙区体验馆" }, { "id": "2360", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "重庆永川区体验馆" }, { "id": "2361", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "安顺市体验馆" }, { "id": "2362", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "莆田城厢区体验馆" }, { "id": "2363", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "怀化体验馆" }, { "id": "2364", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "曲靖体验馆" }, { "id": "2365", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "萍乡市体验馆" }, { "id": "2366", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "柳州鱼峰区体验馆" }, { "id": "2367", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "武汉盘龙城经济开发区体验馆" }, { "id": "2368", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "十堰体验馆" }, { "id": "2369", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "庆阳市体验馆" }, { "id": "2370", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "九江开发区体验馆" }, { "id": "2371", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "蚌埠蚌山区体验馆" }, { "id": "2372", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "汕头龙湖区体验馆" }, { "id": "2373", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "广元市体验馆" }, { "id": "2374", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "玉林体验馆" }, { "id": "2375", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "乐山市中区体验馆" }, { "id": "2376", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "厦门集美区体验馆" }, { "id": "2377", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "汉中体验馆" }, { "id": "2378", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "泸州龙马潭区体验馆" }, { "id": "2379", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "惠州惠城区体验馆" }, { "id": "2380", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "克拉玛依区体验馆" }, { "id": "2381", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "伊宁体验馆" }, { "id": "2382", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "泉州丰泽区体验馆" }, { "id": "2383", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "重庆大渡口区体验馆" }, { "id": "2384", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南昌昌南新城体验馆" }, { "id": "2385", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "鄂州鄂城区体验馆" }, { "id": "2386", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "眉山东坡区体验馆" }, { "id": "2387", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "娄底娄星区体验馆" }, { "id": "2388", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "清远清城区体验馆" }, { "id": "2389", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "孝感长征路体验馆" }, { "id": "2390", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "辽阳白塔区体验馆" }, { "id": "2391", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "庄河市体验馆" }, { "id": "2392", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "瓦房店体验馆" }, { "id": "2393", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "泰安体验馆" }, { "id": "2394", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "莱州市体验馆" }, { "id": "2395", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "莱西市体验馆" }, { "id": "2396", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "诸城体验馆" }, { "id": "2397", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "衡水体验馆" }, { "id": "2398", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "任丘市体验馆" }, { "id": "2399", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "雄县体验馆" }, { "id": "2400", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "易县体验馆" }, { "id": "2401", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "定州体验馆" }, { "id": "2402", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "巴彦淖尔加盟店" }, { "id": "2403", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "孝义体验馆" }, { "id": "2404", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "乌兰察布市体验馆" }, { "id": "2405", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "沭阳体验馆" }, { "id": "2406", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "泗洪体验馆" }, { "id": "2407", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "句容体验馆" }, { "id": "2408", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "兴化体验馆" }, { "id": "2409", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "莱芜体验馆" }, { "id": "2410", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "阜宁体验馆" }, { "id": "2411", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "鞍山立山区体验馆" }, { "id": "2412", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "连云港新浦区体验馆" }, { "id": "2413", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "太仓体验馆" }, { "id": "2414", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "松原体验馆" }, { "id": "2415", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "海城北关体验馆" }, { "id": "2416", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "天津塘沽区体验馆" }, { "id": "2417", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "唐山路北区体验馆" }, { "id": "2418", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "张家港杨舍镇体验馆" }, { "id": "2419", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京十里河体验馆" }, { "id": "2420", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "晋中榆次区体验馆" }, { "id": "2421", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "延吉体验馆" }, { "id": "2422", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "营口鲅鱼圈体验馆" }, { "id": "2423", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "枣庄高新区体验馆" }, { "id": "2424", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "本溪体验馆" }, { "id": "2425", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "淮安清河区体验馆" }, { "id": "2426", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京昌平区体验馆" }, { "id": "2427", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南通启东体验馆" }, { "id": "2428", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "菏泽体验馆" }, { "id": "2429", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "沈阳于洪区体验馆" }, { "id": "2430", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "淄博高新区体验馆" }, { "id": "2431", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "牡丹江东安区体验馆" }, { "id": "2432", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "沈阳浑南新区体验馆" }, { "id": "2433", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "吕梁离石区体验馆" }, { "id": "2434", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "邯郸复兴区体验馆" }, { "id": "2435", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海嘉定区体验馆" }, { "id": "2436", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "吉林昌邑区体验馆" }, { "id": "2437", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "包头青山区体验馆" }, { "id": "2438", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "胶州加盟店" }, { "id": "2439", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "昆山体验馆" }, { "id": "2440", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海浦东新区周浦体验馆" }, { "id": "2441", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "济南历下区体验馆" }, { "id": "2442", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "沈阳铁西区体验馆" }, { "id": "2443", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "丹东体验馆" }, { "id": "2444", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "铁岭银州区样板间" }, { "id": "2445", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "金坛金城镇体验馆" }, { "id": "2446", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京大兴区体验馆" }, { "id": "2447", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海青浦区体验馆" }, { "id": "2448", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "天津滨海新区样板间" }, { "id": "2449", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "天津东丽区样板间" }, { "id": "2450", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "长春绿园区体验馆" }, { "id": "2451", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "葫芦岛体验馆" }, { "id": "2452", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "临沂北城新区体验馆" }, { "id": "2453", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "邢台桥东区体验馆" }, { "id": "2454", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "青岛市北区体验馆" }, { "id": "2455", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "通辽科尔沁区体验馆" }, { "id": "2456", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "靖江体验馆" }, { "id": "2457", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "盘锦兴隆台区体验馆" }, { "id": "2458", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "长治城区体验馆" }, { "id": "2459", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海金山区体验馆" }, { "id": "2460", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "常熟体验馆" }, { "id": "2461", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海普陀区体验馆" }, { "id": "2462", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "临汾体验馆" }, { "id": "2463", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "天津西青区体验馆" }, { "id": "2464", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海宝山区体验馆" }, { "id": "2465", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "四平体验馆" }, { "id": "2466", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "佳木斯郊区体验馆" }, { "id": "2467", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南通崇川区体验馆" }, { "id": "2468", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京顺义区体验馆" }, { "id": "2469", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "公主岭市体验馆" }, { "id": "2470", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "大连金州开发区体验馆" }, { "id": "2471", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "如皋益寿路体验馆" }, { "id": "2472", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "常州武进区体验馆" }, { "id": "2473", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "呼伦贝尔体验馆" }, { "id": "2474", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "聊城加盟店" }, { "id": "2475", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "大庆让胡路区体验馆" }, { "id": "2476", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "廊坊市广阳区体验馆" }, { "id": "2477", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海奉贤区体验馆" }, { "id": "2478", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "大同城区体验馆" }, { "id": "2479", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "德州德城区体验馆" }, { "id": "2480", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "泰州海陵区体验馆" }, { "id": "2481", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京通州区体验馆" }, { "id": "2482", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "无锡滨湖区体验馆" }, { "id": "2483", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "盐城盐都区体验馆" }, { "id": "2484", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "石家庄新华区体验馆" }, { "id": "2485", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "东营东营区体验馆" }, { "id": "2486", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "齐齐哈尔体验馆" }, { "id": "2487", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "天津红桥区体验馆" }, { "id": "2488", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "哈尔滨江北区体验馆" }, { "id": "2489", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "朔州市体验馆" }, { "id": "2490", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "天津武清区体验馆" }, { "id": "2491", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "扬州广陵区体验馆" }, { "id": "2492", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "呼和浩特赛罕区体验馆" }, { "id": "2493", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "张家口高新区体验馆" }, { "id": "2494", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "济宁市中区体验馆" }, { "id": "2495", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京苹果园体验馆" }, { "id": "2496", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "抚顺顺城区体验馆" }, { "id": "2497", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "锦州太和区体验馆" }, { "id": "2498", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京亦庄经济开发区体验馆" }, { "id": "2499", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海闸北区体验馆" }, { "id": "2500", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "潍坊高新区体验馆" }, { "id": "2501", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "双城体验馆" }, { "id": "2502", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京天通苑体验馆" }, { "id": "2503", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "承德双桥区体验馆" }, { "id": "2504", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "泰兴嘉福国际城体验馆" }, { "id": "2505", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "沧州运河区体验馆" }, { "id": "2506", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "长春高新区体验馆" }, { "id": "2507", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "徐州新城区体验馆" }, { "id": "2508", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京房山区样板间" }, { "id": "2509", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "保定莲池区体验馆" }, { "id": "2510", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "日照东港区体验馆" }, { "id": "2511", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "洛阳洛龙区体验馆" }, { "id": "2512", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南京建邺区体验馆" }, { "id": "2513", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "武汉江岸区体验馆" }, { "id": "2514", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "秦皇岛海港区体验馆" }, { "id": "2515", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "海口琼山区体验馆" }, { "id": "2516", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "余姚体验馆" }, { "id": "2517", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海闵行区体验馆" }, { "id": "2518", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "常德武陵区体验馆" }, { "id": "2519", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "镇江京口区体验馆" }, { "id": "2520", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京海淀区体验馆" }, { "id": "2521", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "嘉兴南湖区体验馆" }, { "id": "2522", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "扬州邗江区体验馆" }, { "id": "2523", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "临安体验馆" }, { "id": "2524", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "北京丰台区体验馆" }, { "id": "2525", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上虞体验馆" }, { "id": "2526", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "西安长安区体验馆" }, { "id": "2527", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海浦东新区体验馆" }, { "id": "2528", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宜兴体验馆" }, { "id": "2529", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "海口秀英区体验馆" }, { "id": "2530", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "长沙雨花区体验馆" }, { "id": "2531", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "合肥蜀山区体验馆" }, { "id": "2532", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "海尔美乐乐家居广场" }, { "id": "2533", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "上海松江区体验馆" }, { "id": "2534", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "富阳体验馆" }, { "id": "2535", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "贵阳金阳区体验馆" }, { "id": "2536", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "西安未央区体验馆" }, { "id": "2537", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "江阴体验馆" }, { "id": "2538", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "沈阳大东区体验馆" }, { "id": "2539", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "芜湖镜湖区体验馆" }, { "id": "2540", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "威海经济开发区体验馆" }, { "id": "2541", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "武汉市武昌区体验馆" }, { "id": "2542", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宿迁宿城区体验馆" }, { "id": "2543", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "平顶山新城区体验馆" }, { "id": "2544", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "杭州市西湖区体验馆" }, { "id": "2545", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "无锡锡山区体验馆" }, { "id": "2546", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "贵阳南明区样板间" }, { "id": "2547", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "慈溪体验馆" }, { "id": "2548", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "合肥滨湖新区体验馆" }, { "id": "2549", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "绍兴体验馆" }, { "id": "2550", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "苏州相城区体验馆" }, { "id": "2551", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "常州新北区体验馆" }, { "id": "2552", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "烟台芝罘区体验馆" }, { "id": "2553", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "美乐乐家具渝北店" }, { "id": "2554", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南京江宁区体验馆" }, { "id": "2555", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "杭州滨江区体验馆" }, { "id": "2556", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "哈尔滨道里区体验馆" }, { "id": "2557", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宁波鄞州区体验馆" }, { "id": "2558", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2229", "storeName": "广州番禺区体验馆" }, { "id": "2559", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "深圳宝安区体验馆" }, { "id": "2560", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "宜昌西陵区体验馆" }, { "id": "2561", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "邵阳大祥区体验馆" }, { "id": "2562", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "南京浦口区体验馆" }, { "id": "2563", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "重庆长寿区体验馆" }, { "id": "2602", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2203", "storeName": "123" }, { "id": "2621", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "qqqwww" }, { "id": "2622", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "dddqqq" }, { "id": "2623", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "12d23" }, { "id": "2624", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "test0524" }, { "id": "2625", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "ewqwe" }, { "id": "2626", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "bggf" }, { "id": "2627", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "rewwe" }, { "id": "2628", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "wwwaqweq11" }, { "id": "2629", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "wwwaqweq" }, { "id": "2630", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "wqwreqw" }, { "id": "2631", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2204", "storeName": "eqe11" }, { "id": "2632", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "code623" }, { "id": "2633", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "2202", "storeName": "testcode" }, { "id": "2634", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "test628" }, { "id": "2635", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "test0701" }, { "id": "2636", "sysUuid": "d7df5a58-2ba7-447b-996a-c3a2f6c1bc342", "storeId": "0", "storeName": "1231" }]
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"listContent\" _v-3810669e=\"\">\n\t<div class=\"left_content\" _v-3810669e=\"\">\n\t\t<p class=\"mon\" _v-3810669e=\"\">预存款：<span _v-3810669e=\"\">{{deposit.deposit}}</span>元</p>\n\t\t<p class=\"tel\" _v-3810669e=\"\">客服电话：<span _v-3810669e=\"\">{{deposit.phone}}</span></p>\n\t\t<a @click=\"modalShow(0)\" href=\"javascript:;\" _v-3810669e=\"\">修改》</a>\n\t</div>\n\t<div class=\"right_content\" _v-3810669e=\"\">\n\t\t使用晒单红包功能时，请确保微信支付商户平台中的余额充足，并在本页面中填写预存款金额，当预存款金额消耗为0时，系统会停用晒单红包功能\n\t</div>\n</div>\n<modal :deposit.sync=\"deposit\" _v-3810669e=\"\"></modal>\n";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(31)
	__vue_script__ = __webpack_require__(33)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] pro\\red-configuration\\components\\tablelist.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(53)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2d9e6973/tablelist.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2d9e6973&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./tablelist.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2d9e6973&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./tablelist.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".table-form[_v-2d9e6973] {\n  margin-top: 20px;\n}\n.table-form .ml30[_v-2d9e6973] {\n  margin-left: 10px;\n}\n.opr-tips[_v-2d9e6973] {\n  position: relative;\n  vertical-align: 15px;\n  display: inline-block;\n  font-weight: normal;\n}\n.opr-tips .tips-icon[_v-2d9e6973] {\n  position: absolute;\n  top: 1px;\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  border: 1px solid #666666;\n  font-size: 12px;\n  line-height: 15px;\n  text-align: center;\n  cursor: pointer;\n  z-index: 9;\n  background: #fff;\n}\n.tips-icon:hover + .opr-tips-content[_v-2d9e6973] {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.opr-tips .opr-tips-content[_v-2d9e6973] {\n  position: absolute;\n  top: 32px;\n  left: -20px;\n  padding: 5px 10px;\n  width: 200px;\n  border: 1px solid #ddd;\n  background: #fff;\n  box-sizing: border-box;\n  -webkit-transform-origin: 12% 0 ;\n          transform-origin: 12% 0 ;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n  text-align: justify;\n}\n.opr-tips .opr-tips-content[_v-2d9e6973]:before {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 15px  10px;\n  border-style: solid;\n  border-color: transparent transparent #ddd transparent;\n  position: absolute;\n  left: 15px;\n  top: -30px;\n}\n.opr-tips .opr-tips-content[_v-2d9e6973]:after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 15px  10px;\n  border-style: solid;\n  border-color: transparent transparent #fff transparent;\n  position: absolute;\n  left: 15px;\n  top: -28px;\n}\n", ""]);

	// exports


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _item = __webpack_require__(34);

	var _item2 = _interopRequireDefault(_item);

	var _delete = __webpack_require__(48);

	var _delete2 = _interopRequireDefault(_delete);

	var _data2 = __webpack_require__(28);

	var _data3 = _interopRequireDefault(_data2);

	var _actions = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: { item: _item2.default, delitem: _delete2.default },
		vuex: {
			getters: {
				show: function show(state) {
					return state.modalShow;
				},
				itemShow: function itemShow(state) {
					return state.editShow;
				}
			},
			actions: {
				modalShow: _actions.modalShow,
				editShow: _actions.editShow,
				deleteItem: _actions.deleteItem
			}
		},
		data: function data() {
			return {
				tableInfo: _data3.default.ruleList,
				itemInfo: {
					ruleName: '',
					state: '',
					storeUuids: [],
					rule: {
						payMoney: '',
						ratio: ''
					},
					activityBeginDate: '',
					activityEndDate: '',
					type: '',
					avgMoney: '',
					owerRatio: ''
				},

				ruleList: {
					ruleName: '',
					state: ''
				}
			};
		},
		ready: function ready() {
			this.todo();
		},

		methods: {
			todo: function todo(rule) {
				var _ = this;
				$.post('show/ruleList', rule, function (data) {
					_.tableInfo = data;
				});
			},
			searchItem: function searchItem() {
				var _ = this;
				_.todo(_.ruleList);
			},
			addItem: function addItem() {
				this.itemInfo = {
					ruleName: '',
					state: '',
					storeUuids: '',
					rule: [{
						payMoney: '',
						ratio: ''
					}],
					activityBeginDate: '',
					activityEndDate: '',
					type: '',
					avgMoney: '',
					owerRatio: ''
				};
				this.editShow();
			},
			editItem: function editItem(uid) {
				var _ = this;
				$.post('show/ruleDetail', { id: uid }, function (data) {
					console.log(data);
					data.activityBeginDate = _.changeDate(data.activityBeginDate);
					data.activityEndDate = _.changeDate(data.activityEndDate);
					_.itemInfo = data;
					_.editShow();
				});
			},
			changeDate: function changeDate(d) {
				console.log(d);
				var nd = parseInt(parseInt(d) / 1000);
				console.log(nd);
				var year = new Date(nd).getFullYear();
				var month = new Date(nd).getMonth() + 1;
				var date = new Date(nd).getDate();
				return year + "-" + month + "-" + date;
			}
		}
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(35)
	__vue_script__ = __webpack_require__(38)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] pro\\red-configuration\\components\\item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(47)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-30a96948/item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-30a96948&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-30a96948&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".modal-container[_v-30a96948] {\n  width: 670px;\n  max-height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  margin: 0px auto;\n  padding: 0px 30px 30px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n.modal-wrapper[_v-30a96948] {\n  display: table-cell;\n  vertical-align: middle;\n  color: #666;\n  text-align: center;\n}\n.modal-head[_v-30a96948] {\n  position: relative;\n  border-bottom: 1px solid #e8e8e8;\n}\n.modal-head .modal-title[_v-30a96948] {\n  /* height: 65px;\n   line-height: 65px; */\n  line-height: 1;\n  padding-bottom: 15px;\n  padding-top: 25px;\n  font-size: 25px;\n  text-align: center;\n  font-weight: normal;\n  color: #333;\n}\n.modal-head .modal-close[_v-30a96948] {\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAylpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTA0OTAxMjY5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTA0OTAxMjU5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjU2OTBmNmJiLTA5MmItMjA0YS1iOTU3LTE4NmFhMDY1MjY3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjkwZjZiYi0wOTJiLTIwNGEtYjk1Ny0xODZhYTA2NTI2NzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UCCNHAAAAbElEQVR42pSRyQ3AMAgEzfbfANUSxVEkZLOI5cWDGS5z91hf2NJic0hgqPDL4ugeCvxPsATJtS6Ogk5S3gpFYSWhhwYZNUvaL6HZ10g+FgTJR4I8dvsdDK9NJZi8qpNgCFMJBLiUQIQvySPAADnqHeikkPSlAAAAAElFTkSuQmCC') no-repeat;\n  position: absolute;\n  top: 25px;\n  right: 0;\n  cursor: pointer;\n}\n.modal-foot[_v-30a96948] {\n  text-align: center;\n  margin-top: 10px;\n}\n.modal-mask[_v-30a96948] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.modal-content[_v-30a96948] {\n  font-size: 14px;\n  padding: 20px;\n  position: relative;\n  text-align: left;\n}\n.modal-content div.flx[_v-30a96948] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.modal-content div.flx div[_v-30a96948]:nth-of-type(1) {\n  margin-right: 20px;\n}\n.modal-content div.flx div[_v-30a96948]:nth-of-type(2) {\n  width: 380px;\n}\n.modal-content div.flx div:nth-of-type(2) span[_v-30a96948] {\n  margin-left: 0;\n}\n.modal-content .search-group[_v-30a96948]:last-of-type {\n  margin-bottom: 0;\n}\n.modal-content .anoth[_v-30a96948] {\n  display: block;\n  font-size: 14px;\n  position: relative;\n  left: 65px;\n  font-style: normal;\n  margin-top: 5px;\n  line-height: 1;\n  color: #f94a05;\n  top: -10px;\n}\n.modal-content .search-group[_v-30a96948] {\n  position: relative;\n  display: block;\n}\n.modal-content .search-group .add_rol[_v-30a96948] {\n  display: inline-block;\n}\n.modal-content .search-group .add_rol[_v-30a96948]:not(:nth-of-type(1)) {\n  position: relative;\n  left: 56px;\n  margin-top: 10px;\n}\n.modal-content .search-group .cutRule[_v-30a96948] {\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  vertical-align: -10px;\n  background-size: 100%;\n  background: url(" + __webpack_require__(123) + ") no-repeat 0 -32px;\n}\n.modal-content .search-group .addRule[_v-30a96948] {\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  vertical-align: -10px;\n  background-size: 100%;\n  background: url(" + __webpack_require__(123) + ") no-repeat 0 0;\n}\n.modal-content .search-group .block[_v-30a96948] {\n  display: inline-block;\n  width: 380px;\n  vertical-align: top;\n}\n.modal-content .search-group .radius[_v-30a96948] {\n  display: inline-block;\n  width: 95px;\n  height: 16px;\n  line-height: 16px;\n  text-align: center;\n  font-size: 14px;\n  background: url(" + __webpack_require__(37) + ") 0 -18px no-repeat;\n  background-size: 16px;\n  cursor: pointer;\n  color: #666;\n}\n.modal-content .search-group .radius[_v-30a96948]:first-of-type {\n  margin-left: 10px;\n}\n.modal-content .search-group .current[_v-30a96948] {\n  background-position: 0 0;\n}\n.modal-content .search-group label[_v-30a96948] {\n  width: 56px;\n  display: inline-block;\n}\n.modal-content .search-group span[_v-30a96948] {\n  font-size: 14px;\n  margin-left: 10px;\n}\n.modal-content .search-group .wd470[_v-30a96948] {\n  width: 470px;\n}\n.modal-content .search-group .wd100[_v-30a96948] {\n  width: 100px;\n}\n.modal-content .search-group .must-point[_v-30a96948] {\n  left: -10px;\n  top: 9px;\n}\n.modal-content .search-group .top2[_v-30a96948] {\n  top: 2px;\n}\n.modal-content .search-group .error[_v-30a96948] {\n  display: block;\n  font-size: 14px;\n  position: relative;\n  left: 65px;\n  font-style: normal;\n  margin-top: 5px;\n  line-height: 1;\n  color: #f94a05;\n  bottom: -8px;\n}\n.modal-foot button[_v-30a96948] {\n  font-size: 16px;\n  width: 130px;\n  height: 40px;\n  line-height: 40px;\n  border-radius: 3px;\n  cursor: pointer;\n  border: none;\n  outline: none;\n}\n.modal-foot .btn-cancel[_v-30a96948] {\n  color: #666;\n  background: #ddd;\n  margin-right: 20px;\n}\n.modal-foot .btn-save[_v-30a96948] {\n  color: #fff;\n  background: #63a8eb;\n}\n.modal-foot .btn-save[_v-30a96948]:hover {\n  background: #548ce5;\n}\n.modal-enter[_v-30a96948],\n.modal-leave[_v-30a96948] {\n  opacity: 0;\n}\n.modal-enter .modal-container[_v-30a96948],\n.modal-leave .modal-container[_v-30a96948] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAiCAYAAABWQVnHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACGUlEQVRIx7XUMWsUQRjG8d9tEbBJYrFg6w0aMX4AP0CUiIogRrf2YiGCmE6wFysVUbHI9gFFESOInthbiyTKiHbCNRoLIY0WOxf2ctnzFHxgYZhnn92Zed/5t2xTZ6V3EIs4hr1p+hNeYLks8vf191u14ARuYgG3sYoPyd6PE7iCJ1gqi/zn1gdS+Dk2cL4s8u92UGelN4USu3GsLPLNLHm38ANnmsKQvAV8S6vV6qz0ZvEa+8si30h/2ocbmEvZLq6WRf4x+ZNYx1yWDux+LTyDtziNyfScxtvkSe/ewWKGeTytrfQ6pnfYwXTy+lrFfIY21mrGnGYdrY3X0c78uyawmama5EDN6I4IvayN2/iSqTrsVM24lsq0Xd+S19dxdDNVY1xMpVEW+RoO47GqN36k8eHk9ct4Gcv9TryHPapG+jVq452VXguP8LUs8kv9Q1xS1ftRatem8BQeqkq6xOjL9CyVqqW6TCc1XaZtf5nFBVWDtbGJz6k6y2WRv/urYv93DW0hxjiSSCGEASJlteBEjPEu3qCHs5hKz7k09ybG+CDGuGtgBTHGASKFEHaESoxxgEghhGEiNYUheYNEijFuESmEsDHOwcUYh4k0bjitZCSRxlUjkcbV/yPSuGok0rg6jm4rxngIrzDzD2U80u/ELSKFEH79IbxFpBDCMJFSuzaFm4mU7sPYRAoh7Eyk1NqNRAohDBDpN17a5T0yrbwdAAAAAElFTkSuQmCC"

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(26);

	var _newStore = __webpack_require__(39);

	var _newStore2 = _interopRequireDefault(_newStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: { store: _newStore2.default },
		vuex: {
			getters: {
				show: function show(state) {
					return state.editShow;
				},
				stShow: function stShow(state) {
					return state.storeShow;
				},
				title: function title(state) {
					return state.modalTitle;
				}
			},
			actions: {
				editShow: _actions.editShow, storeShow: _actions.storeShow
			}
		},
		props: ["iteminfo"],
		data: function data() {
			return {
				hasCheck: [],
				vali: {
					name: false,
					state: false,
					storeUuids: false,
					rule: false,
					activityDate: false,
					type: false,
					avgMoney: false,
					owerRatio: false
				}
			};
		},
		ready: function ready() {
			this.init();
			console.log(this.iteminfo);
		},

		methods: {
			init: function init() {
				var cardStay = {
					start: $('#cardStartDate'),
					end: $('#cardEndDate'),
					today: new Date(),
					init: function init() {
						cardStay.inputVal();
						cardStay.today = new Date($("#cardStartDate").val());
						cardStay.endFun();
						cardStay.startFun();
						cardStay.end.datepicker('option', 'minDate', new Date(moment(cardStay.today).add('days', 0)));
					},
					startFun: function startFun() {
						cardStay.start.datepicker({
							dateFormat: 'yy-mm-dd',
							dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
							monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
							altFormat: 'yy-mm-dd',
							yearSuffix: '年',
							showMonthAfterYear: true,
							firstDay: 1,
							showOtherMonths: true,
							minDate: -36000,
							maxDate: 36000,
							onSelect: function onSelect(dateText, inst) {
								cardStay.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 0)));
							}

						});
					},
					endFun: function endFun() {
						cardStay.end.datepicker('refresh');
						cardStay.end.datepicker({
							dateFormat: 'yy-mm-dd',
							dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
							monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
							altFormat: 'yy-mm-dd',
							yearSuffix: '年',
							showMonthAfterYear: true,
							firstDay: 1,
							showOtherMonths: true,
							minDate: 0,
							maxDate: 36000
						});
					},
					transformStr: function transformStr(day, strDay) {
						switch (day) {
							case 1:
								strDay = '星期一';
								break;
							case 2:
								strDay = '星期二';
								break;
							case 3:
								strDay = '星期三';
								break;
							case 4:
								strDay = '星期四';
								break;
							case 5:
								strDay = '星期五';
								break;
							case 6:
								strDay = '星期六';
								break;
							case 0:
								strDay = '星期日';
								break;
						}
						return strDay;
					},
					compare: function compare(obj) {
						var strDay = '今天';
						var myDate = new Date(cardStay.today.getFullYear(), cardStay.today.getMonth(), cardStay.today.getDate());
						var day = (obj.datepicker('getDate') - myDate) / (24 * 60 * 60 * 1000);
						day == 0 ? strDay : day == 1 ? strDay = '明天' : day == 2 ? strDay = '后天' : strDay = cardStay.transformStr(obj.datepicker('getDate').getDay(), strDay);
						return strDay;
					},
					inputVal: function inputVal() {
						cardStay.inputTimes(cardStay.start, -7);
						cardStay.inputTimes(cardStay.end, -1);
					},
					inputTimes: function inputTimes(obj, day) {
						var m = new Date(moment(cardStay.today).add('days', day));
						obj.val(m.getFullYear() + "-" + cardStay.addZero(m.getMonth() + 1) + "-" + cardStay.addZero(m.getDate()));
					},
					addZero: function addZero(num) {
						num < 10 ? num = "0" + num : num;
						return num;
					}
				};
				cardStay.init();
			},
			getTime: function getTime(d) {
				return Date.parse(new Date(d)) / 1000;
			},
			checkStore: function checkStore(e) {
				$(e.currentTarget).parent().find('a').removeClass('current');
				$(e.currentTarget).addClass('current');
				if (e.currentTarget.innerHTML === '指定门店') {
					this.storeShow();
				}
			},
			saveItem: function saveItem() {
				var _ = this;

				if (_.iteminfo.name == '') {
					_.vali.name = true;
				};
				if (_.iteminfo.state == '') {
					_.vali.state = true;
				};
				if (_.iteminfo.storeUuids.length === 0) {
					_.vali.storeUuids = true;
				};
				if (_.iteminfo.rule.payMoney == '' || _.iteminfo.rule.ratio == '') {
					_.vali.rule = true;
				};
				if (_.iteminfo.activityBeginDate == '' || _.iteminfo.activityEndDate == '') {
					_.vali.activityDate = true;
				};
				if (_.iteminfo.avgMoney == '') {
					_.vali.avgMoney = true;
				};
				if (_.iteminfo.owerRatio == '') {
					_.vali.owerRatio = true;
				};

				if (_.iteminfo.name != '') {
					_.vali.name = false;
				};
				if (_.iteminfo.state != '') {
					_.vali.state = false;
				};
				if (_.iteminfo.storeUuids.length > 0) {
					_.vali.storeUuids = false;
				};
				if (_.iteminfo.rule.payMoney != '' && _.iteminfo.rule.ratio != '') {
					_.vali.rule = false;
				};
				if (_.iteminfo.activityBeginDate != '' && _.iteminfo.activityEndDate != '') {
					_.vali.activityDate = false;
				};
				if (_.iteminfo.avgMoney != '') {
					_.vali.avgMoney = false;
				};
				if (_.iteminfo.owerRatio != '') {
					_.vali.owerRatio = false;
				};
			}
		}
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(40)
	__vue_script__ = __webpack_require__(45)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] pro\\red-configuration\\components\\newStore.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(46)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-88b5082c/newStore.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-88b5082c&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./newStore.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-88b5082c&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./newStore.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".modal-container[_v-88b5082c] {\n  width: 670px;\n  height: 630px;\n  margin: 0px auto;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  box-sizing: border-box;\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n.modal-wrapper[_v-88b5082c] {\n  display: table-cell;\n  vertical-align: middle;\n  color: #666;\n  text-align: center;\n}\n.modal-head[_v-88b5082c] {\n  position: relative;\n  border-bottom: 1px solid #e8e8e8;\n}\n.modal-head .modal-title[_v-88b5082c] {\n  /* height: 65px;\n   line-height: 65px; */\n  line-height: 1;\n  padding-bottom: 15px;\n  padding-top: 25px;\n  font-size: 25px;\n  text-align: center;\n  font-weight: normal;\n  color: #333;\n}\n.modal-head .modal-close[_v-88b5082c] {\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAylpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTA0OTAxMjY5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTA0OTAxMjU5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjU2OTBmNmJiLTA5MmItMjA0YS1iOTU3LTE4NmFhMDY1MjY3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjkwZjZiYi0wOTJiLTIwNGEtYjk1Ny0xODZhYTA2NTI2NzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UCCNHAAAAbElEQVR42pSRyQ3AMAgEzfbfANUSxVEkZLOI5cWDGS5z91hf2NJic0hgqPDL4ugeCvxPsATJtS6Ogk5S3gpFYSWhhwYZNUvaL6HZ10g+FgTJR4I8dvsdDK9NJZi8qpNgCFMJBLiUQIQvySPAADnqHeikkPSlAAAAAElFTkSuQmCC') no-repeat;\n  position: absolute;\n  top: 30px;\n  right: 30px;\n  cursor: pointer;\n}\n.modal-foot[_v-88b5082c] {\n  text-align: center;\n  margin-top: 10px;\n}\n.modal-mask[_v-88b5082c] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.modal-content[_v-88b5082c] {\n  font-size: 14px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.modal-content .store_tree[_v-88b5082c],\n.modal-content .store_chosed[_v-88b5082c] {\n  width: 334px;\n  box-sizing: border-box;\n  border-right: 1px solid #e8e8e8;\n}\n.modal-content .store_tree h3[_v-88b5082c],\n.modal-content .store_chosed h3[_v-88b5082c] {\n  text-align: left;\n  font-weight: normal;\n  color: #333;\n  font-size: 14px;\n  background-color: #f4f4f4;\n  margin: 0;\n  padding-left: 30px;\n  height: 40px;\n  line-height: 40px;\n  border-bottom: 1px solid #e8e8e8;\n}\n.modal-content .store_tree[_v-88b5082c] {\n  padding-bottom: 30px;\n}\n.modal-content .store_tree .search_box[_v-88b5082c] {\n  display: inline-block;\n  position: absolute;\n  right: -8px;\n  top: 9px;\n  width: 18px;\n  height: 18px;\n  background: url(" + __webpack_require__(42) + ") no-repeat;\n  background-size: 100%;\n}\n.modal-content .store_tree p[_v-88b5082c] {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  width: 274px;\n  padding: 0;\n  padding-left: 10px;\n  position: relative;\n}\n.modal-content .store_tree p .wd-273[_v-88b5082c] {\n  width: 273px;\n  padding-right: 30px;\n}\n.modal-content .store_tree .ztree[_v-88b5082c] {\n  margin-top: 5px;\n  margin-left: 30px;\n  width: 285px;\n  height: 350px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.modal-content .store_footer[_v-88b5082c] {\n  text-align: left;\n  height: 34px;\n  line-height: 34px;\n  margin-top: 25px;\n  margin-left: 30px;\n  padding-left: 10px;\n}\n.modal-content .store_footer .check_box[_v-88b5082c] {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  margin-right: 10px;\n  vertical-align: -3px;\n  background: url(" + __webpack_require__(43) + ") 0 0 no-repeat;\n}\n.modal-content .store_footer .checked[_v-88b5082c] {\n  background-position: -16px 0;\n}\n.modal-content .store_footer input[_v-88b5082c],\n.modal-content .store_footer select[_v-88b5082c] {\n  vertical-align: middle;\n}\n.modal-content .store_footer span[_v-88b5082c] {\n  display: inline-block;\n  margin-left: 12px;\n}\n.modal-content .store_footer span b[_v-88b5082c] {\n  color: black;\n  font-weight: normal;\n}\n.modal-content .store_footer .mr-8[_v-88b5082c] {\n  margin-right: 8px;\n}\n.modal-content .chosed_footer[_v-88b5082c] {\n  text-align: left;\n  margin-top: 30px;\n  color: #999;\n}\n.modal-content .chosed_footer .clear_all[_v-88b5082c] {\n  color: #63a8eb;\n  cursor: pointer;\n}\n.modal-content .chosed_footer .btn-default[_v-88b5082c] {\n  margin-left: 20px;\n  margin-right: 5px;\n}\n.modal-content .store_chosed[_v-88b5082c] {\n  width: 336px;\n  height: 465px;\n}\n.modal-content .store_chosed .mr-5[_v-88b5082c] {\n  margin-right: 5px;\n}\n.modal-content .store_chosed .chosed_stores[_v-88b5082c] {\n  margin-top: 20px;\n  padding-right: 20px;\n  width: 320px;\n  height: 409px;\n  overflow-y: auto;\n}\n.modal-content .store_chosed .chosed_stores li[_v-88b5082c] {\n  height: 36px;\n  list-style: none;\n  border: 1px solid transparent;\n  line-height: 36px;\n  padding-left: 10px;\n  text-align: left;\n  position: relative;\n  color: #666666;\n  margin-left: 20px;\n}\n.modal-content .store_chosed .chosed_stores li .close_item[_v-88b5082c] {\n  display: inline-block;\n  width: 10px;\n  height: 9px;\n  position: absolute;\n  right: 10px;\n  top: 13px;\n  background: url(" + __webpack_require__(44) + ") 0px 0px no-repeat;\n}\n.modal-content .store_chosed .chosed_stores li[_v-88b5082c]:hover {\n  color: #63a8eb;\n  border: 1px solid #63a8eb;\n}\n.modal-content .store_chosed .chosed_stores li:hover .close_item[_v-88b5082c] {\n  background-position: 0 -9px;\n}\n.modal-foot button[_v-88b5082c] {\n  font-size: 16px;\n  width: 130px;\n  height: 40px;\n  line-height: 40px;\n  border-radius: 3px;\n  cursor: pointer;\n  border: none;\n  outline: none;\n}\n.modal-foot .btn-cancel[_v-88b5082c] {\n  color: #666;\n  background: #ddd;\n  margin-right: 20px;\n}\n.modal-foot .btn-save[_v-88b5082c] {\n  color: #fff;\n  background: #63a8eb;\n}\n.modal-foot .btn-save[_v-88b5082c]:hover {\n  background: #548ce5;\n}\n.modal-enter[_v-88b5082c],\n.modal-leave[_v-88b5082c] {\n  opacity: 0;\n}\n.modal-enter .modal-container[_v-88b5082c],\n.modal-leave .modal-container[_v-88b5082c] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n", ""]);

	// exports


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiOTAyZjk2OC02YzE5LTRmNDctOTRhZS1jZGFkNjc0YzMzMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkU4MTg3MzAxQzAxMTFFNkEyQjZDNjkzQkE1RjA1Q0EiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkU4MTg3MkYxQzAxMTFFNkEyQjZDNjkzQkE1RjA1Q0EiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTI0ZGNiMTctZjUyYS04YjQ5LWIzMTEtOTE3NTE1ODhhYjYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmI5MDJmOTY4LTZjMTktNGY0Ny05NGFlLWNkYWQ2NzRjMzMyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgm9ZMAAAAHOSURBVHjarJTLSwJRFMavZvYH1CJyE2FRuxa5sE2rwIIe9FgVpREGPUhykf4FuXQRkZOFi1oVRS0S2rcIwmghhKsIdFXrsIfTd+MT1ObaDHjgx7kz59xv7pw5c2yJRELUmBPMg1kwANrAK7gHp+AYfNRuCgaDVdf2mvgwyIJD4KOooPfxfpZ5da1S2A/SwA0yIABcwEYf4H038/xmhL3gADSBGPCAFCgwXuC1h3GZJ2s4WE9YnmgPOEAcREFJkV9iPM5vkeQ+Q+Ex0A9eQESYM5n3DPq431B4iutdUDQpXORbSptQCXu5Tgtrdk0/pBJ2cZ2zKFzO7/iv3ayak/5TJZznuseicBd9XiWc4XrEorCP/sEoaMOsmIS/YPv0muyMFvAEOsE0ODc68SV4ZFLM5GljzJfiV6pS6GANfIMQ2KnzUe2Mh7gvx33KrrgFy0ySf9UdWATtjEu/wPsR5smTjoN9joUqq/zPy0PniHM4pTi17IIlcMOSbLPlNvgWf4QFk7vBHJjhA1rBGwf9GTgB7xUzoxlsgS+WyFBYcFOSmLEwx+gmSxT+bTdd1y01r6Zphm3LIbbK8kQdojEmT7fOssjyFBslXBZfoR/9EWAAjldpRQ2sYgIAAAAASUVORK5CYII="

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAADPElEQVR42u3cP2sUQRjH8d/dxuqKVANql+QV2NgYBEFBBFvZfuVKX1Bg+0M7FQQLQbCwCfgGLqkkkQmoxabLncVFxFuPZL25fWZnv5/mSLG39+z+9tk/mZ1BVVVz770uLi7URJZlcs7pxZvzJ5JKSbcafYF0Iqkoc/eu4XJIyJb3Xs45jUajQZMFfwdXGpWSnpW5+9Rk+WLi9yW9lHTbeiPA0HQ6na+zbDHx/738OssiDUPrH4B+I4AwtdXGSoqJ35b0WlJW5m7fumjEY+Md8DJ87yXdl8Q1H/4SvAMWE/9R0k9JuaQbWoTvrqRDSU+tC0ZcNnEK3tai272VNNKf8D0sc/fDumDEZRMBfCzpg6QHl38fSnpE+PAvwa8By9ydahG+L5I+axG+79aFIk4buQsuc/dN0h3r4hA/ngPCFAGEqWGWZaqqqvHzuaqq5lmWSdLJ5cCCRoqJvyfp1HoDwNaWc07e+8aDEs7OzuSck3T+XNKrYuJvNlz3V0mF9QYAAAAAAAAAAERmPB7Px+MxI5sRBP8LhikCCFMEEKaunI7jutd7BwcHg+l0Ot/b21v5OZvN5sPhcGC5nmVXfdd1P9vcaSkJGsB1fkhb60HHpXYXvM7cOFhf768BOX3a6n0A6YC2eh9AOiBWaqM70QE7hh2G3qADooYdht6gA6KGHYbeoAOihh2GkKJ+EE0HBBCXNjsGHRBAXOiAAPqLDgigvwdOm++E0AHTF/WD6DZGK3d1RPTx8XESB07UATw6OqIDrrCzs9PJA2dZ1AHc3d2lA64wm806eeAsY2YEZkYwxcwI6BZmRkBIUV8DthEOTp+2og5gG+GgA9qKOoB0QNSk1jFSqwcBEQ7UpBaK1OpBQIQDNamFIrV6EBDhQE1qoUitHgREOFCTWihSqwcBEQ7UpBaK1OpBQIQDNamFIrV6EBDhQE1qoUitHgTUxmuZ6BjeCUFIUY+IbgMjom31PoB0QFu9DyAd0BYzIzAzgilmRkC3pHYXDFu9vwaELQIIUwQQAAAAAAAAAAAAAAAAAAAA7eKdEITEiGiYIoAwRQBhihfTYYoOiG7hLhgh0QFhigDCFAEEAAAAAAAAAGzULzUZi6z4nPPZAAAAAElFTkSuQmCC"

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyOEIzODVFQjRFM0YxMUU2QTg3QjlFNzJFRTg5RUVFQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyOEIzODVFQzRFM0YxMUU2QTg3QjlFNzJFRTg5RUVFQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4QjM4NUU5NEUzRjExRTZBODdCOUU3MkVFODlFRUVBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4QjM4NUVBNEUzRjExRTZBODdCOUU3MkVFODlFRUVBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Bv7C5wAAAHFJREFUeNpiTEtL+88AAYwM2AFYnglJwX9cikBqmNBM+49NEcxEBiyKMZzDhGYVIw42hsL/ONgoCpGtw3Azy1+nVgbmfdVgASAbxWqo+H+QOBMORQzIYiA1jMkrXo8GOM4AZ8LmcGweZMKhCEMxQIABAFquMg8Ypct7AAAAAElFTkSuQmCC"

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _data = __webpack_require__(28);

	var _data2 = _interopRequireDefault(_data);

	var _actions = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	   vuex: {
	      getters: {
	         show: function show(state) {
	            return state.storeShow;
	         },
	         title: function title(state) {
	            return state.modalTitle;
	         }
	      },
	      actions: {
	         storeShow: _actions.storeShow
	      }
	   },
	   data: function data() {
	      return {
	         storeData: _data2.default.zNode,
	         hasCheck: [],
	         zNodes: []
	      };
	   },
	   ready: function ready() {
	      this.todo();
	   },

	   methods: {
	      todo: function todo() {
	         this.makeTree();
	      },
	      makeTree: function makeTree() {
	         var _ = this;
	         var setting = {
	            check: {
	               enable: true,
	               chkboxType: { "Y": "", "N": "" }
	            },
	            data: {
	               simpleData: {
	                  enable: true
	               }
	            },
	            callback: {
	               onCheck: _.checkStore
	            }
	         };
	         $(_.storeData).each(function () {
	            var item = {
	               id: this.id,
	               pId: this.storeId,
	               name: this.storeName,
	               uid: this.sysUuid
	            };
	            _.zNodes.push(item);
	         });

	         $.fn.zTree.init($("#treeDemo"), setting, _.zNodes);
	      },
	      checkStore: function checkStore(e, treeId, treeNode) {
	         console.log(this.hasCheck);
	         if (treeNode.checked === true) {
	            this.hasCheck.push(treeNode);
	         } else {
	            var n = $.inArray(treeNode, this.hasCheck);
	            this.hasCheck.splice(n, 1);
	         }
	      },
	      deleteItem: function deleteItem(n) {
	         this.hasCheck.splice(n, 1);
	      }
	   }
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t<div v-show=\"show\" class=\"modal-mask\" transition=\"modal\" _v-88b5082c=\"\">\n\t\t<div class=\"modal-wrapper\" _v-88b5082c=\"\">\n\t\t\t<div class=\"modal-container\" _v-88b5082c=\"\">\n\t\t\t\t<div class=\"modal-head\" _v-88b5082c=\"\">\n\t\t\t\t\t<div class=\"modal-title\" _v-88b5082c=\"\">\n\t\t\t\t\t\t<slot name=\"header\" _v-88b5082c=\"\">{{title}}</slot>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"modal-close\" @click=\"storeShow()\" _v-88b5082c=\"\"></span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-content\" _v-88b5082c=\"\">\n\t\t\t\t\t<div class=\"store_tree\" _v-88b5082c=\"\">\n                  <h3 _v-88b5082c=\"\">所有门店</h3>\n                  <p _v-88b5082c=\"\">\n                     <input type=\"text\" id=\"txtSearchStoreName\" placeholder=\"输入门店名称\" class=\"wd-273\" _v-88b5082c=\"\">\n                     <a href=\"javascript:;\" class=\"search_box\" id=\"btnSearchStore\" _v-88b5082c=\"\"></a>\n                  </p>\n                  <ul id=\"treeDemo\" class=\"ztree\" _v-88b5082c=\"\"></ul>\n                  <div class=\"store_footer\" _v-88b5082c=\"\">\n                     <a class=\"check_box\" href=\"javascript:;\" id=\"all_checked\" _v-88b5082c=\"\"></a>全选\n                     <span _v-88b5082c=\"\">\n                        共<b id=\"bStoreTotal\" _v-88b5082c=\"\">373</b>家门店\n                     </span>\n                  </div>\n               </div>\n               <div class=\"store_chosed\" _v-88b5082c=\"\">\n                  <h3 _v-88b5082c=\"\">已选门店</h3>\n                  <ul class=\"chosed_stores\" id=\"chosed_stores\" _v-88b5082c=\"\">\n                     <li v-for=\"item in hasCheck\" :id=\"item.uid\" _v-88b5082c=\"\">\n                        {{item.name}}\n                        <a class=\"close_item\" @click=\"deleteItem($index)\" href=\"javascript:;\" _v-88b5082c=\"\"></a>\n                     </li>\n                  </ul>\n                  <div class=\"chosed_footer\" _v-88b5082c=\"\">\n                     <input type=\"submit\" id=\"btnSaveStores\" value=\"保存配置\" class=\"btn-default mr-8\" _v-88b5082c=\"\">\n                     <span _v-88b5082c=\"\">\n                        已选择\n                        <b style=\"color: #333;font-weight: normal\" _v-88b5082c=\"\">{{hasCheck.length}}</b>\n                        家门店\n                     </span>\n                     <span class=\"clear_all\" id=\"spCleanAll\" _v-88b5082c=\"\">清空所选</span>\n                  </div>\n               </div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n";

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div v-show=\"show\" class=\"modal-mask\" transition=\"modal\" _v-30a96948=\"\">\n\t<div class=\"modal-wrapper\" _v-30a96948=\"\">\n\t\t<div class=\"modal-container\" _v-30a96948=\"\">\n\t\t\t<div class=\"modal-head\" _v-30a96948=\"\">\n\t\t\t\t<div class=\"modal-title\" _v-30a96948=\"\">\n\t\t\t\t\t<slot name=\"header\" _v-30a96948=\"\">{{title}}</slot>\n\t\t\t\t</div>\n\t\t\t\t<span class=\"modal-close\" @click=\"editShow()\" _v-30a96948=\"\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"modal-content\" _v-30a96948=\"\">\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<em class=\"must-point\" _v-30a96948=\"\">*</em>\n\t\t\t\t\t<label _v-30a96948=\"\">规则名称</label>\n\t\t\t\t\t<input maxlength=\"32\" v-model=\"iteminfo.name\" class=\"wd470\" type=\"text\" name=\"\" _v-30a96948=\"\">\n\t\t\t\t\t<em v-show=\"vali.name\" class=\"error\" _v-30a96948=\"\">请填写规则名称，长度1~32个字</em>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<em class=\"must-point\" _v-30a96948=\"\">*</em>\n\t\t\t\t\t<label _v-30a96948=\"\">有效期</label>\n\t\t\t\t\t<input id=\"cardStartDate\" v-model=\"iteminfo.activityBeginDate\" class=\"wd100\" type=\"text\" name=\"\" _v-30a96948=\"\">\n\t\t\t\t\t<span _v-30a96948=\"\">至</span>\n\t\t\t\t\t<input id=\"cardEndDate\" v-model=\"iteminfo.activityEndDate\" class=\"wd100\" type=\"text\" name=\"\" _v-30a96948=\"\">\n\t\t\t\t\t<em v-show=\"vali.activityDate\" class=\"error\" _v-30a96948=\"\">请填写有效期</em>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<em class=\"must-point top2\" _v-30a96948=\"\">*</em>\n\t\t\t\t\t<label _v-30a96948=\"\">适用门店</label>\n\t\t\t\t\t<a @click=\"checkStore\" class=\"radius current\" href=\"javascript:;\" _v-30a96948=\"\">所有门店</a>\n\t\t\t\t\t<a @click=\"checkStore\" class=\"radius\" href=\"javascript:;\" _v-30a96948=\"\">指定门店</a>\n\t\t\t\t\t<store _v-30a96948=\"\"></store>\n\t\t\t\t\t<em v-show=\"vali.storeUuids\" class=\"error\" _v-30a96948=\"\">请选择适用门店</em>\n\t\t\t\t</div>\t\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<em class=\"must-point\" _v-30a96948=\"\">*</em>\n\t\t\t\t\t<label _v-30a96948=\"\">规则名称</label>\n\t\t\t\t\t<slot v-if=\"iteminfo.rule.length<3\" _v-30a96948=\"\">\n\t\t\t\t\t\t<div class=\"add_rol\" v-for=\"item in iteminfo.rule\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t<span _v-30a96948=\"\">订单金额 ≥ </span>\n\t\t\t\t\t\t\t<input v-model=\"item.payMoney \" class=\"wd100\" type=\"text\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t<span _v-30a96948=\"\">元，返点比例</span>\n\t\t\t\t\t\t\t<input v-model=\"item.ratio\" class=\"wd100\" type=\"text\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t<span _v-30a96948=\"\">%</span>\n\t\t\t\t\t\t\t<slot v-if=\"$index+1 === iteminfo.rule.length\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t\t<span class=\"addRule\" _v-30a96948=\"\"></span>\n\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t\t<slot v-else=\"\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t\t<span class=\"cutRule\" _v-30a96948=\"\"></span>\n\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</slot>\n\t\t\t\t\t<slot v-if=\"iteminfo.rule.length === 3\" _v-30a96948=\"\">\n\t\t\t\t\t\t<div class=\"add_rol\" v-for=\"item in iteminfo.rule\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t<span _v-30a96948=\"\">订单金额 ≥ </span>\n\t\t\t\t\t\t\t<input v-model=\"item.payMoney \" class=\"wd100\" type=\"text\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t<span _v-30a96948=\"\">元，返点比例</span>\n\t\t\t\t\t\t\t<input v-model=\"item.ratio\" class=\"wd100\" type=\"text\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" _v-30a96948=\"\">\n\t\t\t\t\t\t\t<span _v-30a96948=\"\">%</span>\n\t\t\t\t\t\t\t<span class=\"cutRule\" _v-30a96948=\"\"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</slot>\n\t\t\t\t\t<em v-show=\"vali.rule\" class=\"error\" _v-30a96948=\"\">请填写返点比例（订单金额需为正整数，返点比例范围1~100的整数）</em>\n\t\t\t\t</div>\t\n\t\t\t\t<div class=\"search-group flx\" _v-30a96948=\"\">\n\t\t\t\t\t<div _v-30a96948=\"\">\n\t\t\t\t\t\t<em style=\"top:13px\" class=\"must-point\" _v-30a96948=\"\">*</em>\n\t\t\t\t\t\t<label _v-30a96948=\"\">金主所得</label>\n\t\t\t\t\t\t<input v-model=\"iteminfo.owerRatio\" class=\"wd100\" type=\"text\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" _v-30a96948=\"\">\n\t\t\t\t\t\t<span _v-30a96948=\"\">%</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div _v-30a96948=\"\">\n\t\t\t\t\t\t<span _v-30a96948=\"\">订单拥有者可以获得红包金额的比例，当计算剩余金额不足1元时，则金主获得全部金额</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\t\n\t\t\t\t<em v-show=\"vali.owerRatio\" class=\"error anoth\" _v-30a96948=\"\">请输入范围1~100的整数</em>\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<em class=\"must-point top2\" _v-30a96948=\"\">*</em>\n\t\t\t\t\t<label _v-30a96948=\"\">红包类型</label>\n\t\t\t\t\t<slot v-if=\"iteminfo.type==&quot;random&quot;\" _v-30a96948=\"\">\n\t\t\t\t\t\t<a @click=\"checkStore\" class=\"radius\" href=\"javascript:;\" _v-30a96948=\"\">固定金额</a>\n\t\t\t\t\t\t<a @click=\"checkStore\" class=\"radius current\" href=\"javascript:;\" _v-30a96948=\"\">随机金额</a>\n\t\t\t\t\t</slot>\n\t\t\t\t\t<slot v-else=\"\" _v-30a96948=\"\">\n\t\t\t\t\t\t<a @click=\"checkStore\" class=\"radius current\" href=\"javascript:;\" _v-30a96948=\"\">固定金额</a>\n\t\t\t\t\t\t<a @click=\"checkStore\" class=\"radius\" href=\"javascript:;\" _v-30a96948=\"\">随机金额</a>\n\t\t\t\t\t</slot>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<em class=\"must-point\" _v-30a96948=\"\">*</em>\n\t\t\t\t\t<label _v-30a96948=\"\">每人领取</label>\n\t\t\t\t\t<input v-model=\"iteminfo.avgMoney\" class=\"wd100\" type=\"text\" onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" _v-30a96948=\"\">\n\t\t\t\t\t<span _v-30a96948=\"\">请输入1~199的数值</span>\n\t\t\t\t\t<em v-show=\"vali.avgMoney\" class=\"error\" _v-30a96948=\"\">请填写正确金额</em>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<label _v-30a96948=\"\">红包金额</label>\n\t\t\t\t\t<span _v-30a96948=\"\">红包金额 = 订单金额 * 返点比例</span>\n\t\t\t\t\t<span _v-30a96948=\"\">（四舍五入，保留整数）</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-group\" _v-30a96948=\"\">\n\t\t\t\t\t<label _v-30a96948=\"\">领取人数</label>\n\t\t\t\t\t<span class=\"block\" _v-30a96948=\"\">\n\t\t\t\t\t\t固定金额时，领取人数 = （红包金额 - 金主所得）/ 每人领取<br _v-30a96948=\"\">\n\t\t\t\t\t\t随机金额时，领取人数 = （红包金额 - 金主所得）/ 平均领取\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-foot\" _v-30a96948=\"\">\n\t\t\t\t<button type=\"button\" class=\"btn-cancel\" @click=\"editShow()\" _v-30a96948=\"\">取 消</button>\n\t\t\t\t<button type=\"button\" class=\"btn-save\" @click=\"saveItem()\" _v-30a96948=\"\"> 保 存</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(49)
	__vue_script__ = __webpack_require__(51)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] pro\\red-configuration\\components\\delete.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(52)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4a237c98/delete.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(50);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4a237c98&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./delete.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4a237c98&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./delete.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".modal-container[_v-4a237c98] {\n  width: 426px;\n  margin: 0px auto;\n  padding: 0px 30px 30px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n.modal-wrapper[_v-4a237c98] {\n  display: table-cell;\n  vertical-align: middle;\n  color: #666;\n  text-align: center;\n}\n.modal-head[_v-4a237c98] {\n  position: relative;\n  border-bottom: 1px solid #e8e8e8;\n  margin-bottom: 20px;\n}\n.modal-head .modal-title[_v-4a237c98] {\n  /* height: 65px;\n   line-height: 65px; */\n  line-height: 1;\n  padding-bottom: 15px;\n  padding-top: 25px;\n  font-size: 25px;\n  text-align: center;\n  font-weight: normal;\n  color: #333;\n}\n.modal-head .modal-close[_v-4a237c98] {\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAylpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTA0OTAxMjY5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTA0OTAxMjU5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjU2OTBmNmJiLTA5MmItMjA0YS1iOTU3LTE4NmFhMDY1MjY3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjkwZjZiYi0wOTJiLTIwNGEtYjk1Ny0xODZhYTA2NTI2NzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UCCNHAAAAbElEQVR42pSRyQ3AMAgEzfbfANUSxVEkZLOI5cWDGS5z91hf2NJic0hgqPDL4ugeCvxPsATJtS6Ogk5S3gpFYSWhhwYZNUvaL6HZ10g+FgTJR4I8dvsdDK9NJZi8qpNgCFMJBLiUQIQvySPAADnqHeikkPSlAAAAAElFTkSuQmCC') no-repeat;\n  position: absolute;\n  top: 25px;\n  right: 0;\n  cursor: pointer;\n}\n.modal-foot[_v-4a237c98] {\n  text-align: center;\n  margin-top: 10px;\n}\n.modal-mask[_v-4a237c98] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.modal-content[_v-4a237c98] {\n  font-size: 14px;\n  padding: 20px;\n}\n.modal-foot button[_v-4a237c98] {\n  font-size: 16px;\n  width: 130px;\n  height: 40px;\n  line-height: 40px;\n  border-radius: 3px;\n  cursor: pointer;\n  border: none;\n  outline: none;\n}\n.modal-foot .btn-cancel[_v-4a237c98] {\n  color: #666;\n  background: #ddd;\n  margin-right: 20px;\n}\n.modal-foot .btn-save[_v-4a237c98] {\n  color: #fff;\n  background: #63a8eb;\n}\n.modal-foot .btn-save[_v-4a237c98]:hover {\n  background: #548ce5;\n}\n.modal-enter[_v-4a237c98],\n.modal-leave[_v-4a237c98] {\n  opacity: 0;\n}\n.modal-enter .modal-container[_v-4a237c98],\n.modal-leave .modal-container[_v-4a237c98] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n", ""]);

	// exports


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(26);

	exports.default = {
		vuex: {
			getters: {
				show: function show(state) {
					return state.deletShow;
				},
				title: function title(state) {
					return state.modalTitle;
				},
				open: function open(state) {
					return state.openOrShow;
				},
				info: function info(state) {
					return state.itemInfo;
				}
			},
			actions: {
				deleteItem: _actions.deleteItem
			}
		},
		methods: {
			sure: function sure() {
				console.log(this.info);
				this.deleteItem(this.info.id, this.info.state);
			}
		}
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div v-show=\"show\" class=\"modal-mask\" transition=\"modal\" _v-4a237c98=\"\">\n\t<div class=\"modal-wrapper\" _v-4a237c98=\"\">\n\t\t<div class=\"modal-container\" _v-4a237c98=\"\">\n\t\t\t<div class=\"modal-head\" _v-4a237c98=\"\">\n\t\t\t\t<div class=\"modal-title\" _v-4a237c98=\"\">\n\t\t\t\t\t<slot name=\"header\" _v-4a237c98=\"\">{{title}}</slot>\n\t\t\t\t</div>\n\t\t\t\t<span class=\"modal-close\" @click=\"deleteItem()\" _v-4a237c98=\"\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"modal-content\" _v-4a237c98=\"\">\n\t\t\t\t<slot name=\"body\" _v-4a237c98=\"\">确定{{open}}该规则？</slot>\n\t\t\t</div>\n\t\t\t<div class=\"modal-foot\" _v-4a237c98=\"\">\n\t\t\t\t<button type=\"button\" class=\"btn-cancel\" @click=\"deleteItem()\" _v-4a237c98=\"\">取 消</button>\n\t\t\t\t<button type=\"button\" class=\"btn-save\" @click=\"sure()\" _v-4a237c98=\"\"> 确 认</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t<div class=\"table-form\" _v-2d9e6973=\"\">\n\t\t<div class=\"search-group\" _v-2d9e6973=\"\">\n\t\t\t<label _v-2d9e6973=\"\">规则名称</label>\n\t\t\t<input v-model=\"ruleList.ruleName\" type=\"text\" _v-2d9e6973=\"\">\n\t\t</div>\n\t\t<div class=\"search-group\" _v-2d9e6973=\"\">\n\t\t\t<label _v-2d9e6973=\"\">状态</label>\n\t\t\t<select v-model=\"ruleList.state\" _v-2d9e6973=\"\">\n\t\t\t\t<option selected=\"\" _v-2d9e6973=\"\">全部</option>\n\t\t\t\t<option _v-2d9e6973=\"\">进行中</option>\n\t\t\t\t<option _v-2d9e6973=\"\">已过期</option>\n\t\t\t\t<option _v-2d9e6973=\"\">已停用</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div class=\"search-group ml30\" _v-2d9e6973=\"\">\n\t\t\t<input class=\"btn-default\" type=\"button\" value=\"查询\" @click=\"searchItem()\" _v-2d9e6973=\"\">\n\t\t\t<input class=\"btn-default\" type=\"button\" value=\"新增规则\" @click=\"addItem()\" _v-2d9e6973=\"\">\n\t\t</div>\n\t\t<table class=\"table-list\" _v-2d9e6973=\"\">\n\t\t\t<thead _v-2d9e6973=\"\">\n\t\t\t\t<tr _v-2d9e6973=\"\">\n\t\t\t\t\t<th _v-2d9e6973=\"\">\n\t\t\t\t\t\t规则名称\n\t\t\t\t\t\t<div class=\"opr-tips\" _v-2d9e6973=\"\">\n                     <span class=\"tips-icon\" _v-2d9e6973=\"\">?</span>\n                     <div class=\"opr-tips-content\" _v-2d9e6973=\"\">\n                        <dl class=\"tips-list\" _v-2d9e6973=\"\">\n                           <dd _v-2d9e6973=\"\">一个门店可配置多个红包规则，已发放红包金额最多的规则为准</dd>\n                        </dl>\n                     </div>\n                  </div>\n\t\t\t\t\t</th>\n\t\t\t\t\t<th _v-2d9e6973=\"\">有效时间</th>\n\t\t\t\t\t<th _v-2d9e6973=\"\">状态</th>\n\t\t\t\t\t<th _v-2d9e6973=\"\">操作</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody _v-2d9e6973=\"\">\n\t\t\t\t<tr v-for=\"item in tableInfo.data\" _v-2d9e6973=\"\">\n\t\t\t\t\t<td _v-2d9e6973=\"\">{{item.name}}</td>\n\t\t\t\t\t<td _v-2d9e6973=\"\">{{item.activityBeginDate}}~{{item.activityEndDate}}</td>\n\t\t\t\t\t<td _v-2d9e6973=\"\">{{item.state}}</td>\n\t\t\t\t\t<td _v-2d9e6973=\"\">\n\t\t\t\t\t\t<div class=\"operate-group\" _v-2d9e6973=\"\">\n\t\t\t\t\t\t\t<a href=\"javascript:;\" @click=\"editItem(item.id)\" _v-2d9e6973=\"\">编辑</a>\n\t\t\t\t\t\t\t<slot v-if=\"item.state==&quot;已过期&quot;||item.state==&quot;已停用&quot;||item.state==&quot;未开始&quot;\" _v-2d9e6973=\"\">\n\t\t\t\t\t\t\t\t<a href=\"javascript:;\" @click=\"deleteItem(item.id,1)\" _v-2d9e6973=\"\">启用</a>\n\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t\t<slot v-else=\"\" _v-2d9e6973=\"\">\n\t\t\t\t\t\t\t\t<a class=\"delete\" href=\"javascript:;\" @click=\"deleteItem(item.id,0)\" _v-2d9e6973=\"\">停用</a>\n\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div id=\"pageNav\" _v-2d9e6973=\"\"></div>\n\t</div>\n\t<item :iteminfo.sync=\"itemInfo\" _v-2d9e6973=\"\"></item>\n\t<delitem _v-2d9e6973=\"\"></delitem>\n";

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "\n<h2 class=\"page_header\">晒单红包</h2>\n<div class=\"tab\">\n   <a href=\"#\">数据统计</a>\n   <a href=\"#\" class=\"active\">规则配置</a>\n</div>\n<datalist></datalist>\n<tablelist></tablelist>\n";

/***/ },
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowN0IwRDk5MTRFRjQxMUU2ODk3NEYxMzE4OEVBQjg5NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowN0IwRDk5MjRFRjQxMUU2ODk3NEYxMzE4OEVBQjg5NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA3QjBEOThGNEVGNDExRTY4OTc0RjEzMTg4RUFCODk3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA3QjBEOTkwNEVGNDExRTY4OTc0RjEzMTg4RUFCODk3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++PV7aAAAAiZJREFUeNrsmDtLA0EUhSfBiOKzUFIGSTohio2NjaSRaGejff5AGmNpaWz0B2ithXYqNsFGsQuyoI1ZJGVI4zMKgnqu3IUYs+vsIzugc+BLkd2998zO7O7cGzFNU0iqH8yDWTAJxsAQH7sHt+ASnIIj8CQTNCJhIAUKYBn0SZp9BrugCCpOJ0YdjvWAdXAFci6SCz43x9cWOZYrA0lwwSPvFt5F165wrJSsgSlwzvMclCjWGcd2NEAuT0BcBK84x07ZGegF+2BUdE4U+4Bz/TCwBiZE55XmXN8M0KLLi/CUt6bCMrAKYm6jVKvVLzwoxjm/DAzwSyZsLVFuMpB1+ZIJSpQzSwYyQp0yUV6VqpSO8hOgSsku/AzKrHYvxxOJxG+hB6NCsegOPIARp5PsRmKNXGKkdnqgO2AqvAEmGTAUGjDIQEmhgRIZOOY9XNhqUG4y8Aj2FBigTeujtSumT+O1ly+iR72BcXBjvQdo67wZ4ui3KHm7HVEYT4TRbkdEegGLoN7B5HXO0bDbFdNUzIFaB5LXOHblt7qgDGYCng6DY5ZlKyNyOQ02eMX6We0bHKvitjZ85dKMHpft5nmTEK2nHb62wLE8V8fN5flCS3k+zMfuWsrzQ9nyvMvlLf1o4d3mf2np/oDuD+j+gO4P+OoP+JDuD+j+wB/rD7itqv9OfyAA6f6A7g+o7w9Yj+G6zwrIS8VUbP4c6/6A7g/o/sD/7Q98CjAAsibE1aov2sYAAAAASUVORK5CYII="

/***/ }
/******/ ]);