import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  login(user: User): UserToken {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    }

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined
        };
      }
    }

    throw new UnauthorizedError('Invalid credentials.');
  }
}
