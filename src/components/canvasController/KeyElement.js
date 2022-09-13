import { note, releaseNote } from "../synthComponent/synth";
import CanvasObject from "./canvasObject";
import BorderAnimation from "./borderAnimation";
export default class KeyElement extends CanvasObject {

    note = 'C';

    margin = 0;

    ctx = null;
    clicked = false;

    borders = [];

    /**
     * 
     * @param {String} note código de la nota
     * @param {integer} positionX posición de la tecla
     * @param {*} ctx contexto del canvas
     */
    constructor(note, positionX, ctx) {
        super(0, 0, (ctx.canvas.width / 11), (ctx.canvas.height / 1.4));
        this.ctx = ctx;

        this.note = note;

        this.margin = this.width / 20;

        this.positionX = (this.width * positionX) + this.margin;

        this.positionY = this.ctx.canvas.height / 8;

        this.borders.push(new BorderAnimation(this.positionX - this.width / 20, this.positionY, this.width, this.height, 0, this));
        this.borders.push(new BorderAnimation(this.positionX - this.width / 20, this.positionY, this.width, this.height, 40, this));
        this.borders.push(new BorderAnimation(this.positionX - this.width / 20, this.positionY, this.width, this.height, 80, this));
        this.borders.push(new BorderAnimation(this.positionX - this.width / 20, this.positionY, this.width, this.height, 120, this));

    }

    // Cambia el estado de la tecla según la entrada del ratón y la vuelve a dibujar
    click(posX, posY, release, ignoreMouse) {
        if (!release) {
            this.clicked = ignoreMouse || this.mouseIntoObject(posX, posY);
            this.clicked = ignoreMouse || (posX > this.positionX && posY > this.positionY
                && posX < this.positionX + this.width - this.margin * 2
                && posY < this.positionY + this.height);
        } else {
            this.clicked = false;
        }

        if (this.clicked) {
            note(this.note, 4);
        } else {
            releaseNote(this.note, 4);
        }

    }

    // Método de dibujo
    draw() {
        this.ctx.beginPath();

        this.borders.forEach(element => (element.draw(this.ctx)));

        if (this.clicked) {
            this.ctx.fillStyle = '#903277';
        } else {
            this.ctx.fillStyle = '#303277';
        }

        this.ctx.strokeStyle = '#D0D2D788';
        this.ctx.fillRect(this.positionX - 1, this.positionY - 1,
            this.width - this.margin * 2 + 1, this.height + 1);

        this.ctx.fill();

    }

}
