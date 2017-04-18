import { Group, Image, Physics, Sound, Sprite, State, Text, TileSprite } from "phaser-ce";

export class Main extends State {
    private background: TileSprite = null;
    private dragon: Sprite = null;
    private candis: Group = null;
    private candyToEat: Sprite = null;
    private balloon: Sprite = null;
    private balloons: Group = null;
    private top: number = 0;
    private bottom: number = 0;
    private score: number = 0;
    private scoreText: Text = null;
    private soundButton: Sprite = null;
    private musicButton: Sprite = null;

    private burp: Sound = null;
    private gulp: Sound = null;
    private bgm: Sound = null;

    private hasSound: boolean = true;
    private hasMusic: boolean = true;

    public preload(): void {
        this.game.camera.flash(0x1e1e1e, 1000);
        this.bottom = this.game.height - 350;
    }

    public create(): void {
        this.score = 0;

        this.game.physics.startSystem(Physics.ARCADE);

        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "background");
        this.background.autoScroll(-150, 0);

        // Setup a flying dragon.
        this.dragon = this.game.add.sprite(0, 0, "dragon");
        this.dragon.animations.add("fly", [0, 1, 2, 3, 4, 5, 6, 7], 16, true);
        this.dragon.animations.play("fly");

        // Setup candies.
        this.candis = this.game.add.group();
        this.candis.createMultiple(40, "candy");
        this.candis.setAll("checkWorldBounds", true);
        this.candis.setAll("outOfBoundsKill", true);

        // Setup ballon.
        this.balloons = this.game.add.group();
        this.balloon = this.game.add.sprite(0, 0, "balloon");
        this.candyToEat = this.add.sprite(64, 48, "candy");
        this.candyToEat.anchor.setTo(0.5);
        this.balloons.add(this.balloon);
        this.balloons.add(this.candyToEat);
        this.balloons.x = 96;
        this.balloons.y = 16;

        // Setup score text.
        const scoreLabel = this.game.add.text(this.game.world.centerX, 0, "Score", {
            align: "center",
            fill: "#ffffff",
            font: "64px SongTi",
        });
        scoreLabel.anchor.setTo(0.5, 0);
        this.scoreText = this.game.add.text(this.game.world.centerX, scoreLabel.height, "0", {
            align: "center",
            fill: "#ffffff",
            font: "128px SongTi",
        });
        this.scoreText.anchor.setTo(0.5, 0);

        // Sound buttons.
        this.soundButton = this.game.add.sprite(this.game.width, 0, "soundButtons");
        this.soundButton.anchor.setTo(1, 0);
        this.soundButton.scale.setTo(0.5);
        this.soundButton.inputEnabled = true;
        this.soundButton.events.onInputDown.add(this.toggleSound, this);
        this.musicButton = this.game.add.sprite(this.game.width - this.soundButton.width, 0, "soundButtons");
        this.musicButton.anchor.setTo(1, 0);
        this.musicButton.scale.setTo(0.5);
        this.musicButton.frame = 2;
        this.musicButton.inputEnabled = true;
        this.musicButton.events.onInputDown.add(this.toggleMusic, this);

        // Add sound effects and background music.
        this.burp = this.game.add.sound("burp");
        this.gulp = this.game.add.sound("gulp");
        this.bgm = this.game.add.sound("bgm", 0.8, true);

        // Setup physics world.
        this.game.physics.enable([this.dragon, this.candis], Physics.ARCADE);
        this.dragon.body.gravity.y = 640;
        this.dragon.body.immovable = true;

        // Random add candies. In every 2 seconds game adds a candy on the screen.
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, () => {
            const candy = this.candis.getFirstDead();
            const x = this.game.width - 100;
            const y = this.game.rnd.integerInRange(0, this.game.height - 350);
            const type = this.game.rnd.integerInRange(0, 8);

            candy.frame = type;
            candy.reset(x, y);
            candy.enable = true;
            candy.body.velocity.x = -300;
        }, this);

        this.resetCandyToEat();
        this.updateSoundButtons();
        this.updateMuiscPlay();
    }

    public update(): void {
        this.game.physics.arcade.collide(this.dragon, this.candis, null, this.onEat, this);
        this.balloons.y = this.dragon.y - 128;
        if (this.game.input.activePointer.isDown) {
            this.flap();
        }
        if (this.dragon.y < this.top) {
            this.dragon.y = this.top;
            this.dragon.body.velocity.y = 0;
        }
        if (this.dragon.y > this.bottom) {
            this.dragon.y = this.bottom;
            this.dragon.body.gravity.y = 0;
        } else {
            this.dragon.body.gravity.y = 640;
        }
    }

    /**
     * Make dragon fly up.
     */
    private flap(): void {
        this.dragon.body.velocity.y = -350;
    }

    /**
     * This method is called when dragon collide with a candy.
     * @param dragon Dragon sprite.
     * @param candy Candy sprite.
     */
    private onEat(dragon: Sprite, candy: Sprite) {
        if (this.candyToEat.frame === candy.frame) {
            if (this.hasSound) {
                this.gulp.play();
            }
            candy.kill();
            this.resetCandyToEat();
            this.score++;
            this.scoreText.text = this.score.toLocaleString();
        } else {
            this.bgm.stop();
            if (this.hasSound) {
                this.burp.play();
            }
            candy.kill();
            this.game.camera.fade(0x1e1e1e, 1000);
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.state.start("gameOver");
            }, this);
        }
    }

    /**
     * Reset candy to eat sprite.
     */
    private resetCandyToEat(): void {
        const newCandyToEat = this.game.rnd.integerInRange(0, 8);
        this.candyToEat.frame = newCandyToEat;
    }

    private updateMuiscPlay(): void {
        if (this.hasMusic) {
            if (!this.bgm.isPlaying) {
                this.hasMusic = true;
                this.bgm.play();
            }
        } else {
            this.hasMusic = false;
            this.bgm.stop();
        }
    }

    private updateSoundButtons(): void {
        this.soundButton.frame = this.hasSound ? 0 : 1;
        this.musicButton.frame = this.hasMusic ? 2 : 3;
    }

    private toggleSound(): void {
        this.hasSound = !this.hasSound;
        this.updateSoundButtons();
    }

    private toggleMusic(): void {
        this.hasMusic = !this.hasMusic;
        this.updateSoundButtons();
        this.updateMuiscPlay();
    }
}
