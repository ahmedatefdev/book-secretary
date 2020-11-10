import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport'; // passport module to inject it to app
import { JwtModule } from '@nestjs/jwt'; //  it will inject JWT module to the app
import { JwtStrategy } from './jwt.strategy'; // the strategy will be uses in the app
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from './user.model';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRE_IN,
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
