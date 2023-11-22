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
}
