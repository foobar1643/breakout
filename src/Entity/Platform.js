import Item from './Item';

export default class Platform extends Item {

    constructor(width, height) {
        let x = 1;
        let y = 1;
        super('rectangle', 'white', [x, y], [width, height], [10, 0]);
    }

}