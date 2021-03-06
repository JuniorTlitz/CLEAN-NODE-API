import {
  httpRequest,
  httpResponse,
  Controller,
  EmailValidator,
  AddAccount,
} from './signup-protocols';
import { MissingParamsError, InvalidParamsError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helper';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;
  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }
  handle(httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      // Ao invez de fazer um IF para cada field, um loop para abrangir todo os fields
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field));
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'));
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'));
      }

      this.addAccount.add({
        name,
        email,
        password,
      });
    } catch (error) {
      return serverError();
    }
  }
}
