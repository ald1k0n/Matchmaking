/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import { matchRoomSchema } from './matchRoom.model';
import { DB_PROVIDERS } from 'src/constants';

export const matchRoomProvider = [
  {
    provide: DB_PROVIDERS.MATCHROOM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('matchRoom', matchRoomSchema),
    inject: [DB_PROVIDERS.MONGODB_CONNECTION],
  },
];
