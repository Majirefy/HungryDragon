import { State } from "phaser-ce";

export class Title extends State {
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

        // Add start button.
        const buttonStart = this.game.add.button(
            this.game.world.centerX,
            this.game.world.centerY * 3 / 2,
            "buttons",
            this.startGame,
            this,
            6, 7, 6).anchor.setTo(0.5);

        const titleText = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY / 2,
            "Hungry Dragon", {
                align: "center",
                fill: "#ffffff",
                font: "128px SongTi",
            }).anchor.setTo(0.5);
    }

    private startGame(): void {
        // Fade out screen and change to main state.
        this.game.camera.fade(0x1e1e1e, 1000);
        this.game.camera.onFadeComplete.addOnce(() => {
            this.game.state.start("main");
        }, this);
    }
}
