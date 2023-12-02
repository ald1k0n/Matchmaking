import { Controller, Get, Param } from '@nestjs/common';
import { MatchRoomService } from 'src/services/match-room/match-room.service';

@Controller('match-room')
export class MatchRoomController {
  constructor(private readonly matchRoomService: MatchRoomService) {}

  @Get('/:id')
  async getMatches(@Param('id') id: string) {
    return this.matchRoomService.getMatches(id);
  }

  @Get('/:id/:matchId')
  async getMatchById(@Param() param: { id: string; matchId: string }) {
    return param;
  }
}
