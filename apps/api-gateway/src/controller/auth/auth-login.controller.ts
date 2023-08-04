
import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthLoginService, JWTPayload} from '../../service/auth/auth-login.service';
import { LoginDto } from './dto/auth-login.dto';
@Controller('login')
export class AuthLoginController {

    constructor(
        private readonly authLoginService: AuthLoginService
    ){}

    @Post()
    public async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
        try {
        const { username, password } = body;       
        const valid = await this.authLoginService.validateUser(username, password);
        if(!valid){
            throw new UnauthorizedException();
        }
        return await this.authLoginService.generateAccessToken(username)
    } catch (error) {
        return error.message
      }
    }
}