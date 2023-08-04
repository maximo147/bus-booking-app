import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt'
import { UserService } from '../user-service/user.service';

export interface JWTPayload {
  userId: string;
  roles: string
}


@Injectable()
export class AuthLoginService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<boolean> {
    try {
      const user = await this.usersService.getByName(username).toPromise()
      if (!user) {
        return false; // El usuario no existe
      }
      const resp = await bcrypt.compare(password, user.password);
      return resp
    } catch (error) {
      return error.message
    }
  }

  async generateAccessToken(username: string) {
    try {
      const user = await this.usersService.getByName(username).toPromise();
      if (!user) {
        throw new Error('Usuario y/o contraseña incorrecto');
      }

      const payload: JWTPayload = { userId: user.id_user, roles: user.role.name };
      const secretOrPrivateKey = 'ouhuhujhjhnljhlkhljhlkjuh'

      const accessToken = this.jwtService.sign(payload, { secret: secretOrPrivateKey });
      return {
        metadata: {
          access_token: accessToken,
          username: user.username,
          role: user.role.name,
          id: user.id_user       
        }
      };
    } catch (error) {
      return error.message
    }
  }
}