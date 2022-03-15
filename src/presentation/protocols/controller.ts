import { httpRequest, httpResponse } from './http';

/**
 * Interface para implementar um padrão para todos os controladores temrem esse assinatura
 */
export interface Controller {
  handle(httpRequest: httpRequest): httpResponse;
}
