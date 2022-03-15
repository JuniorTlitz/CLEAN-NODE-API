import { SignUpController } from './signup';
import { MissingParamsError } from '../errors/missing-params-error'; // Classe que vai lidar com os error

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
});
