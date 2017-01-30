define(['../Entity/DOMGameField'], function (GameField) {
    var CollisionDetection = function() {
        this.gameWidth = GameField.WIDTH;
        this.gameHeight = GameField.HEIGHT;
    }

    return CollisionDetection;
});