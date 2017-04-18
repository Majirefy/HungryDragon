import { Game, IGameConfig, Physics, ScaleManager } from "phaser-ce";
import { Boot } from "./states/boot";
import { GameOver } from "./states/gameover";
import { Main } from "./states/main";
import { Preload } from "./states/preload";
import { Title } from "./states/title";

/**
 * This is custom game class.
 * The default game screen width is 1080px and screen height is 1920px if no configuration provided.
 */
export class HungryDragon extends Game {
    /**
     * This is custom game class.
     * The default game screen width is 1080px and screen height is 1920px if no configuration provided.
     * @param gameConfig Game configuration.
     */
    constructor(gameConfig?: IGameConfig) {
        gameConfig = gameConfig ||
            {
                height: 1080,
                renderer: Phaser.AUTO,
                width: 1920,
            };
        super(gameConfig);

        // Add all game states.
        this.state.add("boot", Boot);
        this.state.add("preload", Preload);
        this.state.add("title", Title);
        this.state.add("main", Main);
        this.state.add("gameOver", GameOver);

        // Start game.
        this.state.start("boot");
    }
}
