/* eslint-disable prettier/prettier */
import { 
    Body, 
    Controller, 
    HttpCode, 
    Post, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {

    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)      // выдает код 200 (при успешном запросе)
    @Post('register')   // тут обычно 201 код выдает
    async register(@Body() dto: AuthDto) {
        return this.AuthService.register(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)      // выдает код 200 (при успешном запросе)
    @Post('login')      // тут обычно 201 код выдает
    async login(@Body() dto: AuthDto) {
        return this.AuthService.login(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)      // выдает код 200 (при успешном запросе)
    @Post('login/access-token')      // тут обычно 201 код выдает
    async getNewTokens(@Body() dto: RefreshTokenDto) {
        return this.AuthService.getNewTokens(dto)
    }
}
