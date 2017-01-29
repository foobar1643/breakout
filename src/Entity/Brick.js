define(['./Item'], function(Item) {
    var Brick = function(x, y) {
        Item.call(this, x, y, Brick.WIDTH, Brick.HEIGHT, 'rgb(0, 255, 0)', 0);
    }

    Brick.prototype = Object.create(Item.prototype);

    Brick.WIDTH = 76;
    Brick.HEIGHT = 19;

    return Brick;
});