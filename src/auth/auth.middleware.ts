import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Nieprawidłowy token uwierzytelniania');
    }

    try {
      const decodedToken = jwt.verify(token, 'TWOJ_TAJNY_KLUCZ');
      req['user'] = decodedToken;
      next();
    } catch (error) {
      throw new UnauthorizedException('Nieprawidłowy token uwierzytelniania');
    }
  }
}
