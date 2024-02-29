/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { hash, genSalt, compare } from 'bcryptjs';
// genSalt -> генерирует нашу соль
// compare -> для авторизации, для входа в систему (сравнение)
// hash -> асинхронная операция
import { UserModel } from 'src/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refreshToken.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
        private readonly jwtService: JwtService
    ) {
        
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto);

        const tokens = await this.issueTokenPair(String(user._id))

        return {
            user: this.returnUserFields(user),
            ...tokens
        } 
    }

    async getNewTokens({ refreshToken }: RefreshTokenDto) {
        if (!refreshToken) throw new UnauthorizedException('Please sign in!'); // войдите в систему

        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result) throw new UnauthorizedException('Invalid token or expired!');
        // токен не валидный или закончился

        const user = await this.UserModel.findById(result._id);

        const tokens = await this.issueTokenPair(String(user._id));

        return {
            user: this.returnUserFields(user),
            ...tokens
        } 
    }
    
    async register(dto: AuthDto) {
        const oldUser = await this.UserModel.findOne({ email: dto.email });

        if (oldUser) // тут проверка на одинаковые почты
            throw new BadRequestException('User with this email is already in the system!');

        const salt = await genSalt(10); // можно поставить любую цифру, но поставим 10

        const newUser = new this.UserModel({
            email: dto.email,
            password: await hash(dto.password, salt) // зашифровали наш пароль
        });

        const tokens = await this.issueTokenPair(String(newUser._id)); // String -> конвертируем в строку

        return {
            user: this.returnUserFields(newUser),
            ...tokens // токены рядом с друг другом (не объект токенов)
        }
    }

    async validateUser(dto: AuthDto):Promise<UserModel> {
        // :Promise<UserModel> -> возвращаем конкретный UserModel, тут его не обязательно писать
        const user = await this.UserModel.findOne({ email: dto.email });
        if (!user) throw new UnauthorizedException('User not found!');

        const isValidPassword = await compare(dto.password, user.password); // сравнение паролей
        if (!isValidPassword) throw new UnauthorizedException('Invalid password!');

        return user;
    }
 
    async issueTokenPair(userId: string) { // создать пару токенов
        const data = { _id: userId };

        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d' // 15 дней
        });

        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h' // 1 час
        });

        return { refreshToken, accessToken }
    }

    returnUserFields(user: UserModel) { // получать нашего юзера
        return { // будем возвращать те поля которые нам нужны 
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }
    }
}
