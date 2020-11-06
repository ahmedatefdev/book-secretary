import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class AuthSignupCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(255)
  lastName: string;

  @IsOptional()
  cover: any;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
