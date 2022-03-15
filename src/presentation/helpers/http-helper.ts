import { httpResponse } from '../protocols/http';

/**
 * Uma função que retornar um badRequest, ao inves de retornar varios objetos na classe de produção
 * @param error
 * @returns
 */
export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400, //bad request
  body: error,
});
