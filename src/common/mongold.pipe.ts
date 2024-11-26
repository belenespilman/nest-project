import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { IsMongoId } from 'class-validator';

@Injectable()
export class MongoldPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!IsMongoId(value)) {
      throw new BadRequestException(`${value} no es un id de Mongo`);
    }
    return value;
  }
}
