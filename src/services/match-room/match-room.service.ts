import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { DB_PROVIDERS } from 'src/constants';
import { User } from 'src/models';
import { MatchRoom } from 'src/models/matchRoom/matchRoom.model';

@Injectable()
export class MatchRoomService {
  constructor(
    @Inject(DB_PROVIDERS.MATCHROOM_MODEL) private matchRoom: Model<MatchRoom>,
    @Inject(DB_PROVIDERS.USER_MODEL) private user: Model<User>,
  ) {}

  async getMatches(_id: string) {
    const matches = await this.matchRoom
      .find({
        $or: [
          { teamA: { $in: [_id] } }, // _id in teamA
          { teamB: { $in: [_id] } }, // _id in teamB
        ],
      })
      .populate('teamA', 'nickname')
      .populate('teamB', 'nickname');
    return matches;
  }

  async getMatch(matchId: string) {
    const match = await this.matchRoom
      .findOne({
        _id: matchId,
      })
      .populate('teamA', 'nickname')
      .populate('teamB', 'nickname');
    if (!match) throw new NotFoundException('Match not found');
    return match;
  }

  async setMatchResult(_id: string, winner: string) {
    const updatedMatch = await this.matchRoom.updateOne(
      { _id },
      {
        $set: {
          winner,
        },
      },
    );
    if (!updatedMatch) throw new NotFoundException('Match not found');

    return updatedMatch;
  }
}
