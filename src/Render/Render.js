/* @flow */
import Item from '../Entity/Item';

export default class Render {

    _canvas: HTMLCanvasElement;
    _context: any;

    _line(size: number, style: string, from: [number, number], to: [number, number]) {
        this._context.beginPath();
        this._context.lineWidth = size;
        this._context.strokeStyle = style;
        this._context.moveTo(from[0], from[1]);
        this._context.lineTo(to[0], to[1]);
        this._context.stroke();
    }

    _rectangle(item: Item, context: any) {
        if(item.stroke) {
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.strokeRect(item.x, item.y, item.width, item.height);
        }
        context.fillStyle = item.color;
        context.fillRect(item.x, item.y, item.width, item.height);
    }

    _circle(item: Item, context: any) {
        context.beginPath();
        context.arc(item.x, item.y, item.radius, 0, 2 * Math.PI, false);
        context.fillStyle = item.color;
        context.fill();

        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.stroke();
    }



    /*_hashMap(cellSize: number) {
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
    }*/

}