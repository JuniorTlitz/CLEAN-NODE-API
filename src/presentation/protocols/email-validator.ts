/**
 * Criando uma interface para desacoplar qualquer implementação concreta de uma classe
 */
export interface EmailValidator {
  isValid(email: string): boolean;
}
