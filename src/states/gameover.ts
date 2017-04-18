import { State } from "phaser-ce";

export class GameOver extends State {
    public preload(): void {
        this.game.camera.flash(0x1e1e1e, 1000);
        this.game.stage.backgroundColor = "#1e1e1e";
    }

    public create(): void {
        // Setup a flying dragon.
        const dragon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "dragon");
        dragon.anchor.setTo(0.5);
        dragon.animations.add("fly", [0, 1, 2, 3, 4, 5, 6, 7], 16, true);
        dragon.animations.play("fly");
        dragon.scale.x = -1;

        const buttonPlayAgain = this.game.add.button(
            this.game.world.centerX,
            this.game.world.centerY * 3 / 2,
            "buttons",
            this.replay,
            this,
            0, 1, 0);
        buttonPlayAgain.anchor.setTo(0.5);
    }

    private replay(): void {
        this.game.state.start("main");
    }
}
