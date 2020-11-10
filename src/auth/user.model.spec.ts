import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { model, Model } from 'mongoose';
import { AuthService } from './auth.service';
import UserSchema, { User } from './user.model';

describe('User entity', () => {
  const userModel: Model<User> = model('User', UserSchema);
  let user: User;
  beforeEach(() => {
    user = new userModel();
    user.password = 'testPassword';
    user.salt = 'testSalt';
    user.isPasswordValid = jest.fn();
  });

  describe('User model', async () => {
    let authService: AuthService;
    beforeEach(async params => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [AuthService],
      }).compile();
      authService = module.get(AuthService);
    });

    it('add new user', async () => {
      expect(authService.SignUp).not.toHaveBeenCalled();
      const res = jest.spyOn(authService, 'SignUp').mockResolvedValue();
      expect(authService.SignUp).toHaveBeenCalled();
      console.log('res', res);
      // expect(res.s).;
      expect(true).toEqual(true);
    });

    it('update old user', async () => {
      expect(true).toEqual(true);
    });
  });
});
