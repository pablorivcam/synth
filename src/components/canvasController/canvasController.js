import React, { useRef, useEffect } from 'react'
import KeyElement from './KeyElement';
import './canvasContainer.css';
import { Synth } from '../synthComponent/synth';
import { noteMap } from '../synthComponent/noteMap';

const CanvasController = props => {

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 200;

    const keys = new Map();

    // Indica si el ratón está pulsado o no
    var isMouseDown = false;

    var canvasElement = useRef(null);

    // Función para inicializar las teclas y los eventos del ratón
    function initialize(ctx) {
        if (keys.size === 0) {
            keys.set('C', new KeyElement('C', 2, ctx));
            keys.set('D', new KeyElement('D', 3, ctx));
            keys.set('E', new KeyElement('E', 4, ctx));
            keys.set('F', new KeyElement('F', 5, ctx));
            keys.set('G', new KeyElement('G', 6, ctx));
            keys.set('A', new KeyElement('A', 7, ctx));
            keys.set('B', new KeyElement('B', 8, ctx));

            canvasElement.current.addEventListener('mousedown', click);
            canvasElement.current.addEventListener('mousemove', click);
            canvasElement.current.addEventListener('mouseup', click);

            document.addEventListener('keypress', (event) => {
                if (noteMap.has(event.key.toLowerCase())) {
                    const pressedNote = noteMap.get(event.key.toLowerCase());
                    if (keys.has(pressedNote)) {
                        keys.get(pressedNote).click(0, 0, false, true);
                    }
                }
            }, false);

            document.addEventListener('keyup', (event) => {
                const pressedNote = noteMap.get(event.key.toLowerCase());
                if (keys.has(pressedNote)) {
                    keys.get(pressedNote).click(0, 0, true, true);
                }
            }, false);

        }
    }

    // Función utilizada cuando se recibe una entrada de ratón
    function click(event) {

        if (event.type === 'mouseup') {
            isMouseDown = false;
        } else if (event.type === 'mousedown') {
            isMouseDown = true;
        }

        var xVal = event.pageX * CANVAS_WIDTH / canvasElement.current.offsetWidth;
        var yVal = event.pageY * CANVAS_HEIGHT / canvasElement.current.offsetHeight;

        keys.forEach(key => {
            key.click(xVal, yVal, !isMouseDown);
        });
    }

    // Equivalente a cuando se crea o actualiza el componente
    useEffect(() => {
        canvasElement.current = document.getElementById("synthCanvas");

        var ctx = canvasElement.current.getContext("2d");
        initialize(ctx);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#203241'
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fill();

        setInterval(() => {
            ctx.fillStyle = '#203241'
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.fill();

            keys.forEach((element, key) => {
                element.draw();
            });
        }, 100);

    })

    return <div id="canvas_container"><Synth /><canvas id="synthCanvas" width={CANVAS_WIDTH} heigh={CANVAS_HEIGHT} ref={canvasElement} {...props} /></div>
}

export default CanvasController