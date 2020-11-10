import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthSignupCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty()
  password: string;
}
export class SignUpBody {
  @ApiProperty()
  user: AuthSignupCredentialsDto;
}
