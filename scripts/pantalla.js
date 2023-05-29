import {Joc} from './joc.js';

const joc=new Joc();

/**
 * Funció per començar
 */
export function start() {
  crearDiv('missatgeStart', undefined,
      'Entra la teva aposta, i prem \'Juga\'', 'taulell');
  joc.start();
  mostrarHTML(joc.diners, 'diners');
  crearAposta();
  crearDiv('jugar', 'bt', 'Juga', 'btGenerals', 2, jugar);
}
/**
 * Funció mostrarHTML
 * @param {*} valor
 * @param {string} id
 */
function mostrarHTML(valor, id) {
  document.getElementById(id).innerHTML=valor;
}
/**
 *
 * Funció aposta
 * @param {enter} dinersApostats
 */
function aposta(dinersApostats) {
  joc.aposta=dinersApostats;
  joc.calculDiners();
  mostrarHTML(joc.diners, 'diners');
  document.getElementById('apostaDiners').value=null;
}
/**
 * Funció mostrar carta
 * @param {Carta} carta
 * @param {String} jugador
 */
export function mostrarCarta(carta, jugador) {
  const divCarta=crearCarta(carta);
  document.getElementById('cartes'+jugador).appendChild(divCarta);
}


/**
 * Funció reiniciar
 */
export function reset() {
  joc.reset();
  mostrarHTML(joc.diners, 'diners');
  eliminar('missatgeFinal');
  eliminar('missatgeStart');
  eliminar('jugar');
  eliminar('flexAposta');
  eliminar('jugadors');
  start();
}
/**
 * Funció jugar
 */
export function jugar() {
  const dinersApostats=document.getElementById('apostaDiners').value;
  aposta(dinersApostats);
  joc.jugar();
  if (joc.jugant) {
    document.getElementById('missatgeStart').remove();
    crearTaulell();
    mostrarHTML('Aposta: '+joc.aposta, 'apostaJugador');
    mostrarCarta(joc.jugador.cartes[0], 'Jugador');
    mostrarHTML('Puntuació de les cartes: '+joc.jugador.punts(),
        'puntsJugador');
    mostrarCarta(joc.banca.cartes[0], 'Banca');
    eliminar('jugar');
    eliminar('flexAposta');
  }
}

/**
 * Funció demanar carta
 */
export function demanarCarta() {
  joc.donarCarta('Jugador');
  mostrarCarta(joc.jugador.cartes[joc.jugador.cartes.length-1], 'Jugador');
  mostrarHTML('Puntuació de les cartes: '+joc.jugador.punts(), 'puntsJugador');
  if (joc.jugador.passat===true) {
    finalPartida();
  }
}

/**
 * Plantar
 */
export function plantar() {
  joc.plantar();
  finalPartida();
}
/**
 * Funció seguirJugant
 */
export function novaPartida() {
  eliminar('missatgeFinal');
  eliminar('jugadors');
  start();
}
/**
 * Final partida
 */
function finalPartida() {
  ensenyarCarta(joc.banca.cartes[0],
      document.getElementById('cartesBanca').firstElementChild);
  for (let i=1; i<joc.banca.cartes.length; i++) {
    mostrarCarta(joc.banca.cartes[i], 'Banca');
  }
  crearDiv('missatgeFinal', undefined, undefined, 'joc', 2);
  mostrarHTML('Puntuació de les cartes: '+joc.banca.punts(), 'puntsBanca');
  if (joc.jugador.passat) {
    crearDiv(undefined, undefined, 'T\'has passat de 7.5. Has perdut',
        'missatgeFinal');
  } else if (joc.guanyador==='Jugador') {
    crearDiv(undefined, undefined, 'Has guanyat, enhorabona!',
        'missatgeFinal');
  } else {
    crearDiv(undefined, undefined, 'Has perdut,' +
      ' la banca s\'ha apropat igual o més a 7.5', 'missatgeFinal');
  }
  if (joc.diners===0) {
    crearDiv(undefined, undefined, 'T\'has quedat sense diners,' +
      ' reinicia per tornar a jugar', 'missatgeFinal');
  } else {
    crearDiv('novaPartida', 'bt', 'Nova partida',
        'missatgeFinal', undefined, novaPartida);
  }
  eliminar('demanarCarta');
  eliminar('plantar');
  mostrarHTML(joc.diners, 'diners');
}

/**
 * Funcions de creació i eliminació d'elements HTML
 */

/**
 * Crear apostaHTML
 */
export function crearAposta() {
  const label = document.createElement('label');
  label.setAttribute('for', 'apostaDiners');
  label.textContent = 'Aposta:';

  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('id', 'apostaDiners');
  input.setAttribute('required', '');

  crearDiv('flexAposta', undefined, undefined, 'btGenerals', 1);

  document.getElementById('flexAposta').append(label, input);
}

/**
 * Funció crearDiv genèric
 * @param {string} [id]
 * @param {string} [classe]
 * @param {string} [text]
 * @param {string/HTMLDivElement} [pare]
 * @param {int} [pos]
 * @param {function} [btClick]
 * @return {HTMLDivElement}
 * **/
function crearDiv(id, classe, text, pare, pos, btClick) {
  const element = document.createElement('div');
  if (id) {
    if (!existeixDiv(id)) {
      element.id=id;
    }
  }
  if (classe) {
    element.className=classe;
  }
  if (text) {
    element.textContent=text;
  }
  if (btClick) {
    element.addEventListener('click', () => btClick());
  }
  /* Si pare és una cadena, és que passem l'identificador*/
  if (pare) {
    if (typeof pare === 'string') {
      pare=document.getElementById(pare);
    }
    if (pos) {
      pare.insertBefore(element, pare.children[pos]);
    } else {
      pare.appendChild(element);
    }
  } else {
    return element;
  }
}

/**
 * comprovar si existeix un element
 * @param {string} id
 * @return {HTMLElement}
 */
function existeixDiv(id) {
  return document.getElementById(id);
}
/**
 * eliminar
 * @param {string} id
 */
function eliminar(id) {
  if (existeixDiv(id)) {
    document.getElementById(id).remove();
  }
}
/**
 * Funció crear carta
 * @param {Carta} carta
 * @return {HTMLDivElement}
 */
function crearCarta(carta) {
  const divCarta=crearDiv(undefined, 'carta');
  if (carta.visible) {
    ensenyarCarta(carta, divCarta);
  }
  return divCarta;
}
/**
 * Ensenyar els valors de la carta
 * @param {Carta} carta
 * @param {HTMLDivElement} divCarta
 * @return {HTMLDivElement}
 */
function ensenyarCarta(carta, divCarta) {
  const divNumCarta=crearDiv(undefined, 'num', carta.num.toString());
  const imgColl = document.createElement('img');
  imgColl.className='collImg';
  imgColl.alt=carta.num.toString()+carta.coll;
  imgColl.src = './logos/'+carta.coll+'.png';
  divCarta.append(divNumCarta, imgColl);
  return divCarta;
}
/**
 * Crear taulell
 */
function crearTaulell() {
  crearDiv('jugadors', undefined, undefined, 'taulell');
  crearJugador('jugador');
  crearJugador('banca');
}

/**
 * Crear els elements pel jugador i la banca
 * @param {String} nom
 */
function crearJugador(nom) {
  /*  Nom: Primera lletra majúscula */
  const Nom=nom.charAt(0).toUpperCase() + nom.slice(1);

  crearDiv(nom, undefined, undefined, 'jugadors');
  crearDiv(undefined, 'divNom', Nom, nom);
  crearDiv('punts'+Nom, undefined, undefined, nom);

  if (nom==='jugador') {
    crearDiv('apostaJugador', undefined, undefined, nom);
    crearDiv('btJugador', undefined, undefined, 'jugador');
    crearDiv('plantar', undefined, 'Planta\'t', 'btJugador',
        undefined, plantar);
    crearDiv('demanarCarta', undefined, 'Demana carta', 'btJugador',
        undefined, demanarCarta);
  }
  crearDiv('cartes'+Nom, 'cartes', undefined, nom);
}
