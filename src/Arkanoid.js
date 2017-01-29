define(function (require) {
    var Item = require('./entity/Item');
    var GameField = require('./entity/DOMGameField');
    var Platform = require('./entity/Platform');
    var Brick = require('./entity/Brick');
    var Controller = require('./controller/KeyboardController');
    var View = require('./View/DOMView');

    var gameItems = [new Platform(100, 560, 180, 20)];

    // Populate game field with bricks
    var brickX = 5;
    var brickY = 5;

    for(var i = 0; i < 50; i++) {
        gameItems.push(new Brick(brickX, brickY));
        if(brickX + Brick.WIDTH >= Item.COLLISION_BOX_X - Brick.WIDTH) {
            brickX = 5;
            brickY = brickY + 20 + 3;
        } else {
            brickX = brickX + Brick.WIDTH + 3;
        }
    }

    var Keyboard = new Controller(gameItems[0]);
    var DOMView = new View(new GameField(), gameItems);

});