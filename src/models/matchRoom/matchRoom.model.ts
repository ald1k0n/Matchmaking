/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const matchRoomSchema = new mongoose.Schema({
  teamA: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  teamB: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  difference: Number,
});

export interface MatchRoom extends mongoose.Document {
  readonly teamA: string;
  readonly teamB: string;
  readonly difference: string;
}
