import { Inject, Injectable } from '@nestjs/common';
import { IUser } from 'src/types';
import { DB_PROVIDERS } from 'src/constants';
import { Model } from 'mongoose';
import { MatchRoom } from 'src/models/matchRoom/matchRoom.model';

interface Queue {
  _id: string;
  elo: number;
  socketId: string;
}

@Injectable()
export class SocketService {
  private queue: Queue[] = [];

  constructor(
    @Inject(DB_PROVIDERS.MATCHROOM_MODEL)
    private readonly matchRoom: Model<MatchRoom>,
  ) {}

  joinQueue(user: { _id: string; socketId: string; elo: number }) {
    this.queue.push(user);

    if (this.queue.length >= 4) {
      const result = this.createMatch();
      if (result) {
        return result;
      }
    }
    return {
      event: 'queue',
      data: `Users in queue ${this.queue.length}`,
    };
  }

  private async createMatch() {
    const matchedUsers: Queue[] = [];

    for (let i = 0; i < this.queue.length - 1; i++) {
      if (Math.abs(this.queue[i].elo - this.queue[i + 1].elo) <= 100) {
        matchedUsers.push(this.queue[i], this.queue[i + 1]);
        i++;

        if (matchedUsers.length === 4) {
          this.removeFromQueue(matchedUsers);

          const shuffledUsers = this.shuffleArray(matchedUsers);

          const team1: IUser[] = shuffledUsers.slice(0, 2);
          const team2: IUser[] = shuffledUsers.slice(2);

          const maxEloTeam1 = Math.max(...team1.map((user) => user.elo));
          const maxEloTeam2 = Math.max(...team2.map((user) => user.elo));
          const difference = Math.abs(maxEloTeam1 - maxEloTeam2);

          const matchRoom = await this.matchRoom.create({
            teamA: team1.map((u) => u._id),
            teamB: team2.map((u) => u._id),
            difference,
          });

          return {
            event: 'match-found',
            data: {
              team1,
              team2,
              allUsers: matchedUsers,
              matchId: matchRoom._id,
            },
          };
        }
      }
    }
  }

  private removeFromQueue(usersToRemove: Queue[]) {
    this.queue = this.queue.filter((user) => !usersToRemove.includes(user));
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
