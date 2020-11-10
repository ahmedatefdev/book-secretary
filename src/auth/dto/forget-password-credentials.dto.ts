import { IsString, MinLength, IsEmail } from 'class-validator';

export class ForgetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  hostUrl: string;
}
