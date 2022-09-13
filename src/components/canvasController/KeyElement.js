class KeyElement {

    note = 'C';
    position = 0;

    keyWidth = 0;
    keyHeight = 0;

    constructor(note, position, ctx) {
        this.note = note;
        this.position = position;

        this.keyWidth = (ctx.canvas.width / 20);
        this.keyHeight = (ctx.canvas.height / 2);

    }

    draw(ctx) {

        ctx.beginPath();
        ctx.fillStyle = '#203277'
        ctx.rect(this.keyWidth * this.position, 0, this.keyWidth * (this.position + 1), this.keyHeight);
        ctx.fill();
    }

}
