import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

export interface JwtPayload {
  userId: string;
  // TODO: Add Role or permissions here
}

export interface SignInDto {
  email: string;
  password: string;
}

export enum LoginStatus {
  success = 'SUCCESS',
}

export interface LoginResponse {
  token: string;
  userId: string;
  status: LoginStatus;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn({ email, password }: SignInDto): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(email);
    if (!user) { throw new UnauthorizedException('Invalid Username or Password'); }

    if (await user.comparePassword(password)) {
      const tokenPayload: JwtPayload = { userId: user.id };
      const token = this.jwtService.sign(tokenPayload);

      return ({ token, userId: user.id, status: LoginStatus.success });
    } else {
      throw new UnauthorizedException('Invalid Username or Password');
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findById(payload.userId);
  }
}
