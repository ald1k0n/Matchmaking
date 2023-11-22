import * as mongoose from 'mongoose';

export const mongoProvider = [
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      return mongoose.connect(process.env?.DATABASE_URL);
    },
  },
];
