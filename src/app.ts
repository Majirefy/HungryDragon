import { IGameConfig, ScaleManager } from "phaser-ce";
import { HungryDragon } from "./hungrydragon";

declare class WebFont {
    public static load(options: object): void;
}

window.onload = () => {
    const gameWidth: number = 1920;
    const gameHeight: number = 1080;

    const gameConfig: IGameConfig = { height: gameHeight, parent: "", renderer: Phaser.AUTO, width: gameWidth };

    WebFont.load({
        active: () => {
            const hungrydragon = new HungryDragon(gameConfig);
        },
        custom: {
            families: ["SongTi"],
            urls: ["assets/fonts/font.css"],
        },
    });
};
