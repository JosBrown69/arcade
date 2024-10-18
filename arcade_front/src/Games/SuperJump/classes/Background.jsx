export class Background {
    constructor({game, imageSrc}) {
        this.width = game.width
        this.height = game.height
        this.image = new Image()
        this.image.src = imageSrc
    }

    render(ctx){
        this.draw(ctx)
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0);
    }
}