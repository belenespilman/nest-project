import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import config from '../config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('config.mongo.uri');
        try {
          console.log('Conectando a MongoDB Atlas...');

          mongoose.connection.on('connected', () => {
            console.log('Conexión exitosa a MongoDB Atlas');
          });

          mongoose.connection.on('error', (error) => {
            console.error('Error en la conexión con MongoDB:', error);
          });

          await mongoose.connect(uri);
        } catch (error) {
          console.error('Error al conectar a MongoDB Atlas:', error);
        }
        return {
          uri: uri,
          useNewUrlParser: true,
        };
      },
    }),
  ],

  exports: [MongooseModule],
})
export class DatabaseModule {}
