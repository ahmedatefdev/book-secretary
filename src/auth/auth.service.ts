import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import MODELS_NAMES from '../models-names.enum';
import { AuthSignupCredentialsDto } from './dto/user-signup-credentials.dto';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import DB_ERROR_CODES from '../db-error-codes.enum';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { ForgetPasswordDto } from './dto/forget-password-credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(
    @InjectModel(MODELS_NAMES.User)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger('Auth');
  }

  async SignUp(signupCredentialsDto: AuthSignupCredentialsDto): Promise<void> {
    try {
      const newUser = await this.createNewUser(signupCredentialsDto);
      await newUser.save();
    } catch (error) {
      if (error.code == DB_ERROR_CODES.DB_CONFLICT_CODE)
        throw new ConflictException('email already exists');
      else throw new InternalServerErrorException();
    }
  }

  async Login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUserCredentials(authCredentialsDto);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload: JwtPayload = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token (${accessToken}) with payload (${JSON.stringify(
        payload,
      )}) `,
    );
    return { accessToken };
  }

  async validateUser({ email }: JwtPayload) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async ForgetPassword({ email, hostUrl }: ForgetPasswordDto): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('email Not found.');
    const token = this.jwtService.sign(
      { email },
      { expiresIn: '20m', secret: process.env.JWT_SECRET_RESET },
    );
    const mailOptions = this.CreateMailOptions(user, hostUrl, token);
    this.logger.debug(
      `Generated JWT Token (${token}) with payload (${email}) to reset password `,
    );
    const mailRes = this.sendMail(mailOptions);
    if (mailRes.statusCode === 202)
      return `An e-mail has been sent to ${user.email}`;
    else throw new InternalServerErrorException('mail not sent');
  }

  async ResetPassword({ token, password }: ResetPasswordDto): Promise<void> {
    try {
      const { email }: { email: string } = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_RESET,
      });
      const user = await this.userModel.findOne({ email });
      if (!user) throw new NotFoundException('email Not found.');
      user.password = await bcrypt.hash(password, user.salt);
      await user.save();
    } catch (error) {
      throw new NotAcceptableException('token not valid or expired');
    }
  }

  private async createNewUser(signUpCredentialsDto: AuthSignupCredentialsDto) {
    const { firstName, lastName, email, password } = signUpCredentialsDto;

    const user = new this.userModel();
    user.first_name = firstName;
    user.last_name = lastName;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    return user;
  }

  private async validateUserCredentials(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User | null> {
    const { email, password } = authCredentialsDto;
    const user = await this.userModel.findOne({ email });

    if (user && (await user.isPasswordValid(password))) return user;
    else return null;
  }

  private CreateMailOptions(user: User, hostUrl: string, token: string) {
    return {
      to: user.email,
      from: process.env.SENDGRID_API_EMAIL,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
      
      Please click on the following link, or paste this into your browser to complete the process:
      https://${hostUrl}/reset/${token}
      
      If you did not request this, please ignore this email and your password will remain unchanged.`,
    };
  }

  private sendMail(mailOptions: {
    to: string;
    from: string;
    subject: string;
    text: string;
  }) {
    // implement the SendGrid code or any provider to send mail
    return {
      statusCode: 202,
      mailOptions,
    };
  }
}
