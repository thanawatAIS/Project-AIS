import { Request } from 'express';

export function getOriginHeader(req: Request): string {
  return req.headers.origin || '';
}
