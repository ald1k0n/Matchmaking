import { Injectable } from '@nestjs/common';
import { IUser } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocketService {
  private queue: IUser[] = [];

  constructor(private readonly prisma: PrismaService) {}

  joinQueue(user: IUser) {
    this.queue.push(user);

    if (this.queue.length >= 4) {
      const result = this.createMatch();
      if (result) {
        return result;
      }
    }
  }

  private async createMatch() {
    const matchedUsers: IUser[] = [];

    for (let i = 0; i < this.queue.length - 1; i++) {
      if (Math.abs(this.queue[i].elo - this.queue[i + 1].elo) <= 100) {
        matchedUsers.push(this.queue[i], this.queue[i + 1]);
        i++;

        if (matchedUsers.length === 4) {
          this.removeFromQueue(matchedUsers);

          const shuffledUsers = this.shuffleArray(matchedUsers);

          const team1: IUser[] = shuffledUsers.slice(0, 2);
          const team2: IUser[] = shuffledUsers.slice(2);

          const { id: matchId } = await this.prisma.userMatch.create({
            data: {
              user: { connect: matchedUsers.map((user) => ({ id: user.id })) },
              matchRoom: {
                create: {
                  teamA: { connect: team1.map((user) => ({ id: user.id })) },
                  teamB: { connect: team2.map((user) => ({ id: user.id })) },
                },
              },
            },
          });

          return {
            event: 'match-found',
            data: {
              team1,
              team2,
              allUsers: matchedUsers,
              matchId,
            },
          };
        }
      }
    }
  }

  private removeFromQueue(usersToRemove: IUser[]) {
    this.queue = this.queue.filter((user) => !usersToRemove.includes(user));
    console.log(this.queue, 'queue');
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
