import { httpRequest, httpResponse } from '../protocols/http';
import { MissingParamsError } from '../errors/missing-params-error';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password'];
    // Ao invez de fazer um IF para cada field, um loop para abrangir todo os fields
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field));
      }
    }
  }
}
