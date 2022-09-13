export default class CanvasObject {

    positionX = 0;
    positionY = 0;

    width = 0;
    height = 0;

    constructor(positionX, positionY, width, height) {
        this.positionX = positionX;
        this.positionY = positionY;

        this.width = width;
        this.height = height;
    }

    /**
     * Devuelve si el ratón está dentro o no del objeto
     * @param {int} mouseX posición X del ratón
     * @param {int} mouseY posición Y del ratón
     * @returns verdadero si está dentro del objeto, falso en caso contrario
     */
    mouseIntoObject(mouseX, mouseY) {
        return (mouseX > this.positionX && mouseY > this.positionY
            && mouseX < this.positionX + this.width
            && mouseY < this.positionY + this.height)
    }

}