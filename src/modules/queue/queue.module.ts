import { Module } from '@nestjs/common';
import { SocketGateway } from 'src/gateways/socket/socket.gateway';
import { matchRoomProvider } from 'src/models/matchRoom/matchRoomProvider';
import { SocketService } from 'src/services/socket/socket.service';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [SocketGateway, SocketService, ...matchRoomProvider],
  exports: [SocketGateway, SocketService, ...matchRoomProvider],
})
export class QueueModule {}
