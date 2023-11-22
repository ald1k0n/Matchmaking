import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/services/auth/auth.service';

@Module({
  imports: [AuthModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class CoreModule {}
