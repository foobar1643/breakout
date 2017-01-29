define(['./Item', './DOMGameField'], function(Item, GameField) {
    var field = new GameField();

    var Platform = function(width, height) {
        var platformY = (field.height - (field.height - (field.height - height))) - height;
        var platformX = (field.width / 2) - (width / 2);
        Item.call(this, platformX, platformY, width, height, 'rgb(255, 255, 255)', 15);
    }

    Platform.prototype = Object.create(Item.prototype);

    return Platform;
});

