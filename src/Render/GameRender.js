define(['../Utility/HashMap', '../Settings'], function(HashMap, Settings) {

    var Render = function() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'arkanoid';
        this.canvas.width = Settings.SCREEN_WIDTH;
        this.canvas.height = Settings.SCREEN_HEIGHT;
        document.getElementById('game-container').appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
    }

    Render.HASHMAP_LINE_STYLE = 'blue';
    Render.HASHMAP_LINE_SIZE = 2;

    Render.prototype.prepareScreen = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.hashMap(); // Settings like this should be global
    }

    Render.prototype.renderItems = function(items) {
        for(var i = 0; i < items.length; i++) {
            this.renderItem(items[i]);
        }
    }

    Render.prototype.renderItem = function(item) {
        switch(item.type) { // Think about replacing this with associative array of functions
            case 'rectangle':
                return this.rectangle(item);
            case 'circle':
                return this.circle(item);
            default:
                throw new TypeError('Unsupported item type "' + item.type + '".');
        }
    }

    Render.prototype.hashMap = function() {
        if(Settings.DRAW_HASHMAP === true) {
            var x = 0, y = 0;
            // Think about optimizing this (can be done in one loop)
            for(var i = 0; i < Math.floor(this.canvas.height / HashMap.CELL_SIZE); i++) { // Rows
                this.line(Render.HASHMAP_LINE_SIZE, Render.HASHMAP_LINE_STYLE, [0, y], [this.canvas.width, y]);
                y = y + HashMap.CELL_SIZE;
            }

            for(var i = 0; i < Math.floor(this.canvas.width / HashMap.CELL_SIZE); i++) { // Cols
                this.line(Render.HASHMAP_LINE_SIZE, Render.HASHMAP_LINE_STYLE, [x, 0], [x, this.canvas.width]);
                x = x + HashMap.CELL_SIZE;
            }
        }
    }

    Render.prototype.line = function(size, style, from, to) { // 2, 'blue', [0, 0], [15, 15]
        this.context.beginPath();
        this.context.lineWidth = size;
        this.context.strokeStyle = style;
        this.context.moveTo(from[0], from[1]);
        this.context.lineTo(to[0], to[1]);
        this.context.stroke();
    }

    Render.prototype.rectangle = function(item) {
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = 2;
        this.context.strokeRect(item.x, item.y, item.width, item.height);

        this.context.fillStyle = item.color;
        this.context.fillRect(item.x, item.y, item.width, item.height);
    }

    Render.prototype.circle = function(item) {
        this.context.beginPath();
        this.context.arc(item.x, item.y, item.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = item.color;
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = '#000000';
        this.context.stroke();
    }

    return Render;
});