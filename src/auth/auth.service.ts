import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  Login(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  SignUp(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  ResetPassword(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
