import {enemyCollisions, platformCollisions} from './utils'
import fallingLeft from '../assets/fallingLeft.png'
import fallingRight from '../assets/fallingRight.png'
import jumpingLeft from '../assets/jumpingLeft.png'
import jumpingRight from '../assets/jumpingRight.png'

export class Player {
    constructor({game, imageSrc, platforms}) {
        this.game = game
        this.platforms = platforms
        this.width = 40
        this.height = 40
        this.image = new Image()
        this.image.src = imageSrc
        this.direction = 'right'
        this.speed = {
            x: 0,
            y: 0,
        }
        this.gravity = 0.1
        this.position = {
            x: game.width / 2 - 20,
            y: game.height - this.height - 360, 
        }
        this.ground = false
    }

    render(ctx) {
        this.draw(ctx)
        this.position.x += this.speed.x;
        this.listeners()
        this.controls()
        this.applyGravity()
        this.detectBottom()
        this.autoJump()
        this.detectBorder()
        this.changeDirection()
        this.changeSprite()
        this.platformDetection()
        this.platformMovement()
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update(){
        return
    }

    reset(){
        return
    }

    changeDirection(){
        if(this.speed.x > 0) {
            this.direction = 'right'
        }
        if(this.speed.x < 0){
            this.direction = 'left'
        }
    }

    changeSprite() {
        if(this.direction === 'right' && this.speed.y > 0){
            this.image.src = fallingRight
        }
        if(this.direction === 'right' && this.speed.y < 0){
            this.image.src = jumpingRight
        }
        if(this.direction === 'left' && this.speed.y > 0){
            this.image.src = fallingLeft
        }
        if(this.direction === 'left' && this.speed.y < 0){
            this.image.src = jumpingLeft
        }
    }

    detectBorder() {
        if(this.position.x + this.width < 0) {
            this.position.x = this.game.width
        } else if(this.position.x > this.game.width) {
            this.position.x = 0
        }
    }

    detectBottom() {
        if(this.position.y > this.game.height - this.height){
            this.position.y = this.game.height - this.height
            this.speed.y = 0
            this.ground = true
        }
    }

    platformDetection() {
        for (let i = 0; i < this.platforms.length; i++) {
            const platform = this.platforms[i];
            if (platformCollisions({ player: this, object: platform })) {
                this.ground = true
            }
        }
    }

    platformMovement(){
        if(this.position.y < 250){
            this.platforms.forEach(platform => {
                platform.speed.y = 3
            }) 
        } else {
            this.platforms.forEach(platform => {
                platform.speed.y = 0
            }) 
        }
    }

    applyGravity() {
        this.speed.y += this.gravity;
        this.position.y += this.speed.y;
    }

    autoJump() {
        if(this.position.y > 200) {
            if(this.ground) {
                this.speed.y = -5
                this.ground = false
            }
        }
        //if(this.ground && this.position.y < 100) {
        //    this.speed.y = 0
        //    this.ground = false
        //}
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
            this.speed.x = -4;
        } else if (this.game.keys.right) {
            this.speed.x = 4;
        }
    }
}