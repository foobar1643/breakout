import Item from './Item';

export default class Brick extends Item {

    constructor(x, y) {
        super('rectangle', 'red', [x, y], [75, 20], [0, 0]);
    }

}