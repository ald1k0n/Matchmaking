/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import { UserSchema } from './user.model';
import { DB_PROVIDERS } from 'src/constants';

export const userProvider = [
  {
    provide: DB_PROVIDERS.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DB_PROVIDERS.MONGODB_CONNECTION],
  },
];
