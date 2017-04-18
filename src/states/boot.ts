import { ScaleManager, State } from "phaser-ce";

/**
 * This is boot state of game.
 * In this state, game initialize its scale mode and set game content view in the center of the screen.
 * It also loads splash screen image and goes to preload state.
 */
export class Boot extends State {
    public preload(): void {
        // Set game scale mode.
        this.scale.scaleMode = ScaleManager.SHOW_ALL;
        this.game.scale.refresh();

        // Set game content view in the center of the screen.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // if (this.game.device.desktop) {
        //     // Any desktop specific stuff here.
        // } else {
        //     // Any mobile specific stuff here.
        //     this.game.scale.forceOrientation(false, true);
        // }

        // // Load game resources of preload state.
        this.game.load.image("splash", "../../assets/images/system/Splash.png");
        this.game.load.image("progressBar", "../../assets/images/system/ProgressBar.png");
        this.game.load.image("progressBarFrame", "../../assets/images/system/ProgressBarFrame.png");
    }

    public create(): void {
        this.state.start("preload");
    }
}
