import { httpRequest, httpResponse } from '../protocols/http';
import { MissingParamsError } from '../errors/missing-params-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamsError } from '../errors/invalid-params-error';
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }
  handle(httpRequest: httpRequest): httpResponse {
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
    const isValid = this.emailValidator.isValid(httpRequest.body.email);
    if (!isValid) {
      return badRequest(new InvalidParamsError('email'));
    }
  }
}
