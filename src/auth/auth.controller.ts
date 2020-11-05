import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('login')
  Login(): Promise<void> {
    return this.authServices.Login();
  }
  @Post('signup')
  SignUp(): Promise<void> {
    return this.authServices.SignUp();
  }
  @Post('reset')
  ResetPassword(): Promise<void> {
    return this.authServices.ResetPassword();
  }
  @Post('logout')
  Logout(): Promise<void> {
    return this.authServices.Logout();
  }
}
