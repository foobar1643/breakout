define(function() {
    var DOMGameField = function() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'arkanoid';
        this.canvas.width = DOMGameField.WIDTH; // Game field width in pixels
        this.canvas.height = DOMGameField.HEIGHT; // Game field height in pixels
    }

    DOMGameField.WIDTH = 800;
    DOMGameField.HEIGHT = 600;

    return DOMGameField;
});