import config from '../config';
import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

const createToken = (
  payload: Record<string, unknown>,
  tokenType: 'access' | 'refresh',
): string => {
  if (tokenType === 'access') {
    return sign(payload, config.jwt.secret as Secret, {
      expiresIn: config.jwt.expires_in,
    });
  } else {
    return sign(payload, config.jwt.refresh_secret as Secret, {
      expiresIn: config.jwt.refresh_expires_in,
    });
  }
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  try {
    return verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }
};

export { createToken, verifyToken };
