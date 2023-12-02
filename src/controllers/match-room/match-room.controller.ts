import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchRoom } from 'src/models/matchRoom/matchRoom.model';
import { MatchRoomService } from 'src/services/match-room/match-room.service';

@Controller('match-room')
export class MatchRoomController {
  constructor(private readonly matchRoomService: MatchRoomService) {}

  @Get('/:id')
  async getMatches(@Param('id') id: string) {
    return await this.matchRoomService.getMatches(id);
  }

  @Get('/match/:matchId')
  async getMatchById(@Param() param: { matchId: string }) {
    return await this.matchRoomService.getMatch(param.matchId);
  }

  @Post('/match/:matchId')
  async setMatchWinner(
    @Param('matchId') matchId: string,
    @Body() body: Pick<MatchRoom, 'winner'>,
  ) {
    return await this.matchRoomService.setMatchResult(matchId, body.winner);
  }
}
