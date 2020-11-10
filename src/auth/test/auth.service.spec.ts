import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthSignupCredentialsDto } from '../dto/user-signup-credentials.dto';
import { JwtStrategy } from '../jwt.strategy';
import UserSchema from '../user.model';
import { isDefined } from 'class-validator';
import {
  ConflictException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let user1: AuthSignupCredentialsDto;
  let mongod: MongoMemoryServer;
  let jwt: any;
  let uri: string;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    uri = await mongod.getUri();
    console.log('uri', uri);
    console.log(
      'mongod.getInstanceInfo()',
      isDefined(mongod.getInstanceInfo()),
    );
  });

  afterAll(async () => {
    await mongod.stop();
    console.log('mongod.getInstanceInfo() Stop!!> ', mongod.getInstanceInfo());
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.EXPIRE_IN,
          },
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forRoot(uri, {
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();
    service = module.get<AuthService>(AuthService);
    jwt = module.get<JwtService>(JwtService);
    user1 = {
      firstName: 'ahmed',
      lastName: 'ali101',
      email: 'ahmed@gmail.com',
      password: '12345@121321321g;A',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add new User', async () => {
    expect(await service.SignUp(user1)).not.toBeDefined();
  });

  it('should Not dedicate user by the same email', async () => {
    await expect(service.SignUp(user1)).rejects.toThrow(ConflictException);
  });

  it('should return token for login user', async () =>
    expect(await service.Login(user1)).not.toBeNull());

  it('should throw error if the user give the wrong credentials', async () => {
    await expect(
      service.Login({ email: user1.email, password: 'sad@A' }),
    ).rejects.toThrow(UnauthorizedException);
    await expect(
      service.Login({ email: user1.email + 'con', password: user1.password }),
    ).rejects.toThrow(UnauthorizedException);
    await expect(
      service.Login({ email: 'ahmedsss@gmial.com', password: 'sadasdasd@A' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should forget password  generate new token ', async () => {
    jwt.sign = jest.fn();
    expect(jwt.sign).not.toHaveBeenCalled();
    await service.ForgetPassword({ email: user1.email, hostUrl: '' });
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: user1.email },
      { expiresIn: '20m', secret: process.env.JWT_SECRET_RESET },
    );
  });

  it('should reset password with null respond', async () => {
    jwt.verify = jest.fn();
    jwt.verify.mockResolvedValue({ email: user1.email });
    await expect(
      service.ResetPassword({
        token: 'user1.email',
        password: 'sadasdas@A',
      }),
    ).resolves.toBeUndefined();
  });

  it('should not reset the password and throw error', async () => {
    jwt.verify = jest.fn();
    jwt.verify.mockResolvedValue({ email: user1.email + 'ads' });
    await expect(
      service.ResetPassword({
        token: '',
        password: '',
      }),
    ).rejects.toThrow(NotAcceptableException);
  });
});
