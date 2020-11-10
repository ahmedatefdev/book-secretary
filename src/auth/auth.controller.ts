import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ForgetPasswordDto } from './dto/forget-password-credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthSignupCredentialsDto } from './dto/user-signup-credentials.dto';
import { User } from './user.model';

@Controller()
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signup')
  async SignUp(
    @Body(ValidationPipe) signupCredentialsDto: AuthSignupCredentialsDto,
  ): Promise<void> {
    return this.authServices.SignUp(signupCredentialsDto);
  }

  @Post('login')
  Login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authServices.Login(authCredentialsDto);
  }
  @Post('forgetpassword')
  async ForgetPassword(
    @Body(ValidationPipe) forgetPasswordDto: ForgetPasswordDto,
  ): Promise<string> {
    return this.authServices.ForgetPassword(forgetPasswordDto);
  }

  @Post('reset')
  ResetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return this.authServices.ResetPassword(resetPasswordDto);
  }
}
