import { SetMetadata } from '@nestjs/common';

export const PublicDecorator = (...args: string[]) =>
  SetMetadata('public-decorator', args);

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
