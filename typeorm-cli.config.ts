import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';


config();

const configService = new ConfigService();
console.log(join(__dirname, './**/*.entity{.ts,.js}'));
console.log(join(__dirname, '../**/*.entity{.ts,.js}'));
console.log(join(__dirname, '../migrations/**/*{.ts,.js}'));

export default new DataSource({
  type: 'mysql',
  host: configService.get<string>('TYPEORM_HOST'),
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  entities: [],
  // entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  // migrationsRun: false,
  logging: false,
  // migrations: [join(__dirname, '../src/migrations/**/*{.ts,.js}')],
  // namingStrategy: new SnakeNamingStrategy(),
});
