import {Container} from "inversify";
import "reflect-metadata";
import * as Config from "./config";
import Canvas from "./Engine/Screen/Canvas";
import GameLoop from "./Game/GameLoop";
import BreakoutRender from "./Game/Render/BreakoutRender";
import {TYPES} from "./types";

const container = new Container();
container.bind(TYPES.GameLoop).to(GameLoop);
container.bind(TYPES.Canvas).to(Canvas);
container.bind(TYPES.Render).to(BreakoutRender);
container.bind(TYPES.ScreenColor).toConstantValue(Config.SCREEN_COLOR);
container.bind(TYPES.ScreenHeight).toConstantValue(Config.SCREEN_HEIGHT);
container.bind(TYPES.ScreenWidth).toConstantValue(Config.SCREEN_WIDTH);
container.bind(TYPES.ScreenParent).toConstantValue(Config.SCREEN_PARENT);

export {container};
