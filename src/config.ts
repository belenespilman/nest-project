import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },

    apiKey: process.env.APIKEY,
    jwtSecret: process.env.JWTSECRET,

    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_ROOT_USER,
      password: process.env.MONGO_ROOT_PASSWORD,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
      uri: process.env.MONGO_URI,
    },
  };
});
