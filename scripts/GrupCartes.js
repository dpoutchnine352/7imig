import {Carta} from './carta.js';

/**
 * Classe grup de cartes
 */
export class GrupCartes {
  /**
  * Constructor
  */
  constructor() {
    this.cartes=[];
    this.passat=false;
  }

  /**
   *
   * Funció treureCarta
   * @return {*}
   */
  treureCarta() {
    /** Extreure carta aleatòria  **/
    const pos=Math.trunc(Math.random()*this.cartes.length);
    const carta=this.cartes[pos];
    /** Eliminar carta del grup**/
    this.cartes.splice(pos, 1);
    return carta;
  }

  /**
   * Funció afegirCarta
   * @param {Carta} carta
   */
  afegirCarta(carta) {
    this.cartes[this.cartes.length]=carta;
    if (this.punts()>7.5) {
      this.passat=true;
    }
  }
  /**
   * Generar baralla amb totes les cartes
   */
  generarBarallaCompleta() {
    const coll=['bastos', 'oros', 'espases', 'copes'];
    let i=0;
    for (let c=0; c<4; c++) {
      for (let n=0; n<12; n++) {
        this.cartes[i]=new Carta(coll[c], n+1);
        if (n===6) {
          n=8;
        }
        i++;
      }
    }
  }

  /**
   * Funció calcular punts
   * @return {number}
   */
  punts() {
    let punts=0;
    for (let i=0; i<this.cartes.length; i++) {
      punts+=this.cartes[i].punts;
    }
    return punts;
  }
}
