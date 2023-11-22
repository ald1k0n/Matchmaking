import * as mongoose from 'mongoose';
import { config } from 'dotenv';

config({
  path: '.env',
});
export const mongoProvider = [
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      return mongoose.connect(process.env?.DATABASE_URL);
    },
  },
];
