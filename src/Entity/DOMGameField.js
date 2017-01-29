define(function() {
    var DOMGameField = function() {
        this.width = 800;
        this.height = 600;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    return DOMGameField;
});