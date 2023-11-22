import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { CoreModule } from './modules/core/core.module';
import { MongoModule } from './modules/mongo/mongo.module';
import { userProvider } from './models';
import { QueueModule } from './modules/queue/queue.module';
import { MatchRoomModule } from './modules/match-room/match-room.module';
import { MatchRoomService } from './services/match-room/match-room.service';
import { MatchRoomController } from './controllers/match-room/match-room.controller';

@Module({
  imports: [CoreModule, AuthModule, MongoModule, QueueModule, MatchRoomModule],
  controllers: [UserController, AuthController, MatchRoomController],
  providers: [UserService, ...userProvider, MatchRoomService],
})
export class AppModule {}
