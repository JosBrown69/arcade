import { enemyCollisions, platformCollisions } from './utils';
import fallingLeft from '../assets/fallingLeft.png';
import fallingRight from '../assets/fallingRight.png';
import jumpingLeft from '../assets/jumpingLeft.png';
import jumpingRight from '../assets/jumpingRight.png';

export class Player {
    constructor({ game, platforms, ground, enemies }) {
        this.game = game;
        this.platforms = platforms;
        this.piso = ground
        this.enemies = enemies;
        this.width = 40;
        this.height = 40;
        this.image = new Image();
        this.direction = 'right';
        this.speed = {
            x: 0,
            y: 0,
        };
        this.gravity = 0.5;
        this.position = {
            x: this.game.width / 2 - 20,
            y: this.game.height - this.height - 50,
        };
        this.ground = false;
        this.movement = 0;
        this.points = 0;
    }

    render(ctx) {
        this.draw(ctx);
        this.position.x += this.speed.x;
        this.listeners();
        this.controls();
        this.applyGravity();
        this.detectBottom();
        this.groundDetection();
        this.autoJump();
        this.detectBorder();
        this.detectTop();
        this.changeDirection();
        this.changeSprite();
        this.platformDetection();
        this.platformAction();
        this.enemyDetection();
        this.moreEnemies()
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    reset() {
        if(this.game){
            this.position = {
                x: this.game.width / 2 - 20,
                y: this.game.height - this.height - 50,
            };
            this.points = 0
        }
    }

    changeDirection() {
        if (this.speed.x > 0) {
            this.direction = 'right';
        }
        if (this.speed.x < 0) {
            this.direction = 'left';
        }
    }

    changeSprite() {
        if (this.direction === 'right' && this.speed.y > 0) {
            this.image.src = fallingRight;
        }
        if (this.direction === 'right' && this.speed.y < 0) {
            this.image.src = jumpingRight;
        }
        if (this.direction === 'left' && this.speed.y > 0) {
            this.image.src = fallingLeft;
        }
        if (this.direction === 'left' && this.speed.y < 0) {
            this.image.src = jumpingLeft;
        }
    }

    detectBorder() {
        if (this.position.x + this.width < 0) {
            this.position.x = this.game.width;
        } else if (this.position.x > this.game.width) {
            this.position.x = 0;
        }
    }

    detectBottom() {
        if (this.position.y > this.game.height - this.height) {
            this.game.state = 'gameOver'
        }
    }

    detectTop() {
        if (this.position.y < 0) {
            this.position.y = 0;
            this.speed.y = 0;
        }
    }

    platformDetection() {
        if (this.speed.y > 0) {
            for (let i = 0; i < this.platforms.length; i++) {
                const platform = this.platforms[i];
                if (platformCollisions({ player: this, object: platform })) {
                    this.ground = true;
                    this.points ++
                }
            }
        }
    }

    groundDetection(){
        if(this.piso){
            if (enemyCollisions({ player: this, object: this.piso })) {
                this.ground = true;
            }
        }
    }

    scoreUpdate(){
        if(this.ground){
            this.game.scoreUpdate()
        }
    }

    platformMovement() {
        if(this.position.y < this.game.height / 2 && !this.ground){
            this.platforms.forEach((platform) => {
                platform.speed.y = 5
            })
            this.enemies.forEach((enemy) => {
                enemy.speed.y = 5
            })
            this.piso.speed.y = 5
        } else {
            this.platforms.forEach((platform) => {
                platform.speed.y = 0
            })
            this.enemies.forEach((enemy) => {
                enemy.speed.y = 0
            })
            this.piso.speed.y = 0
        }
    }

    platformAction() {
        setInterval(this.platformMovement(), 20);
    }

    enemyDetection() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            if (enemyCollisions({ player: this, object: enemy })) {
                this.game.state = 'gameOver'
                return
            }
        }
    }

    moreEnemies(){
        if(this.points > 20){
            this.game.enemies = 7
        }
        if (this.points > 40){
            this.game.enemies = 10
        }
        if(this.points > 60){
            this.game.enemies = 13
        }
    }

    applyGravity() {
        this.speed.y += this.gravity;
        this.position.y += this.speed.y;
    }

    autoJump() {
        if (this.ground) {
            this.speed.y = -13;
            this.ground = false;
        }
    }

    listeners() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.game.keys.left = true;
                    break;
                case 'ArrowRight':
                    this.game.keys.right = true;
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.game.keys.left = false;
                    break;
                case 'ArrowRight':
                    this.game.keys.right = false;
                    break;
            }
        });
    }

    controls() {
        if (this.game.keys.left) {
            this.speed.x = -3;
        } else if (this.game.keys.right) {
            this.speed.x = 3;
        }
    }
}
