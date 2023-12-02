import { Injectable, Inject } from '@nestjs/common';
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
}
