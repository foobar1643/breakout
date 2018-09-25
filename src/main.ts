import {Directions} from "./Engine/Entity/Directions";
import Item from "./Engine/Entity/Item";
import {Shapes} from "./Engine/Entity/Shapes";
import Canvas from "./Engine/Screen/Canvas";
import BreakoutRender from "./Game/Render/BreakoutRender";

window.onload = () => {
    const screenColor = {red: 255, green: 255, blue: 255};
    const screen = new Canvas(800, 600, screenColor);
    screen.showScreen("game-container");

    const platform = new Item(
        "red",
        Shapes.RECTANGLE,
        {x: 50, y: 50},
        {width: 220, height: 20},
        {horizontal: 0, vertical: 0},
        {horizontal: Directions.DOWN, vertical: Directions.LEFT},
    );

    const render = new BreakoutRender(screen);
    render.render([platform]);
};
