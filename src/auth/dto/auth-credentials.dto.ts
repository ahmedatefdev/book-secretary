import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  password: string;
}
