import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}`,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
  providers: [
    {
      inject: [config.KEY],
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}`;
        const client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
