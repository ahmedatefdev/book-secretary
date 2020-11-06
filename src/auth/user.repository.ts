import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import DB_ERROR_CODES from '../db-error-codes.enum';
import { AuthSignupCredentialsDto } from './dto/user-signup-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  // async signUp(authCredentialsDto: AuthSignupCredentialsDto): Promise<void> {
  //   const user = await this.createNewUser(authCredentialsDto);
  //   try {
  //     await user.save();
  //   } catch (error) {
  //     if (error.code === DB_ERROR_CODES.DB_CONFLICT_CODE) {
  //       throw new ConflictException('email already exists');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }

  // async validateUserPassword(
  //   authCredentialsDto: AuthCredentialsDto,
  // ): Promise<string> {
  //   const { email, password } = authCredentialsDto;
  //   const user = await this.findOne({ email });

  //   if (user && (await user.isPasswordValid(password))) {
  //     return user.email;
  //   } else {
  //     return null;
  //   }
  // }

  // async createNewUser(authCredentialsDto: AuthSignupCredentialsDto) {
  //   const { firstName, lastName, cover, email, password } = authCredentialsDto;

  //   const user = new User();
  //   user.first_name = firstName;
  //   user.last_name = lastName;
  //   user.cover = cover;
  //   user.email = email;
  //   user.salt = await bcrypt.genSalt(); //! generate new salt for every user and save it in db
  //   user.password = await bcrypt.hash(password, user.salt); // hash the pass with the salt
  //   return user;
  // }
}
