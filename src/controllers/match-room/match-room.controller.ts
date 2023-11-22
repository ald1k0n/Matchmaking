import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { MatchRoomService } from 'src/services/match-room/match-room.service';

@Controller('match-room')
export class MatchRoomController {
  constructor(private readonly matchRoomService: MatchRoomService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getMyMatches(@Req() req: any) {
    // return req.user;
    return this.matchRoomService.getMyMatches(req.user.id);
  }
}
