import { useEffect, useRef } from 'react';
import fallingLeft from './assets/fallingLeft.png'
import fallingRight from './assets/fallingRight.png'
import jumpingLeft from './assets/jumpingLeft.png'
import jumpingRight from './assets/jumpingRight.png'
import steadyLeft from './assets/steadyLeft.png'
import steadyRight from './assets/steadyRight.png'

class Player {
    constructor({game, imageSrc}) {
        this.game = game
        this.width = 40
        this.height = 40
        this.image = new Image()
        this.image.src = imageSrc
        this.direction = 'right'
        this.speed = {
            x: 0,
            y: 0,
        }
        this.gravity = 0.5
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
        console.log(this.direction);
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
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

    applyGravity() {
        this.speed.y += this.gravity;
        this.position.y += this.speed.y;
    }

    autoJump() {
        if(this.ground) {
            this.speed.y = -15
            this.ground = false
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
            this.speed.x = -7;
        } else if (this.game.keys.right) {
            this.speed.x = 7;
        }
    }
}

class Background {
    constructor({game}) {
        this.width = game.width
        this.height = game.height
    }

    render(ctx){
        this.draw(ctx)
    }

    draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, this.width, this.height)
    }
}

class Game {
    constructor({canvas}) {
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.keys = {
            left: false,
            right: false,
        };
        this.background = new Background({
            game: this
        })
        this.player = new Player({
            game: this,
            imageSrc: steadyRight,
        })
    }

    render(ctx) {
        this.background.render(ctx)
        this.player.render(ctx)
    }
}

export function SuperJumpMain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const game = new Game({canvas})
        let animationFrame;

        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 100, 100);

        const gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.render(ctx)
            animationFrame = requestAnimationFrame(gameLoop);
        }

        gameLoop()

        return () => {
            cancelAnimationFrame(animationFrame);
        };

    }, [])

    return (
        <>
            <canvas ref={canvasRef} width={360} height={540}></canvas>
        </>
    );
}
