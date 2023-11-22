/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  steamId: {
    type: String,
  },
  elo: {
    type: Number,
    default: 800,
  },
});

export interface User extends mongoose.Document {
  readonly nickname: string;
  readonly password: string;
  readonly steamId: string;
}
