define(function (require) {
    var Item = require('./entity/Item');
    var GameField = require('./entity/DOMGameField');
    var Platform = require('./entity/Platform');
    var Brick = require('./entity/Brick');
    var Ball = require('./entity/Ball');
    var Controller = require('./controller/KeyboardController');
    var View = require('./View/DOMView');

    var gamePlatform = new Platform(180, 20);
    var gameBall = new Ball();
    gameBall.stickToPlatform(gamePlatform);
    var gameItems = [gamePlatform, gameBall];

    // Populate game field with bricks
    var brickX = 0;
    var brickY = 0;

    for(var i = 0; i < 50; i++) {
        gameItems.push(new Brick(brickX, brickY));

        if(brickX + Brick.WIDTH >= GameField.WIDTH - Brick.WIDTH) {
            brickX = 0;
            brickY = brickY + Brick.HEIGHT + 3;
        } else {
            brickX = brickX + Brick.WIDTH + 3;
        }

    }

    var Keyboard = new Controller(gameItems[0]);
    var DOMView = new View(new GameField(), gameItems);

});