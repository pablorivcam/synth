import React from "react";
import { PolySynth } from "tone";
import * as Tone from 'tone';

var synth = null;
var ready = false;

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

export function note(note, octave) {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    if (ready && noteStatus.has(note) && !noteStatus.get(note)) {
        noteStatus.set(note, true);
        synth.triggerAttack(note + octave);
    }
}

export function releaseNote(note, octave) {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    if (ready && noteStatus.has(note) && noteStatus.get(note)) {
        noteStatus.set(note, false);
        synth.triggerRelease(note + octave);
    }
}

export function Synth() {
    return <div id="synth_container">
    </div >
}

