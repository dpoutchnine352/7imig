/**
 * Represents a car.
 *
 * @class
 */
export class Carta {
  /**
   * Creates a new object with a collection and a number.
   *
   * @constructor
   * @param {string} coll - Coll de la carta.
   * @param {number} num - Número de la carta.
   */
  constructor(coll, num) {
    this.coll = coll;
    this.num = num;
    this.punts = this.num <= 7 ? this.num : 0.5;
    this.visible= true;
  }
  /**
   * visibilitzar carta (ensenyar numero i coll)
   */
  visibilitzar() {
    this.visible=true;
  }
  /**
   * girar carta (d'esquenes)
   */
  girar() {
    this.visible=false;
  }
}
