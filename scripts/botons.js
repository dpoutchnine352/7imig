import {start, reset} from './pantalla.js';

start();
document.getElementById('reiniciar').addEventListener('click',
    () => reset());
