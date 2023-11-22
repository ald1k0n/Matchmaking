import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from '../mongo/mongo.module';
import { userProvider } from 'src/models';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...userProvider],
  exports: [AuthService, ...userProvider],
  imports: [
    MongoModule,

    JwtModule.register({
      global: true,
      secret: process.env?.ACCESS_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
})
export class AuthModule {}
