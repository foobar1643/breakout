define(['../Settings'], function (Settings) {
    var CollisionManager = function() {
        this.gameWidth = Settings.SCREEN_WIDTH;
        this.gameHeight = Settings.SCREEN_HEIGHT;
    }

    return CollisionManager;
});