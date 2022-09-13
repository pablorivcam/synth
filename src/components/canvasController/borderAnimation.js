import CanvasObject from "./canvasObject";

export default class BorderAnimation extends CanvasObject {

    animationStatus = -1;
    animationDelay = 0;

    keyElement = null;

    constructor(positionX, positionY, width, height, animationDelay, keyElement) {
        super(positionX, positionY, width, height);
        this.animationDelay = animationDelay;
        this.keyElement = keyElement;
    }

    draw(ctx) {
        if (this.keyElement.clicked || this.animationStatus >= 0) {
            this.animationStatus -= 30;

            if (this.animationStatus < 0 && this.keyElement.clicked) {
                this.animationStatus = 255;
            }

            const animationPosition = (this.animationStatus - this.animationDelay) % 255;

            ctx.strokeStyle = '#D0D2D7' + (animationPosition * 2).toString(16);

            const stretch = 20 * (1 - (animationPosition / 255));

            ctx.lineWidth = "1";
            ctx.strokeRect(this.positionX - stretch, this.positionY - stretch,
                this.width + stretch * 2, this.height + stretch * 2);
            ctx.stroke();
        }
    }

}