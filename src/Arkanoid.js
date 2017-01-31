define(function (require) {
    var Bootstrap = require('./Bootstrap');

    var HashMap = require('./Utility/HashMap');
    var GameField = require('./entity/DOMGameField');
    var Controller = require('./controller/KeyboardController');
    var View = require('./View/DOMView');

    var gameItems = Bootstrap();

    var spatialHash = new HashMap(GameField.WIDTH, GameField.HEIGHT);

    var DOMView = new View(new GameField(), gameItems, spatialHash); // TODO: Make sure that game field that is used in bootstrap and view are the same
    var Keyboard = new Controller(gameItems[0], DOMView);

});