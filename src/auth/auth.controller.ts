import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ForgetPasswordDto } from './dto/forget-password-credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthSignupCredentialsDto } from './dto/user-signup-credentials.dto';
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'User SignUp' })
  @ApiBody({ type: AuthSignupCredentialsDto })
  async SignUp(
    @Body(ValidationPipe) signupCredentialsDto: AuthSignupCredentialsDto,
  ): Promise<void> {
    return this.authServices.SignUp(signupCredentialsDto);
  }

  @Post('login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: AuthCredentialsDto })
  Login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authServices.Login(authCredentialsDto);
  }

  @Post('forgetpassword')
  @ApiOkResponse({ description: 'An e-mail has been sent to user email' })
  @ApiNotFoundResponse({ description: 'email not found' })
  @ApiBody({ type: ForgetPasswordDto })
  async ForgetPassword(
    @Body(ValidationPipe) forgetPasswordDto: ForgetPasswordDto,
  ): Promise<string> {
    return this.authServices.ForgetPassword(forgetPasswordDto);
  }

  @Post('reset')
  @ApiOkResponse({
    description: 'User reset password',
  })
  @ApiNotFoundResponse({ description: 'email not found' })
  @ApiNotAcceptableResponse({ description: 'token not valid' })
  @ApiBody({ type: ResetPasswordDto })
  ResetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return this.authServices.ResetPassword(resetPasswordDto);
  }
}
