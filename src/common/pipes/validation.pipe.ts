import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringValidationPipe implements PipeTransform<string, string> {
  public transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Validatoin failed');
    }
    return value;
  }
}
