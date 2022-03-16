/**
 * Ao invez de estanciar um erro cada vez, podemos fazer uma classe onde vai receber os erros
 */
export class ServerError extends Error {
  /**
   * Toda classe que extende de Error tem um construturor e para passar esse contrutor chamamos o metodo super passando o parametro faltando
   * @param paramName
   */
  constructor() {
    super('Internal server error');
    this.name = 'ServerError';
  }
}
