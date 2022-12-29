import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookStatus } from '../books.interface';

export class BookStatusValidationPipe implements PipeTransform {
  readonly statuses = [BookStatus.IN_REVIEW, BookStatus.PUBLISHED];

  private isValid(status: BookStatus) {
    return this.statuses.includes(status);
  }

  transform(value: BookStatus) {
    if (!this.isValid(value)) {
      throw new BadRequestException(`Not valid status: ${value}`);
    }

    return value;
  }
}
