import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const pnv = process.env;

export default {
  env: pnv.NODE_ENV,
  port: pnv.PORT,
  jwt: {
    secret: pnv.JWT_SECRET,
    expires_in: pnv.JWT_EXPIRES_IN,
    refresh_secret: pnv.JWT_REFRESH_SECRET,
    refresh_expires_in: pnv.JWT_REFRESH_EXPIRES_IN,
  },
  bcrypt_slat_round: pnv.BCRYPT_SALT_ROUNDS,
};
