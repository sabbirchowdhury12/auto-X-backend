import { Driver, Profile, User } from '@prisma/client';

type TCreateDriver = User & Driver & Profile;

type TCreateDriverResponse = Omit<TCreateDriver, 'password'>;

export { TCreateDriver, TCreateDriverResponse };
