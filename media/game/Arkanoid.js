define('Entity/Item',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var DIRECTION_NONE = exports.DIRECTION_NONE = 'none';
    var DIRECTION_UP = exports.DIRECTION_UP = 'up';
    var DIRECTION_DOWN = exports.DIRECTION_DOWN = 'down';
    var DIRECTION_LEFT = exports.DIRECTION_LEFT = 'left';
    var DIRECTION_RIGHT = exports.DIRECTION_RIGHT = 'right';

    var Item = function () {
        _createClass(Item, [{
            key: 'color',
            get: function get() {
                return this._color;
            }
        }, {
            key: 'type',
            get: function get() {
                return this._type;
            }
        }, {
            key: 'x',
            get: function get() {
                return this._position[0];
            },
            set: function set(x) {
                this._position[0] = x;
            }
        }, {
            key: 'y',
            get: function get() {
                return this._position[1];
            },
            set: function set(y) {
                this._position[1] = y;
            }
        }, {
            key: 'width',
            get: function get() {
                return this._size[0];
            },
            set: function set(width) {
                this._size[0] = width;
            }
        }, {
            key: 'height',
            get: function get() {
                return this._size[1];
            },
            set: function set(height) {
                this._size[1] = height;
            }
        }, {
            key: 'hSpeed',
            get: function get() {
                return this._speed[0];
            },
            set: function set(speed) {
                this._speed[0] = speed;
            }
        }, {
            key: 'vSpeed',
            get: function get() {
                return this._speed[1];
            },
            set: function set(speed) {
                this._speed[1] = speed;
            }
        }, {
            key: 'hDirection',
            get: function get() {
                return this._direction[0];
            },
            set: function set(direction) {
                this._direction[0] = direction;
            }
        }, {
            key: 'vDirection',
            get: function get() {
                return this._direction[1];
            },
            set: function set(direction) {
                this._direction[1] = direction;
            }
        }, {
            key: 'stroke',
            get: function get() {
                return this._stroke;
            }
        }]);

        function Item(type, color, position, size, speed) {
            var stroke = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

            _classCallCheck(this, Item);

            this._type = type;
            this._color = color;
            this._position = position;
            this._size = size;
            this._speed = speed;
            this._direction = [DIRECTION_NONE, DIRECTION_NONE];
            this._stroke = stroke;
        }

        _createClass(Item, [{
            key: 'movingMathOperation',
            value: function movingMathOperation(direction) {
                switch (direction) {
                    case DIRECTION_UP:
                    case DIRECTION_LEFT:
                        return function (axis, speed) {
                            return axis - speed;
                        };
                    case DIRECTION_DOWN:
                    case DIRECTION_RIGHT:
                        return function (axis, speed) {
                            return axis + speed;
                        };
                    case DIRECTION_NONE:
                        return function (axis, speed) {
                            return axis;
                        };
                }
                throw new TypeError("Can't find math operation for direction " + direction); // ES6 Template Literals?
            }
        }, {
            key: 'getNextPosition',
            value: function getNextPosition() {
                var xMathOperation = this.movingMathOperation(this.hDirection);
                var yMathOperation = this.movingMathOperation(this.vDirection);
                return { "x": xMathOperation(this.x, this.hSpeed), "y": yMathOperation(this.y, this.vSpeed) };
            }
        }]);

        return Item;
    }();

    exports.default = Item;
});
define('Settings',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* Render settings */
  var SCREEN_WIDTH = exports.SCREEN_WIDTH = 800;
  var SCREEN_HEIGHT = exports.SCREEN_HEIGHT = 600;
  var MAX_FPS = exports.MAX_FPS = 60;

  /* Debug settings */
  var DRAW_HASHMAP = exports.DRAW_HASHMAP = true;
});
define('Utility/HashMap',['exports', '../Settings', '../Entity/Item'], function (exports, _Settings, _Item) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CELL_SIZE = undefined;

    var Settings = _interopRequireWildcard(_Settings);

    var _Item2 = _interopRequireDefault(_Item);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var CELL_SIZE = exports.CELL_SIZE = 50;

    var HashMap = function () {

        /**
         * constructor - description
         *
         * @return {type}  description
         */
        function HashMap() {
            _classCallCheck(this, HashMap);

            this._rows = Settings.SCREEN_HEIGHT / CELL_SIZE + 1;
            this._cols = Settings.SCREEN_WIDTH / CELL_SIZE + 1;
            this._validateCellSize();
            this._buckets = this._generateCleanBuckets();
            /*this._generateCleanBuckets();
            this.clearBuckets();*/
        }

        /**
         * _validateCellSize - description
         *
         * @todo Calculate and suggest optimal cell size if an error is thrown
         *
         * @return {type}  description
         */


        _createClass(HashMap, [{
            key: '_validateCellSize',
            value: function _validateCellSize() {

                if (!Number.isInteger(this._rows) || !Number.isInteger(this._cols)) {
                    throw new RangeError('Hash map cell size is invalid for current game field size.');
                }
                return true;
            }
        }, {
            key: '_generateCleanBuckets',
            value: function _generateCleanBuckets() {
                var _this = this;

                return Array.from({ length: this._rows }, function () {
                    return Array.from({ length: _this._cols }, function () {
                        return [];
                    });
                });
            }
        }, {
            key: '_hashItem',
            value: function _hashItem(item) {
                var start = this.hash(item.x, item.y);
                var end = this.hash(item.x + item.width, item.y + item.height);

                return { "start": start, "end": end };
            }
        }, {
            key: '_getBucketIds',
            value: function _getBucketIds(item) {
                var hash = this._hashItem(item);
                var buckets = [];
                for (var y = hash["start"]["y"]; y < hash["end"]["y"] + 1; y++) {
                    for (var x = hash["start"]["x"]; x < hash["end"]["x"] + 1; x++) {
                        buckets.push({ "x": x, "y": y });
                    }
                }
                return buckets;
            }
        }, {
            key: 'clearBuckets',
            value: function clearBuckets() {
                this._buckets = this._generateCleanBuckets();
            }
        }, {
            key: 'addItems',
            value: function addItems(items) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        this.addItem(item);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: 'addItem',
            value: function addItem(item) {
                var buckets = this._getBucketIds(item);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = buckets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var bucket = _step2.value;

                        this._buckets[bucket.y][bucket.x].push(item);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }, {
            key: 'getNearbyItems',
            value: function getNearbyItems(item) {
                var buckets = this._getBucketIds(item);
                var nearby = [];
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = buckets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var bucket = _step3.value;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = this._buckets[bucket.y][bucket.x][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var storedItem = _step4.value;

                                if (item !== storedItem && nearby.indexOf(storedItem) === -1) {
                                    nearby.push(storedItem);
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return nearby;
            }
        }, {
            key: 'hash',
            value: function hash(x, y) {
                return { "x": Math.floor(x / CELL_SIZE), "y": Math.floor(y / CELL_SIZE) };
            }
        }]);

        return HashMap;
    }();

    exports.default = HashMap;
});
define('Render/Render',['exports', '../Entity/Item'], function (exports, _Item) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Item2 = _interopRequireDefault(_Item);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Render = function () {
        function Render() {
            _classCallCheck(this, Render);
        }

        _createClass(Render, [{
            key: '_line',
            value: function _line(size, style, from, to) {
                this._context.beginPath();
                this._context.lineWidth = size;
                this._context.strokeStyle = style;
                this._context.moveTo(from[0], from[1]);
                this._context.lineTo(to[0], to[1]);
                this._context.stroke();
            }
        }, {
            key: '_rectangle',
            value: function _rectangle(item, context) {
                if (item.stroke) {
                    context.strokeStyle = 'black';
                    context.lineWidth = 2;
                    context.strokeRect(item.x, item.y, item.width, item.height);
                }
                context.fillStyle = item.color;
                context.fillRect(item.x, item.y, item.width, item.height);
            }
        }, {
            key: '_circle',
            value: function _circle(item, context) {
                context.beginPath();
                context.arc(item.x, item.y, item.radius, 0, 2 * Math.PI, false);
                context.fillStyle = item.color;
                context.fill();

                context.strokeStyle = 'black';
                context.lineWidth = 1;
                context.stroke();
            }
        }]);

        return Render;
    }();

    exports.default = Render;
});
define('Render/GameRender',['exports', '../Settings', '../Entity/Item', '../Utility/HashMap', './Render'], function (exports, _Settings, _Item, _HashMap, _Render2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var Settings = _interopRequireWildcard(_Settings);

    var _Item2 = _interopRequireDefault(_Item);

    var _Render3 = _interopRequireDefault(_Render2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var HASHMAP_LINE_STYLE = 'blue';
    var HASHMAP_LINE_SIZE = 1;

    var GameRender = function (_Render) {
        _inherits(GameRender, _Render);

        function GameRender() {
            _classCallCheck(this, GameRender);

            var _this = _possibleConstructorReturn(this, (GameRender.__proto__ || Object.getPrototypeOf(GameRender)).call(this));

            _this._canvas = document.createElement('canvas');
            _this._context = _this._canvas.getContext('2d');
            _this._canvas.width = Settings.SCREEN_WIDTH;
            _this._canvas.height = Settings.SCREEN_HEIGHT;
            _this._appendCanvas();
            return _this;
        }

        _createClass(GameRender, [{
            key: '_appendCanvas',
            value: function _appendCanvas() {
                var gameContainer = document.getElementById('game-container');
                if (gameContainer != null) {
                    gameContainer.appendChild(this._canvas);
                    return;
                }
                throw new ReferenceError('Could not find parent element for game canvas.');
            }
        }, {
            key: '_determineRenderFunction',
            value: function _determineRenderFunction(item) {
                var renderTypes = {
                    'rectangle': _get(GameRender.prototype.__proto__ || Object.getPrototypeOf(GameRender.prototype), '_rectangle', this),
                    'circle': _get(GameRender.prototype.__proto__ || Object.getPrototypeOf(GameRender.prototype), '_circle', this)
                };

                if (renderTypes[item.type] == "undefined") {
                    throw new TypeError("Could not find a render function for given item type.");
                }

                return renderTypes[item.type];
            }
        }, {
            key: '_hashMapGrid',
            value: function _hashMapGrid() {
                if (Settings.DRAW_HASHMAP === true) {
                    var x = 0,
                        y = 0;
                    // TODO Think about optimizing this (can be done in one loop)
                    for (var i = 0; i < Math.floor(this._canvas.height / _HashMap.CELL_SIZE) + 1; i++) {
                        // Rows
                        _get(GameRender.prototype.__proto__ || Object.getPrototypeOf(GameRender.prototype), '_line', this).call(this, HASHMAP_LINE_SIZE, HASHMAP_LINE_STYLE, [0, y], [this._canvas.width, y]);
                        y = y + _HashMap.CELL_SIZE;
                    }

                    for (var _i = 0; _i < Math.floor(this._canvas.width / _HashMap.CELL_SIZE) + 1; _i++) {
                        // Cols
                        _get(GameRender.prototype.__proto__ || Object.getPrototypeOf(GameRender.prototype), '_line', this).call(this, HASHMAP_LINE_SIZE, HASHMAP_LINE_STYLE, [x, 0], [x, this._canvas.width]);
                        x = x + _HashMap.CELL_SIZE;
                    }
                }
            }
        }, {
            key: 'prepareScreen',
            value: function prepareScreen() {
                this._context.fillStyle = 'rgb(255, 255, 255)';
                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
                this._hashMapGrid();
            }
        }, {
            key: 'renderItems',
            value: function renderItems(items) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        var renderFunction = this._determineRenderFunction(item);
                        renderFunction(item, this._context); // Find an ES6 way to bind a context
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }]);

        return GameRender;
    }(_Render3.default);

    exports.default = GameRender;
});
define('Entity/Ball',['exports', './Item', './Platform', '../Settings', '../Entity/Item'], function (exports, _Item2, _Platform, _Settings, _Item4) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.STATE_FREE = exports.STATE_STICKED = exports.STATE_PAUSED = undefined;

    var _Item3 = _interopRequireDefault(_Item2);

    var _Platform2 = _interopRequireDefault(_Platform);

    var Settings = _interopRequireWildcard(_Settings);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var STATE_PAUSED = exports.STATE_PAUSED = 'paused';
    var STATE_STICKED = exports.STATE_STICKED = 'sticked';
    var STATE_FREE = exports.STATE_FREE = 'free';

    var H_SPEED = 1.2;
    var V_SPEED = 2;

    var Ball = function (_Item) {
        _inherits(Ball, _Item);

        _createClass(Ball, [{
            key: 'radius',
            get: function get() {
                return this._radius;
            }
        }, {
            key: 'state',
            get: function get() {
                return this._state;
            }
        }]);

        function Ball() {
            _classCallCheck(this, Ball);

            var radius = 7;

            var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, 'circle', 'green', [0, 0], [radius, radius], [H_SPEED, V_SPEED]));

            _this._radius = radius;
            _this._state = STATE_PAUSED;
            return _this;
        }

        _createClass(Ball, [{
            key: 'bindToPlatform',
            value: function bindToPlatform(platform) {
                this.hSpeed = platform.hSpeed;
                this._state = STATE_STICKED;
                this.x = platform.x + platform.width / 2;
                this.y = platform.y - platform.height / 2;
                platform.bindBall(this);
            }
        }, {
            key: 'unbind',
            value: function unbind() {
                this.hDirection = this.determineHorizontalDirection();
                this.vDirection = _Item4.DIRECTION_UP;
                this.hSpeed = H_SPEED;
                this.vSpeed = V_SPEED;
                this._state = STATE_FREE;
            }
        }, {
            key: 'determineHorizontalDirection',
            value: function determineHorizontalDirection() {
                return this.x <= Settings.SCREEN_WIDTH / 2 ? _Item4.DIRECTION_RIGHT : _Item4.DIRECTION_LEFT;
            }
        }, {
            key: 'flipHorizontalDirection',
            value: function flipHorizontalDirection() {
                this.hDirection = this.hDirection == _Item4.DIRECTION_LEFT ? _Item4.DIRECTION_RIGHT : _Item4.DIRECTION_LEFT;
            }
        }, {
            key: 'flipVerticalDirection',
            value: function flipVerticalDirection() {
                this.vDirection = this.vDirection == _Item4.DIRECTION_UP ? _Item4.DIRECTION_DOWN : _Item4.DIRECTION_UP;
            }
        }]);

        return Ball;
    }(_Item3.default);

    exports.default = Ball;
});
define('Entity/Platform',['exports', './Item', './Ball', '../Settings'], function (exports, _Item2, _Ball, _Settings) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Item3 = _interopRequireDefault(_Item2);

    var _Ball2 = _interopRequireDefault(_Ball);

    var Settings = _interopRequireWildcard(_Settings);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Platform = function (_Item) {
        _inherits(Platform, _Item);

        function Platform(width, height) {
            _classCallCheck(this, Platform);

            var x = Settings.SCREEN_WIDTH / 2 - width / 2;
            var y = Settings.SCREEN_HEIGHT - height - 15;

            var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, 'rectangle', 'white', [x, y], [width, height], [1, 2]));

            _this._ball = null;
            return _this;
        }

        _createClass(Platform, [{
            key: 'bindBall',
            value: function bindBall(ball) {
                this._ball = ball;
            }
        }, {
            key: 'releaseBall',
            value: function releaseBall() {
                if (this.ballBound()) {
                    this._ball.unbind();
                    this._ball = null;
                }
            }
        }, {
            key: 'ballBound',
            value: function ballBound() {
                return this._ball !== null;
            }
        }]);

        return Platform;
    }(_Item3.default);

    exports.default = Platform;
});
define('Entity/Brick',['exports', './Item'], function (exports, _Item2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Item3 = _interopRequireDefault(_Item2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Brick = function (_Item) {
        _inherits(Brick, _Item);

        function Brick(x, y) {
            _classCallCheck(this, Brick);

            return _possibleConstructorReturn(this, (Brick.__proto__ || Object.getPrototypeOf(Brick)).call(this, 'rectangle', 'red', [x, y], [75, 20], [0, 0]));
        }

        return Brick;
    }(_Item3.default);

    exports.default = Brick;
});
define('Proxy/Proxy',['exports', '../Entity/Item'], function (exports, _Item) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Item2 = _interopRequireDefault(_Item);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Proxy = function () {
        function Proxy(object) {
            _classCallCheck(this, Proxy);

            this._object = object;
        }

        _createClass(Proxy, [{
            key: 'move',
            value: function move(position) {
                this._object.x = position.x;
                this._object.y = position.y;
            }
        }, {
            key: 'setDirections',
            value: function setDirections(horizontal, vertical) {
                this._object.hDirection = horizontal;
                this._object.vDirection = vertical;
            }
        }]);

        return Proxy;
    }();

    exports.default = Proxy;
});
define('Collision/CollisionManager',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var CollisionManager = function () {
        function CollisionManager(object, hashMap) {
            _classCallCheck(this, CollisionManager);

            this._object = object;
            this._hashMap = hashMap;
        }

        _createClass(CollisionManager, [{
            key: '_collides',
            value: function _collides(position, item) {
                return position.x >= item.x - this._object.width && position.x <= item.x + item.width && position.y >= item.y && position.y <= item.y + item.height;
            }
        }, {
            key: '_collidesV',
            value: function _collidesV(position, item) {
                return position.y >= item.y - this._object.height && position.y <= item.y + item.height + this._object.height && position.x >= item.x && position.x <= item.x + item.width;
            }
        }, {
            key: 'collision',
            value: function collision(position) {
                var nearby = this._hashMap.getNearbyItems(this._object);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = nearby[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        switch (true) {// TODO: Think about refactoring this into something more readable
                            case this._collidesV(position, item):
                                return 'vertical';
                            case this._collides(position, item):
                                return 'horizontal';
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return false;
            }
        }]);

        return CollisionManager;
    }();

    exports.default = CollisionManager;
});
define('Collision/BallCollisionManager',['exports', './CollisionManager'], function (exports, _CollisionManager2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _CollisionManager3 = _interopRequireDefault(_CollisionManager2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var BallCollisionManager = function (_CollisionManager) {
        _inherits(BallCollisionManager, _CollisionManager);

        function BallCollisionManager(ball, hashMap) {
            _classCallCheck(this, BallCollisionManager);

            var _this = _possibleConstructorReturn(this, (BallCollisionManager.__proto__ || Object.getPrototypeOf(BallCollisionManager)).call(this, ball, hashMap));

            _this._ball = ball;
            return _this;
        }

        _createClass(BallCollisionManager, [{
            key: '_collides',
            value: function _collides(position, item) {
                return position.x >= item.x - this._ball.width - 1 && position.x <= item.x + item.width + this._ball.width + 1 && position.y >= item.y && position.y <= item.y + item.height;
            }
        }, {
            key: '_collidesV',
            value: function _collidesV(position, item) {
                return position.y >= item.y - this._ball.height && position.y <= item.y + item.height + this._ball.height && position.x >= item.x - this._ball.width && position.x <= item.x + item.width + this._ball.width;
            }
        }]);

        return BallCollisionManager;
    }(_CollisionManager3.default);

    exports.default = BallCollisionManager;
});
define('Proxy/ProxyBall',['exports', './Proxy', '../Entity/Ball', '../Collision/BallCollisionManager'], function (exports, _Proxy2, _Ball, _BallCollisionManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Proxy3 = _interopRequireDefault(_Proxy2);

    var _Ball2 = _interopRequireDefault(_Ball);

    var _BallCollisionManager2 = _interopRequireDefault(_BallCollisionManager);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ProxyBall = function (_Proxy) {
        _inherits(ProxyBall, _Proxy);

        function ProxyBall(ball, map) {
            _classCallCheck(this, ProxyBall);

            var _this = _possibleConstructorReturn(this, (ProxyBall.__proto__ || Object.getPrototypeOf(ProxyBall)).call(this, ball));

            _this._ball = ball;
            _this._hashMap = map;
            _this._detector = new _BallCollisionManager2.default(_this._ball, _this._hashMap);
            return _this;
        }

        _createClass(ProxyBall, [{
            key: 'move',
            value: function move() {
                console.log('move called');
                var position = this._ball.getNextPosition();
                _get(ProxyBall.prototype.__proto__ || Object.getPrototypeOf(ProxyBall.prototype), 'move', this).call(this, position);
            }
        }, {
            key: 'freeStateMove',
            value: function freeStateMove() {
                if (this._ball.state === _Ball.STATE_FREE) {
                    var position = this._ball.getNextPosition();
                    var collision = this._detector.collision(position);
                    if (collision !== false) {
                        switch (collision) {
                            case 'vertical':
                                return this._ball.flipVerticalDirection();
                            case 'horizontal':
                                return this._ball.flipHorizontalDirection();
                        }
                        throw new TypeError('undefined collision type');
                    }

                    _get(ProxyBall.prototype.__proto__ || Object.getPrototypeOf(ProxyBall.prototype), 'move', this).call(this, position);
                }
            }
        }]);

        return ProxyBall;
    }(_Proxy3.default);

    exports.default = ProxyBall;
});
define('Proxy/ProxyPlatform',['exports', './Proxy', './ProxyBall', '../Entity/Platform', '../Collision/CollisionManager'], function (exports, _Proxy2, _ProxyBall, _Platform, _CollisionManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Proxy3 = _interopRequireDefault(_Proxy2);

    var _ProxyBall2 = _interopRequireDefault(_ProxyBall);

    var _Platform2 = _interopRequireDefault(_Platform);

    var _CollisionManager2 = _interopRequireDefault(_CollisionManager);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ProxyPlatform = function (_Proxy) {
        _inherits(ProxyPlatform, _Proxy);

        function ProxyPlatform(platform, proxyBall, map) {
            _classCallCheck(this, ProxyPlatform);

            var _this = _possibleConstructorReturn(this, (ProxyPlatform.__proto__ || Object.getPrototypeOf(ProxyPlatform)).call(this, platform));

            _this._platform = platform;
            _this._proxyBall = proxyBall;
            _this._hashMap = map;
            _this._detector = new _CollisionManager2.default(_this._platform, _this._hashMap);
            return _this;
        }

        _createClass(ProxyPlatform, [{
            key: 'move',
            value: function move() {
                var position = this._object.getNextPosition();
                var collision = this._detector.collision(position);
                if (collision !== false) {
                    return;
                }

                _get(ProxyPlatform.prototype.__proto__ || Object.getPrototypeOf(ProxyPlatform.prototype), 'move', this).call(this, position);

                if (this._platform.ballBound()) {
                    this._proxyBall.move();
                }
            }
        }, {
            key: 'unbindBall',
            value: function unbindBall() {
                this._platform.releaseBall();
            }
        }, {
            key: 'setDirections',
            value: function setDirections(horizontal, vertical) {
                _get(ProxyPlatform.prototype.__proto__ || Object.getPrototypeOf(ProxyPlatform.prototype), 'setDirections', this).call(this, horizontal, vertical);
                if (this._platform.ballBound()) {
                    this._proxyBall.setDirections(horizontal, vertical);
                }
            }
        }]);

        return ProxyPlatform;
    }(_Proxy3.default);

    exports.default = ProxyPlatform;
});
define('Loader/ResourceLoader',['exports', '../Settings', '../Entity/Item', '../Entity/Platform', '../Entity/Ball', '../Entity/Brick', '../Proxy/ProxyBall', '../Proxy/ProxyPlatform', '../Utility/HashMap'], function (exports, _Settings, _Item, _Platform, _Ball, _Brick, _ProxyBall, _ProxyPlatform, _HashMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var Settings = _interopRequireWildcard(_Settings);

    var _Item2 = _interopRequireDefault(_Item);

    var _Platform2 = _interopRequireDefault(_Platform);

    var _Ball2 = _interopRequireDefault(_Ball);

    var _Brick2 = _interopRequireDefault(_Brick);

    var _ProxyBall2 = _interopRequireDefault(_ProxyBall);

    var _ProxyPlatform2 = _interopRequireDefault(_ProxyPlatform);

    var _HashMap2 = _interopRequireDefault(_HashMap);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ResourceLoader = function () {
        // Store items in associative array (object)
        function ResourceLoader() {
            _classCallCheck(this, ResourceLoader);

            this._items = [];
        } // This should be proxies only


        _createClass(ResourceLoader, [{
            key: '_loadItems',
            value: function _loadItems() {
                var platform = new _Platform2.default(180, 20);
                var ball = new _Ball2.default();
                ball.bindToPlatform(platform);
                this._items.push(platform, ball);
                this._loadGameField();
                this._loadFieldCollision();
            }
        }, {
            key: '_loadGameField',
            value: function _loadGameField() {
                var brickX = 10;
                var brickY = 5;

                for (var i = 0; i < 50; i++) {
                    this._items.push(new _Brick2.default(brickX, brickY));
                    if (brickX + 75 >= Settings.SCREEN_WIDTH - 75) {
                        brickX = 10;
                        brickY = brickY + 20 + 3;
                    } else {
                        brickX = brickX + 75 + 3;
                    }
                }
            }
        }, {
            key: '_loadFieldCollision',
            value: function _loadFieldCollision() {
                var up = new _Item2.default('rectangle', 'red', [0, 0], [Settings.SCREEN_WIDTH, 1], [0, 0], false);
                var down = new _Item2.default('rectangle', 'red', [1, Settings.SCREEN_HEIGHT - 1], [Settings.SCREEN_WIDTH, 1], [0, 0], false);
                var left = new _Item2.default('rectangle', 'red', [0, 0], [1, Settings.SCREEN_HEIGHT], [0, 0], false);
                var right = new _Item2.default('rectangle', 'red', [Settings.SCREEN_WIDTH - 1, 0], [1, Settings.SCREEN_HEIGHT], [0, 0], false);
                this._items.push(up, down, left, right);
            }
        }, {
            key: 'itemsLoaded',
            value: function itemsLoaded() {
                return this._items.length !== 0;
            }
        }, {
            key: 'reloadItems',
            value: function reloadItems() {}
        }, {
            key: 'hashMapLoaded',
            value: function hashMapLoaded() {
                return this._hashMap !== undefined;
            }
        }, {
            key: 'loadHashMap',
            value: function loadHashMap() {
                if (this.itemsLoaded() === false) {
                    throw new ReferenceError('Could not load hash map, load the items first.');
                }

                this._hashMap = new _HashMap2.default();
                this._hashMap.addItems(this._items);
                return this._hashMap;
            }
        }, {
            key: 'getItems',
            value: function getItems() {
                if (this.itemsLoaded() === false) {
                    this._loadItems();
                }

                return this._items;
            }
        }, {
            key: '_loadProxyBall',
            value: function _loadProxyBall() {
                if (this._proxyBall === undefined) {
                    console.log('created proxy ball');
                    this._proxyBall = new _ProxyBall2.default(this._items[1], this._hashMap);
                }
                return this._proxyBall;
            }
        }, {
            key: 'getActiveItems',
            value: function getActiveItems() {
                if (this.itemsLoaded() === false) {
                    throw new ReferenceError('Could not get active items, load the items frist.');
                }
                return [this._loadProxyBall()];
            }
        }, {
            key: 'getPlatformProxy',
            value: function getPlatformProxy() {
                if (this.itemsLoaded() === false && this.hashMapLoaded()) {
                    throw new ReferenceError('Could not load platform movement proxy, platform entity and hash map should be loaded first.');
                }

                if (this._platformProxy !== undefined) {
                    return this._platformProxy;
                }

                var ballProxy = this._loadProxyBall();
                this._platformProxy = new _ProxyPlatform2.default(this._items[0], ballProxy, this._hashMap);
                return this._platformProxy;
            }
        }]);

        return ResourceLoader;
    }();

    exports.default = ResourceLoader;
});
define('Controller/Keyboard',['exports', '../Proxy/ProxyPlatform', '../Entity/Item'], function (exports, _ProxyPlatform, _Item) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ProxyPlatform2 = _interopRequireDefault(_ProxyPlatform);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var KeyboardController = function () {
        function KeyboardController(game, proxy) {
            _classCallCheck(this, KeyboardController);

            this._proxy = proxy;
            this._game = game;

            window.addEventListener('keydown', this.keyDownEvent.bind(this));
        }

        _createClass(KeyboardController, [{
            key: 'keyDownEvent',
            value: function keyDownEvent(event) {
                switch (event.keyCode) {
                    case 80:
                        // P
                        this._game.togglePause();
                        break;
                    case 81:
                        // Q
                        if (this._game.paused()) {
                            this._game.stepAnimation();
                        }
                        break;

                    case 87: // W
                    case 65: // A
                    case 83: // S
                    case 68: // D
                    case 32:
                        // Space
                        if (!this._game.paused()) {
                            this._moveProxy(event.keyCode);
                        }
                        break;
                }
            }
        }, {
            key: '_moveProxy',
            value: function _moveProxy(keyCode) {
                switch (keyCode) {
                    case 68:
                        // D
                        this._proxy.setDirections(_Item.DIRECTION_RIGHT, _Item.DIRECTION_NONE);
                        this._proxy.move();
                        break;
                    case 65:
                        // A
                        this._proxy.setDirections(_Item.DIRECTION_LEFT, _Item.DIRECTION_NONE);
                        this._proxy.move();
                        break;
                    case 87:
                        // W
                        this._proxy.setDirections(_Item.DIRECTION_NONE, _Item.DIRECTION_UP);
                        this._proxy.move();
                        break;
                    case 83:
                        // S
                        this._proxy.setDirections(_Item.DIRECTION_NONE, _Item.DIRECTION_DOWN);
                        this._proxy.move();
                        break;
                    case 32:
                        // Space
                        this._proxy.unbindBall();
                        break;
                }
            }
        }]);

        return KeyboardController;
    }();

    exports.default = KeyboardController;
});
define('Game',['./Entity/Item', './Settings', './Render/GameRender', './Utility/HashMap', './Loader/ResourceLoader', './Controller/Keyboard'], function (_Item, _Settings, _GameRender, _HashMap, _ResourceLoader, _Keyboard) {
    'use strict';

    var _Item2 = _interopRequireDefault(_Item);

    var Settings = _interopRequireWildcard(_Settings);

    var _GameRender2 = _interopRequireDefault(_GameRender);

    var _HashMap2 = _interopRequireDefault(_HashMap);

    var _ResourceLoader2 = _interopRequireDefault(_ResourceLoader);

    var _Keyboard2 = _interopRequireDefault(_Keyboard);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var GAME_GOING = 'going';
    var GAME_PAUSED = 'paused';

    var Game = function () {
        function Game() {
            _classCallCheck(this, Game);

            this._loader = new _ResourceLoader2.default();
            this._render = new _GameRender2.default();
            this._items = this._loader.getItems();
            this._hashMap = this._loader.loadHashMap();
            this._active = this._loader.getActiveItems();
            this._keyboard = new _Keyboard2.default(this, this._loader.getPlatformProxy());
            this._gameState = GAME_GOING;
            window.requestAnimationFrame(this.gameLoop.bind(this));
        }

        _createClass(Game, [{
            key: 'gameLoop',
            value: function gameLoop(time) {
                if (this._gameState === GAME_GOING) {
                    // Clear every bucket in the spatial hash map
                    this._hashMap.clearBuckets();
                    // Add game items to the spatial hash map
                    this._hashMap.addItems(this._items);
                    // Move items
                    this.moveActive();
                    // Prepare the screen for rendering game items
                    this._render.prepareScreen();
                    // Render game items on the screen
                    this._render.renderItems(this._items);
                }

                // Iterate game loop
                if (time < this._frameMs + 1000 / Settings.MAX_FPS) {
                    window.requestAnimationFrame(this.gameLoop.bind(this));
                    return;
                }

                this._frameMs = time;
                window.requestAnimationFrame(this.gameLoop.bind(this));
            }
        }, {
            key: 'moveActive',
            value: function moveActive() {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._active[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var proxy = _step.value;

                        proxy.freeStateMove();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: 'stepAnimation',
            value: function stepAnimation() {
                window.requestAnimationFrame(this.gameLoop.bind(this));
            }
        }, {
            key: 'togglePause',
            value: function togglePause() {
                this._gameState = this._gameState === GAME_PAUSED ? GAME_GOING : GAME_PAUSED;
            }
        }, {
            key: 'paused',
            value: function paused() {
                return this._gameState === GAME_PAUSED;
            }
        }]);

        return Game;
    }();

    new Game();
});
