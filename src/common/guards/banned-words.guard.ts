import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { bannedWords } from '../constants/bannedwords';

@Injectable()
export class BannedWordsGuard implements CanActivate {
  private numberOfEditAttempts = 1;
  private readonly maxNumberOfEditAttempts = 3;
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const description = request.body.description;
    const title = request.body.title;

    if (this.numberOfEditAttempts >= this.maxNumberOfEditAttempts) {
      throw new BadRequestException(
        'You have reached the maximum number of edit attempts for this advertisement.',
      );
    }
    const containsBannedWords = this.checkForBannedWords(
      description,
      title,
      bannedWords,
    );
    if (containsBannedWords) {
      // Increment the edit attempt counter if bad words are found
      this.numberOfEditAttempts++;
      throw new BadRequestException(
        'The description or title contains invalid words',
      );
    }
    return true;
  }

  private checkForBannedWords(
    title: string,
    description: string,
    bannedWords: string[],
  ): boolean {
    if (!description || !title) {
      throw new BadRequestException('Description or title is empty');
    }
    for (const word of bannedWords) {
      if (description.includes(word) || title.includes(word)) {
        return true; // Bad word found
      }
    }
    return false; // No bad words found
  }
}
