import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  // constructor(private readonly authServices: AuthService) {}

  // @Post('login')
  // Login(): Promise<void> {
  //   return this.authServices.Login();
  // }
  @Post('signup')
  SignUp(): string {
    // return this.authServices.SignUp();
    return 'singup true';
  }
  // @Post('reset')
  // ResetPassword(): Promise<void> {
  //   return this.authServices.ResetPassword();
  // }
}
