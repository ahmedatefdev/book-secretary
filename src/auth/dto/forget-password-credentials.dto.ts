import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class ForgetPasswordDto {
  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com', title: 'Title' })
  email: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'www.example.com' })
  hostUrl: string;
}
