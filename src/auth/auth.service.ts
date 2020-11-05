import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  Login(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  SignUp(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  ResetPassword(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  Logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
