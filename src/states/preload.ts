import { State } from "phaser-ce";

export class Preload extends State {
    public preload(): void {
        this.game.camera.flash(0x1e1e1e, 1000);

        // Splash screen image.
        const splash = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "splash");
        splash.anchor.setTo(0.5);

        // Progress bar frame.
        const progressBarFrame = this.game.add.image(
            this.game.world.centerX,
            this.game.world.centerY * 5 / 3,
            "progressBarFrame");
        progressBarFrame.anchor.setTo(0.5);

        // Progress bar.
        const progressBar = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY * 5 / 3,
            "progressBar");
        progressBar.anchor.setTo(0, 0.5);
        progressBar.x -= progressBar.width * 0.5;
        this.game.load.setPreloadSprite(progressBar);

        this.game.load.spritesheet("buttons", "../../assets/images/system/Buttons.png", 320, 80);
        this.game.load.spritesheet("soundButtons", "../../assets/images/system/SoundButtons.png", 256, 256);

        this.game.load.spritesheet("dragon", "../../assets/images/characters/Dragon.png", 200, 203);
        this.game.load.spritesheet("candy", "../../assets/images/characters/Candy.png", 80, 80);
        this.game.load.image("background", "../../assets/images/parallaxes/Background.png");
        this.game.load.image("balloon", "../../assets/images/system/Balloon.png");

        // Load background music and sound effects.
        this.game.load.audio("burp", "../../assets/audio/se/Burp.mp3");
        this.game.load.audio("gulp", "../../assets/audio/se/Gulp.mp3");
        this.game.load.audio("bgm", "../../assets/audio/bgm/Bgm.mp3");
    }

    public create(): void {
        this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
            // Fade out screen and change to title state.
            this.game.camera.fade(0x1e1e1e, 1000);
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.state.start("title");
            }, this);
        }, this);
    }
}
