import React, { useRef, useEffect } from 'react'

const CanvasController = props => {

    const canvasRef = useRef(null)

    const keys = [];

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#330000'
        ctx.beginPath()
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        var c = document.getElementById("synthCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#203241'
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#203277'
        ctx.rect((ctx.canvas.width / 10), 0, (ctx.canvas.width / 10) * 2, (ctx.canvas.height / 2));
        ctx.fill();

    }, [draw])

    return <canvas id="synthCanvas" ref={canvasRef} {...props} />
}

export default CanvasController