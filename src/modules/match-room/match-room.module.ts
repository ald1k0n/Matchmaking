import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { matchRoomProvider } from 'src/models/matchRoom/matchRoomProvider';
import { userProvider } from 'src/models';
import { MatchRoomController } from 'src/controllers/match-room/match-room.controller';

@Module({
  imports: [MongoModule],
  controllers: [MatchRoomController],
  providers: [...matchRoomProvider, ...userProvider],
  exports: [...matchRoomProvider, ...userProvider],
})
export class MatchRoomModule {}
