define(function (require) {
    var Bootstrap = require('./Bootstrap');

    var GameField = require('./entity/DOMGameField');
    var Controller = require('./controller/KeyboardController');
    var View = require('./View/DOMView');

    var gameItems = Bootstrap();

    var DOMView = new View(new GameField(), gameItems); // TODO: Make sure that game field that is used in bootstrap and view are the same
    var Keyboard = new Controller(gameItems[0], DOMView);

});