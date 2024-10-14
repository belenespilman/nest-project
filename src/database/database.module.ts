import { Global, Module } from '@nestjs/common';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Global()
@Module({
  providers: [
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
  ],
  exports: ['APIKEY'],
})
export class DatabaseModule {}
