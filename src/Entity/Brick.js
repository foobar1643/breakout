define(['./Item'], function(Item) {
    var Brick = function(x, y) {
        Item.call(this, 'rectangle', x + 10, y + 5, Brick.WIDTH, Brick.HEIGHT, 'rgb(215, 25, 20)', 0, 0);
    }

    Brick.prototype = Object.create(Item.prototype);

    Brick.WIDTH = 75;
    Brick.HEIGHT = 20;

    return Brick;
});