/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IUser } from 'src/types';
import { SocketService } from 'src/services/socket/socket.service';

@WebSocketGateway({
  cors: {
    origin: true,
  },
  namespace: 'queue',
})
export class SocketGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(client: any) {
    this.server.to(client.id).emit('connection', {
      message: `Connected`,
      id: client.id,
    });
  }

  @SubscribeMessage('join-queue')
  async queuePrep(
    @MessageBody() body: IUser,
    @ConnectedSocket() client: Socket,
  ) {
    const { event, data } = await this.socketService.joinQueue({
      socketId: client.id,
      elo: body.elo,
      id: body.id,
    });

    //@ts-ignore
    data.allUsers?.forEach((user: IUser) => {
      this.server
        .to(user.socketId)

        .emit(event, {
          //@ts-ignore
          team1: data.team1,
          //@ts-ignore
          team2: data.team2,
          //@ts-ignore
          matchId: data.matchId,
        });
    });
  }
}
