import { Module } from '@nestjs/common';
import { SocketGateway } from './gateways/socket/socket.gateway';
import { SocketService } from './services/socket/socket.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './services/prisma/prisma.service';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
  controllers: [AuthController, UserController],
  providers: [SocketGateway, SocketService, PrismaService, AuthService, UserService],
})
export class AppModule {}
