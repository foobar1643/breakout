define(function(require) {
    var Settings = require('./Settings');
    var Item = require('./entity/Item');
    var Platform = require('./entity/Platform');
    var Brick = require('./entity/Brick');
    var Ball = require('./entity/Ball');
    var PlatformProxy = require('./Proxy/PlatformMovementProxy');
    var BallProxy = require('./Proxy/BallMovementProxy');

    var ResourceLoader = function() {
        this.resetItems();
    }

    ResourceLoader.prototype.loadGame = function() {
        this.loadGameItems();
        this.loadField();
        return this.items;
    }

    ResourceLoader.prototype.resetItems = function() {
        this.items = [];
        this.proxies = [];
        this.batProxy = null;
        this.ballProxy = null;
    }

    ResourceLoader.prototype.loadGameItems = function() {
        var bat = new Platform(180, 20);
        var ball = new Ball();

        ball.stickToPlatform(bat);
        this.items.push(bat, ball);
        return this.items;
    }

    ResourceLoader.prototype.loadField = function() { // This will be a map loader in the future
        var brickX = 0;
        var brickY = 0;

        for(var i = 0; i < 50; i++) {
            this.items.push(new Brick(brickX, brickY));
            if(brickX + Brick.WIDTH >= Settings.SCREEN_WIDTH - Brick.WIDTH) {
                brickX = 0;
                brickY = brickY + Brick.HEIGHT + 3;
            } else {
                brickX = brickX + Brick.WIDTH + 3;
            }

        }
    }

    ResourceLoader.prototype.loadPlatformProxy = function(platform, hashMap) {
        //console.log(hashMap);
        return new PlatformProxy(platform, hashMap);
    }

    ResourceLoader.prototype.loadBallProxy = function(ball, hashMap) {
        return new BallProxy(ball, hashMap);
    }

    return ResourceLoader;
});