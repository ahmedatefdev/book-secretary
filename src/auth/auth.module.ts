import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport'; // passport module to inject it to app
import { JwtModule } from '@nestjs/jwt'; //  it will inject JWT module to the app
import { JwtStrategy } from './jwt.strategy'; // the strategy will be uses in the app
import { TypeOrmModule } from '@nestjs/typeorm'; // typeORM module to inject new entity to app
import { UserRepository } from './user.repository'; // user repository to inject it to typeorm

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRE_IN,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
