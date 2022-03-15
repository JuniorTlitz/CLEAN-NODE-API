import { SignUpController } from './signup';
// Classe que vai lidar com os error
import { MissingParamsError } from '../errors/missing-params-error';
import { InvalidParamsError } from '../errors/invalid-params-error';
import { EmailValidator } from '../protocols/email-validator';

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

/**
 * Movendo a criação do SUT para um factory,
 * ao adicionar dependencias ao nossos controllers, não vamos precisar fazer estanciar em todos os testes, apenas injetamos no MAKESUT
 *
 */
const makeSut = (): SutTypes => {
  /**
   * Não estamos preocupados como essa classe valida email, apenas queremos testar os retornos dessa função
   * tomamos uma ação com o retorno da função
   * Temos que garantir que o EmailValidatorStub implementa a interface EmailValidator
   */
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut();
    /**
     * Enviando os dados sem o name, sendo um campo obrigatorio!
     * Tem que dar um erro 400 quando não enviamos um request sem o campo NAME
     */
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamsError('name'));
  });

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut();
    /**
     * Enviando os dados sem o email, sendo um campo obrigatorio!
     * Tem que dar um erro 400 quando não enviamos um request sem o campo EMAIL
     */
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamsError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut();
    /**
     * Enviando os dados sem o password, sendo um campo obrigatorio!
     * Tem que dar um erro 400 quando não enviamos um request sem o campo PASSWORD
     */
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamsError('password'));
  });

  test('Should return 400 if no password confirmation is provided', () => {
    const { sut } = makeSut();
    /**
     * Enviando os dados sem o password confirmation, sendo um campo obrigatorio!
     * Tem que dar um erro 400 quando não enviamos um request sem o campo PASSWORD
     */
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('passwordConfirmation'),
    );
  });

  // ? Todos os campos foram validados

  // todo --- Validar se o email é valido
  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    /**
     * Mockando o valor do EmailValidatorStub de TRUE para FALSE
     * Spy serve para simular a interação com o objeto, o mock era TRUE e com essa função ele passa a ter o valor como false
     */
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    /**
     * Enviando um request com todos os parametros, e vamos validar se o EMAIL é valido
     */
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com', // não faz diferença o texto, apenas para dar mais semantica
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamsError('email'));
  });
});
