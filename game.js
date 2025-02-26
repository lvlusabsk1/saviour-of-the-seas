class SaviorOfTheSea extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image("player", "assets/player.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("enemy", "assets/enemy.png");
        this.load.image("missile", "assets/missile.png");
        this.load.image("heart", "assets/heart.png");
        this.load.image("powerup", "assets/powerup.png");
    }

    create() {
        this.player = this.physics.add.sprite(400, 550, "player").setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.powerups = this.physics.add.group();
        
        this.time.addEvent({ delay: 500, callback: this.shootBullet, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 2000, callback: this.spawnEnemy, callbackScope: this, loop: true });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }
    }

    shootBullet() {
        let bullet = this.bullets.create(this.player.x, this.player.y, "bullet");
        bullet.setVelocityY(-300);
    }

    spawnEnemy() {
        let enemy = this.enemies.create(Phaser.Math.Between(50, 750), 50, "enemy");
        enemy.setVelocityY(100);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: "arcade", arcade: { debug: false } },
    scene: SaviorOfTheSea
};

const game = new Phaser.Game(config);
