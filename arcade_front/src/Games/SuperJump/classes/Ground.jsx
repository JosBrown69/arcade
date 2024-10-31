import groundImage from '../assets/ground.png'

export class Ground{
    constructor({game}){
        this.game = game
        this.image = new Image()
        this.image.src = groundImage
        this.position = {
            x: 0,
            y: this.game.height - 30
        }
        this.speed = {
            y: 0, 
            x: 0
        }
        this.width = 360
        this.height = 87
    }

    render(ctx){
        this.position.y += this.speed.y;
        this.draw(ctx)
    }

    reset(){
        this.position = {
            x: 0,
            y: this.game.height - 30
        }
    }
    
    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
    }