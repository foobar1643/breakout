define(['./Item'], function(Item) {
    var Platform = function(x, y, width, height) {
        Item.call(this, x, y, width, height, 'rgb(255, 255, 255)', 15);
    }

    Platform.prototype = Object.create(Item.prototype);

    return Platform;
});

