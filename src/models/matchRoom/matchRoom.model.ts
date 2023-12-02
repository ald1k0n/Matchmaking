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
  winner: {
    type: String,
    enum: ['TeamA', 'TeamB', 'INGAME', 'CANCELED'],
    default: 'INGAME',
  },
});

export interface MatchRoom extends mongoose.Document {
  readonly teamA: string;
  readonly teamB: string;
  readonly difference: number;
  readonly winner: 'TeamA' | 'TeamB' | 'INGAME' | 'CANCELED';
}
