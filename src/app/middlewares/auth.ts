/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { verifyToken } from '../../helpers/jwt';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const verifiedUser = verifyToken(token, config.jwt.secret as Secret);

      //set user information in req
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!!');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
