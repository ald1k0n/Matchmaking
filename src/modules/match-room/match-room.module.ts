import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { matchRoomProvider } from 'src/models/matchRoom/matchRoomProvider';
import { userProvider } from 'src/models';
import { MatchRoomController } from 'src/controllers/match-room/match-room.controller';
import { MatchRoomService } from 'src/services/match-room/match-room.service';

@Module({
  imports: [MongoModule],
  controllers: [MatchRoomController],
  providers: [...matchRoomProvider, ...userProvider, MatchRoomService],
  exports: [...matchRoomProvider, ...userProvider, MatchRoomService],
})
export class MatchRoomModule {}
