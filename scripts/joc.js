import {GrupCartes} from './GrupCartes.js';

/**
 * Classe Joc
 */
export class Joc {
  /**
   * Get cartes joc
   * @return {GrupCartes}
   */
  get cartesJoc() {
    return this._cartesJoc;
  }

  /**
   * Set cartes joc
   * @param {GrupCartes} value
   */
  set cartesJoc(value) {
    this._cartesJoc = value;
  }

  /**
   * Get cartes banca
   * @return {GrupCartes}
   */
  get banca() {
    return this._banca;
  }

  /**
   * Set cartes banca
   * @param {GrupCartes} value
   */
  set banca(value) {
    this._banca = value;
  }

  /**
   * get cartes jugador
   * @return {GrupCartes}
   */
  get jugador() {
    return this._jugador;
  }

  /**
   * Set cartes jugador
   * @param {GrupCartes} value
   */
  set jugador(value) {
    this._jugador = value;
  }

  /**
   * Get aposta
   * @return {null/number}
   */
  get aposta() {
    return this._aposta;
  }

  /**
   * Set aposta
   * @param {null/number} value
   */
  set aposta(value) {
    this._aposta = value;
  }

  /**
   * Get diners
   * @return {number}
   */
  get diners() {
    return this._diners;
  }

  /**
   * Set diners
   * @param {number} value
   */
  set diners(value) {
    this._diners = value;
  }

  /**
   * Get jugant
   * @return {boolean}
   */
  get jugant() {
    return this._jugant;
  }

  /**
   * Set jugant
   * @param {boolean} value
   */
  set jugant(value) {
    this._jugant = value;
  }

  /**
   * Get guanyador.
   * @return {String/undefined}
   */
  get guanyador() {
    return this._guanyador;
  }

  /**
   * Set guanyador
   * @param {String/undefined} value
   */
  set guanyador(value) {
    this._guanyador = value;
  }
  /**
   * Constructor classe Joc
   */
  constructor() {
    this._cartesJoc = new GrupCartes();
    this._banca = new GrupCartes();
    this._jugador= new GrupCartes();
    this._aposta=null;
    this._diners=10;
    this._jugant=false;
    this._guanyador=undefined;
  }

  /**
   * Començar
   */
  start() {
    this._guanyador=undefined;
    this._cartesJoc.generarBarallaCompleta();
  }

  /**
   * Reset
   */
  reset() {
    this.resetCartes();
    this._aposta=null;
    this._jugant=false;
    this._diners=10;
  }

  /**
   * Reset Cartes
   */
  resetCartes() {
    this._cartesJoc = new GrupCartes();
    this._banca = new GrupCartes();
    this._jugador= new GrupCartes();
    this.start();
  }
  /**
   * CalcularDiners
   */
  calculDiners() {
    if (this._diners>=this._aposta && this._aposta>0) {
      this._diners=this._diners-this._aposta;
    } else {
      this._aposta = undefined;
    }
  }

  /**
   * Funció Jugar
   */
  jugar() {
    if (this._aposta!==undefined && this._aposta>0) {
      this.resetCartes();
      this._jugant=true;
      this._jugador.afegirCarta(this._cartesJoc.treureCarta());
      this._banca.afegirCarta(this._cartesJoc.treureCarta());
      this._banca.cartes[0].girar();
    }
  }

  /**
   * Funció donar carta
   * @param {string} jugador
   */
  donarCarta(jugador) {
    switch (jugador) {
      case 'Jugador':
        this._jugador.afegirCarta(this._cartesJoc.treureCarta());
        if (this._jugador.passat) {
          this.final();
        }
        break;
      case 'Banca':
        this._banca.afegirCarta(this._cartesJoc.treureCarta());
        break;
    }
  }

  /**
   * Funció plantar:
   * girar carta banca i demanar
   */
  plantar() {
    this._banca.cartes[0].visibilitzar();
    while (this._banca.punts()<6) {
      this._banca.afegirCarta(this._cartesJoc.treureCarta());
    }
    if (this._banca.punts()>7.5) {
      this._banca.passat=true;
    }
    this.final();
  }

  /**
   * final: avaluar la situació i definir atribut guanyador
   */
  final() {
    this._jugant=false;
    if (this._jugador.passat) {
      this._guanyador='Banca';
    } else if (this._banca.passat) {
      this._guanyador='Jugador';
    } else {
      if (this._jugador.punts()>this._banca.punts()) {
        this._guanyador='Jugador';
      } else {
        this._guanyador='Banca';
      }
    }
    if (this._guanyador==='Jugador') {
      this._diners+=this._aposta*2;
    }
    this._aposta=0;
  }
}

