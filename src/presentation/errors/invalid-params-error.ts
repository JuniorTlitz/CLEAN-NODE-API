/**
 * Ao invez de estanciar um erro cada vez, podemos fazer uma classe onde vai receber os erros
 */
export class InvalidParamsError extends Error {
  /**
   * Toda classe que extende de Error tem um construturor e para passar esse contrutor chamamos o metodo super passando o parametro faltando
   * @param paramName
   */
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamsError';
  }
}
