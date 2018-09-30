import * as EventEmitter from "eventemitter3";
import {Container, decorate, injectable} from "inversify";
import "reflect-metadata";
import SpatialHashMap from "./Collision/SpatialHashMap";
import * as Config from "./config";
import GameLoop from "./Game/GameLoop";
import {Keyboard} from "./Input/Keyboard";
import LevelLoader from "./Level/LevelLoader";
import MovementManager from "./Movement/MovementManager";
import BreakoutRender from "./Render/BreakoutRender";
import Canvas from "./Screen/Canvas";
import {TYPES} from "./types";

decorate(injectable(), EventEmitter);

const container = new Container();
// Regular dependencies
container.bind(TYPES.GameLoop).to(GameLoop);
container.bind(TYPES.Canvas).to(Canvas);
container.bind(TYPES.Movement).to(MovementManager);
container.bind(TYPES.Render).to(BreakoutRender);
container.bind(TYPES.Loader).to(LevelLoader);
container.bind(TYPES.Keyboard).to(Keyboard);
// Singleton-scoped dependencies
container.bind(TYPES.SpatialHashMap).to(SpatialHashMap).inSingletonScope();
container.bind(TYPES.Emitter).to(EventEmitter).inSingletonScope();
// Game configuration dependencies
container.bind(TYPES.ScreenColor).toConstantValue(Config.SCREEN_COLOR);
container.bind(TYPES.ScreenHeight).toConstantValue(Config.SCREEN_HEIGHT);
container.bind(TYPES.ScreenWidth).toConstantValue(Config.SCREEN_WIDTH);
container.bind(TYPES.ScreenParent).toConstantValue(Config.SCREEN_PARENT);
container.bind(TYPES.SpatialCellSize).toConstantValue(Config.SPATIAL_CELL_SIZE);

export {container};
