import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({
    example: 'access-token',
  })
  token: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty()
  password: string;
}
