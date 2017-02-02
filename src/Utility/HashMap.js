define(['../Settings'], function(Settings) {
    var HashMap = function() { // TODO: Throw a type error if current game field is not dividable by given cell size
        this.hashmapCols = Settings.SCREEN_WIDTH / HashMap.CELL_SIZE;
        this.hashmapRows = Settings.SCREEN_HEIGHT / HashMap.CELL_SIZE;
        this.cellSize = HashMap.CELL_SIZE;

        // Optimization step, so we don't have to run a cleaning loop every update.
        // As a downside to this optimization, we can't dynamicly recreate hash
        // map if, for example, screen height or width changes.
        this.emptyBuckets = this.getCleanBuckets();

        // buckets[ROW][COL] = Object;
        this.buckets = this.emptyBuckets;
    }

    HashMap.CELL_SIZE = 50;

    HashMap.prototype.getCleanBuckets = function() {
        var buckets = [];
        // TODO: Think of a better way to create buckets (maybe with one loop?).
        for(var i = 0; i < this.hashmapRows; i++) {
            buckets[i] = [];
            for(var j = 0; j < this.hashmapCols; j++) {
                buckets[i][j] = [];
            }
        }
        return buckets;
    }

    HashMap.prototype.clearBuckets = function() {
        this.buckets = this.getCleanBuckets(); // TODO: Preserve clean buckets in separate variable
    }

    HashMap.prototype.addGameItems = function(gameItems) {
        for(var i = 0; i < gameItems.length; i++) {
            this.addObject(gameItems[i]);
        }
    }

    HashMap.prototype.addObject = function(object) {
        var hashIds = this.getHashIds(object); // Array of bucket IDs for this object

        for(var i = 0; i < hashIds.length; i++) {
            this.buckets[hashIds[i][0]][hashIds[i][1]].push(object);
        }
    }

    HashMap.prototype.getHashIds = function(object) { // Get hashes for both start and end position of an object
        var hashIds = [];

        var start = this.hash(object.y, object.x); // [row, col]
        var end = this.hash(object.y + object.height, object.x + object.width); // [row, col]
        for(var y = start[0]; y < end[0] + 1; y++) {
            for(var x = start[1]; x < end[1] + 1; x++) {
                hashIds.push([y, x]);
            }
        }
        return hashIds;
    }

    HashMap.prototype.getNearbyObjects = function(object) {// TODO: Refactor this
        var start = this.hash(object.y, object.x); // [row, col]
        var end = this.hash(object.y + object.height, object.x + object.width); // [row, col]

        var nearby = [];

        for(var y = start[0]; y < end[0] + 1; y++) {
            for(var x = start[1]; x < end[1] + 1; x++) {
                var selfLocation = this.buckets[y][x].indexOf(object);
                var spliced = Array.from(this.buckets[y][x]);
                spliced.splice(selfLocation, 1);

                for(var i = 0; i < spliced.length; i++) {
                    nearby.push(spliced[i]);

                }

            }
        }

        return nearby;

    }

    HashMap.prototype.hash = function(y, x) {
        return [Math.floor(y / HashMap.CELL_SIZE), Math.floor(x / HashMap.CELL_SIZE)];
    }

    return HashMap;
});