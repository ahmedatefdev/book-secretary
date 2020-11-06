import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    'mongodb+srv://u101_test:KWj2z5iJjp0Id4Nm@clusternest.napxi.mongodb.net/c4t_books_api?retryWrites=true&w=majority',
  database: 'books_api',
  useNewUrlParser: true,
  logging: true,
  ssl: true,
  // useUnifiedTopology: true,
  entities: [join(__dirname, '/**/*.entity.{js,ts}')],
  synchronize: true,
};
export default typeOrmConfig;
