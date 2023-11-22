import { Test, TestingModule } from '@nestjs/testing';
import { MatchRoomController } from './match-room.controller';

describe('MatchRoomController', () => {
  let controller: MatchRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchRoomController],
    }).compile();

    controller = module.get<MatchRoomController>(MatchRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
