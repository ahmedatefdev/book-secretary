import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../jwt.strategy';

describe('AuthService', () => {
  let jwtStrategy: JwtStrategy;
  let authService: any;
  const mockAuthServices = () => ({
    validateUser: jest.fn(),
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: AuthService,
          useFactory: mockAuthServices,
        },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    authService = await module.get<AuthService>(AuthService);
  });

  it('should return user by the same condition', async () => {
    const res = { firstName: 'ahmed' };
    authService.validateUser.mockResolvedValue(res);
    await expect(
      jwtStrategy.validate({ email: 'ahmed@gmai.com' }),
    ).resolves.toEqual(res);
    expect(authService.validateUser).toBeCalledWith({
      email: 'ahmed@gmai.com',
    });
  });
});
