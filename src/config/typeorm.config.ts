import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as config from 'config';

const dbConfig: any = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};