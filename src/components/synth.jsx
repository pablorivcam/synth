import React from "react";
import { PolySynth } from "tone";
import * as Tone from 'tone';
import './synth.css';
import CanvasController from "./canvasController/canvasController";

var synth = null;
var ready = false;

var noteMap = new Map();
noteMap.set('a', 'C');
noteMap.set('w', 'C#');
noteMap.set('s', 'D');
noteMap.set('e', 'D#');
noteMap.set('d', 'E');
noteMap.set('f', 'F');
noteMap.set('t', 'F#');
noteMap.set('g', 'G');
noteMap.set('y', 'G#');
noteMap.set('h', 'A');
noteMap.set('u', 'A#');
noteMap.set('j', 'B');

var noteStatus = new Map();
noteStatus.set('C', false);
noteStatus.set('C#', false);
noteStatus.set('D', false);
noteStatus.set('D#', false);
noteStatus.set('E', false);
noteStatus.set('F', false);
noteStatus.set('F#', false);
noteStatus.set('G', false);
noteStatus.set('G#', false);
noteStatus.set('A', false);
noteStatus.set('A#', false);
noteStatus.set('B', false);

var octave = 4;

// Necesario para inicializar el módulo de sonido
(async () => {
    if (!ready) {
        await Tone.start();
        console.log('audio is ready');
        ready = true;
        //Aquí es donde se establece el synth
        // Efectos
        //const pingPong = new Tone.PingPongDelay("4n", 0.2).toDestination();

        //synth = new PolySynth().connect(pingPong).toDestination();
        synth = new PolySynth().toDestination();
    }
})();

document.addEventListener('keypress', (event) => {
    if (noteMap.has(event.key.toLowerCase())) {
        note(noteMap.get(event.key.toLowerCase()), octave);
    } else {
        switch (event.key.toLowerCase()) {
            case '1': octave = 1; break;
            case '2': octave = 2; break;
            case '3': octave = 3; break;
            case '4': octave = 4; break;
            default: break;
        }
    }
}, false);

document.addEventListener('keyup', (event) => {
    if (noteMap.has(event.key.toLowerCase())) {
        releaseNote(noteMap.get(event.key.toLowerCase()), octave);
    }
}, false);

function note(note, octave) {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    if (ready && noteStatus.has(note) && !noteStatus.get(note)) {
        synth.triggerAttack(note + octave);
        noteStatus.set(note, true);
    }
}

function releaseNote(note, octave) {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    if (ready && noteStatus.has(note) && noteStatus.get(note)) {
        synth.triggerRelease(note + octave);
        noteStatus.set(note, false);
    }
}

export function Synth() {
    return <div id="synth_container">
        <div>Esto es un test</div>
        <CanvasController />
    </div >
}