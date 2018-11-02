/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/keymaster/keymaster.js":
/*!*********************************************!*\
  !*** ./node_modules/keymaster/keymaster.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  };

  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  };

  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  };

  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0]
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
        key = keys[keys.length - 1];
      }

      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  };

  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all' };
  function getScope(){ return _scope || 'all' };

  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  };

  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  if(true) module.exports = assignKey;

})(this);


/***/ }),

/***/ "./src/bfs.js":
/*!********************!*\
  !*** ./src/bfs.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./src/renderer.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var BFS =
/*#__PURE__*/
function () {
  function BFS(matrix, frontier) {
    _classCallCheck(this, BFS);

    this.matrix = matrix;
    this.frontier = frontier;
    this.h = this.matrix.length;
    this.w = this.matrix[0].length;
    this.renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__["default"](this.matrix);
    this.step = 0;
    this.lastFrame = new Date();
  }

  _createClass(BFS, [{
    key: "flood",
    value: function flood() {
      var currentFrame = new Date();

      if (currentFrame - this.lastFrame > 50) {
        var newFrontier = [];

        if (this.frontier.length === 0 || this.matrix[0][this.w - 1] !== 'P') {
          this.createPath();
          return;
        }

        for (var i = 0; i < this.frontier.length; i++) {
          this.matrix[this.frontier[i][0]][this.frontier[i][1]] = parseInt(this.step);
          var steps = this.generateSteps(this.frontier[i]);

          for (var j = 0; j < steps.length; j++) {
            if (this.validMove(steps[j]) && this.matrix[steps[j][0]][steps[j][1]] === 'P') {
              newFrontier.push(steps[j]);
            }
          }
        }

        this.step += 1;
        this.frontier = newFrontier;
        this.lastFrame = currentFrame;
      }

      this.renderer.draw(this.step - 1);
      var nextFlood = this.flood.bind(this);
      requestAnimationFrame(nextFlood);
    }
  }, {
    key: "createPath",
    value: function createPath() {
      var currPoint = [0, this.w - 1];
      var currStep = this.matrix[currPoint[0]][currPoint[1]];
      this.matrix[currPoint[0]][currPoint[1]] = 'O';

      while (currStep != 0) {
        var steps = this.generateSteps(currPoint);

        for (var i = 0; i < steps.length; i++) {
          if (this.validMove(steps[i]) && this.matrix[steps[i][0]][steps[i][1]] === currStep - 1) {
            currStep--;
            currPoint = steps[i];
            this.matrix[currPoint[0]][currPoint[1]] = 'O';
            break;
          }
        }
      }

      this.renderer.draw();
    }
  }, {
    key: "generateSteps",
    value: function generateSteps(pos) {
      var _ref = [pos[0], pos[1]],
          y = _ref[0],
          x = _ref[1];
      return [[y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]];
    }
  }, {
    key: "validMove",
    value: function validMove(pos) {
      var _ref2 = [pos[0], pos[1]],
          y = _ref2[0],
          x = _ref2[1];
      return x >= 0 && x < this.w && y >= 0 && y < this.h;
    }
  }]);

  return BFS;
}();

/* harmony default export */ __webpack_exports__["default"] = (BFS);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! keymaster */ "./node_modules/keymaster/keymaster.js");
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(keymaster__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _maze__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maze */ "./src/maze.js");
/* harmony import */ var _bfs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bfs */ "./src/bfs.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderer */ "./src/renderer.js");
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timer */ "./src/timer.js");





var w = 99,
    h = 49;
var startPoint = [h - 1, 0];
var endPoint = [0, w - 1];
var currPos = [h - 1, 0];
var maze = new _maze__WEBPACK_IMPORTED_MODULE_1__["default"](h, w);
var timer = new _timer__WEBPACK_IMPORTED_MODULE_4__["default"](120000);
var renderer = new _renderer__WEBPACK_IMPORTED_MODULE_3__["default"](maze.matrix, currPos, timer);
var bfs = new _bfs__WEBPACK_IMPORTED_MODULE_2__["default"](maze.matrix, [startPoint]);
var gameOver = false;
maze.generateMaze();
renderer.draw();
timer.start();

function frame() {
  var currentFrame = new Date();

  if (currentFrame - lastFrame >= 50) {
    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('W') && currPos[0] - 1 >= 0 && maze.validMove([currPos[0] - 1, currPos[1]])) {
      currPos[0]--;
    }

    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('S') && currPos[0] + 1 < h && maze.validMove([currPos[0] + 1, currPos[1]])) {
      currPos[0]++;
    }

    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('A') && currPos[1] - 1 >= 0 && maze.validMove([currPos[0], currPos[1] - 1])) {
      currPos[1]--;
    }

    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('D') && currPos[1] + 1 < w && maze.validMove([currPos[0], currPos[1] + 1])) {
      currPos[1]++;
    }

    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('1')) bfs.flood();
    lastFrame = currentFrame;
  }

  renderer.draw();

  if (currPos[0] === endPoint[0] && currPos[1] === endPoint[1]) {
    console.log('win');
    gameOver = true;
  } else if (timer.time === 0) {
    console.log('game over');
    gameOver = true;
  }

  ;

  if (gameOver) {
    return;
  }

  requestAnimationFrame(frame);
}

var lastFrame = new Date();
requestAnimationFrame(frame);
var el1 = document.getElementById("newMaze");
var el2 = document.getElementById("pause");
if (el1.addEventListener) el1.addEventListener("click", reset, false);
if (el2.addEventListener) el2.addEventListener("click", pauseResume, false);

function reset() {
  maze.generateMaze();
  timer.restart();
}

function pauseResume() {
  if (timer.status()) timer.stop();else timer.start();
}

function startBFS() {
  bfs.flood();
  timer.stop();
}

/***/ }),

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Maze =
/*#__PURE__*/
function () {
  function Maze(h, w) {
    _classCallCheck(this, Maze);

    this.w = w;
    this.h = h;
    this.matrix = new Array(h);

    for (var i = 0; i < h; i++) {
      this.matrix[i] = new Array(w);
    }
  }

  _createClass(Maze, [{
    key: "resetMaze",
    value: function resetMaze() {
      for (var i = 0; i < this.h; i++) {
        for (var j = 0; j < this.w; j++) {
          this.matrix[i][j] = 'B';
        }
      }

      this.matrix[this.h - 1][0] = 'P';
    }
  }, {
    key: "generateMaze",
    value: function generateMaze() {
      var _ref = [this.h, this.w],
          h = _ref[0],
          w = _ref[1];
      this.resetMaze();
      var frontier = this.findFrontier(h - 1, 0);

      while (frontier.length > 0) {
        var selected_idx = this.getRandomInt(frontier.length);
        var selected = frontier[selected_idx];
        frontier.splice(selected_idx, 1);
        if (this.matrix[selected[0]][selected[1]] == 'P') continue;
        var newPath = this.connectFrontier(selected[0], selected[1]);

        if (newPath) {
          this.matrix[selected[0]][selected[1]] = 'P';
          this.matrix[newPath[0]][newPath[1]] = 'P';
          frontier = frontier.concat(this.findFrontier(selected[0], selected[1]));
        } else {
          continue;
        }
      }
    }
  }, {
    key: "findFrontier",
    value: function findFrontier(y, x) {
      var frontier = [];
      var _ref2 = [this.h, this.w],
          h = _ref2[0],
          w = _ref2[1];
      if (x + 2 < w) frontier.push([y, x + 2]);
      if (x - 2 >= 0) frontier.push([y, x - 2]);
      if (y + 2 < h) frontier.push([y + 2, x]);
      if (y - 2 >= 0) frontier.push([y - 2, x]);
      return frontier;
    }
  }, {
    key: "connectFrontier",
    value: function connectFrontier(y, x) {
      var frontier = [];
      var _ref3 = [this.h, this.w],
          h = _ref3[0],
          w = _ref3[1];

      if (x + 2 < w && this.matrix[y][x + 2] == 'P' && this.matrix[y][x + 1] == 'B') {
        frontier.push([y, x + 1]);
      }

      if (x - 2 >= 0 && this.matrix[y][x - 2] == 'P' && this.matrix[y][x - 1] == 'B') {
        frontier.push([y, x - 1]);
      }

      if (y + 2 < h && this.matrix[y + 2][x] == 'P' && this.matrix[y + 1][x] == 'B') {
        frontier.push([y + 1, x]);
      }

      if (y - 2 >= 0 && this.matrix[y - 2][x] == 'P' && this.matrix[y - 1][x] == 'B') {
        frontier.push([y - 1, x]);
      }

      if (frontier.length === 0) {
        return null;
      } else {
        return frontier[this.getRandomInt(frontier.length)];
      }
    }
  }, {
    key: "validMove",
    value: function validMove(pos) {
      var _ref4 = [pos[0], pos[1]],
          y = _ref4[0],
          x = _ref4[1];
      return this.matrix[y][x] === 'P';
    }
  }, {
    key: "getRandomInt",
    value: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }]);

  return Maze;
}();

/* harmony default export */ __webpack_exports__["default"] = (Maze);

/***/ }),

/***/ "./src/renderer.js":
/*!*************************!*\
  !*** ./src/renderer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./src/timer.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Renderer =
/*#__PURE__*/
function () {
  function Renderer(matrix, pos, timer) {
    _classCallCheck(this, Renderer);

    this.matrix = matrix;
    this.h = matrix.length;
    this.w = matrix[0].length;
    this.pos = pos;
    this.timer = timer;
  }

  _createClass(Renderer, [{
    key: "draw",
    value: function draw(num) {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      var timeLeft = 1;
      if (this.timer) timeLeft = this.timer.time / this.timer.startTime;
      ctx.beginPath();
      ctx.rect(100, 100, 990, 490);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.closePath();
      this.drawComponents(ctx, num);
      ctx.beginPath();
      ctx.rect(99, 600, 992, 40);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.rect(100, 601, 990 * timeLeft, 38);
      ;
      ctx.fillStyle = 'gray';
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "drawRect",
    value: function drawRect(ctx, x, y, color) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.rect(100 + x * 10, 100 + y * 10, 10, 10);
      ctx.fill();
      ctx.filter = "filter";
      ctx.closePath();
    }
  }, {
    key: "drawComponents",
    value: function drawComponents(ctx, num) {
      ctx.clearRect(100, 100, 990, 490);
      if (this.timer && !this.timer.status()) this.printMessages(ctx, 'PAUSED');else this.drawMaze(ctx, num);
    }
  }, {
    key: "drawMaze",
    value: function drawMaze(ctx, num) {
      var color;

      for (var i = 0; i < this.w; i++) {
        for (var j = 0; j < this.h; j++) {
          if (this.matrix[j][i] === 'B') color = 'black';else if (this.matrix[j][i] === 'P') color = 'white';else if (this.matrix[j][i] === 'O') color = 'yellow';else if (this.matrix[j][i] === num) color = '#afeeee';else color = '#98fb98';
          this.drawRect(ctx, i, j, color);
        }
      }

      if (this.pos) this.drawRect(ctx, this.pos[1], this.pos[0], 'red');
    }
  }, {
    key: "printMessages",
    value: function printMessages(ctx, message) {
      ctx.textBaseline = 'middle';
      ctx.textAlign = "center";
      ctx.font = 'bold 24px Roboto';
      ctx.fillText(message, 595, 345);
    }
  }]);

  return Renderer;
}();

/* harmony default export */ __webpack_exports__["default"] = (Renderer);

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timer =
/*#__PURE__*/
function () {
  function Timer(time) {
    _classCallCheck(this, Timer);

    this.startTime = time;
    this.time = time;
    this.timer = null;
  }

  _createClass(Timer, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.timer = setInterval(function () {
        _this.time -= 100;
      }, 100);
      setTimeout(function () {
        clearInterval(_this.timer);
      }, this.time);
    }
  }, {
    key: "restart",
    value: function restart() {
      this.time = this.startTime;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }, {
    key: "status",
    value: function status() {
      return !!this.timer;
    }
  }]);

  return Timer;
}();

/* harmony default export */ __webpack_exports__["default"] = (Timer);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map