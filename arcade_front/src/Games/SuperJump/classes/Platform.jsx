export class Platform {
    constructor({game, position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.width = 60
        this.height = 5
        this.game = game
        this.speed = {
            x: 0, 
            y: 0,
        }
        this.moving = true 
    }

    render(ctx){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.draw(ctx)
        this.movement()
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y - 20)
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    movement(){
        if(this.moving) {
            if(this.position.x > 0) {
                this.speed.x = 4
            }
            if (this.position.x < this.game.width - this.width) {
                this.speed.x = -4
            }
        }
    }

}