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


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
    ) {
        
    }

    async login(dto: AuthDto) {
        return this.validateUser(dto)
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
        return newUser.save();
    }

    async validateUser(dto: AuthDto):Promise<UserModel> {
        // :Promise<UserModel> -> возвращаем конкретный UserModel, тут его не обязательно писать
        const user = await this.UserModel.findOne({ email: dto.email });
        if (!user) throw new UnauthorizedException('User not found!');

        const isValidPassword = await compare(dto.password, user.password); // сравнение паролей
        if (!isValidPassword) throw new UnauthorizedException('Invalid password!');

        return user;
    }
}
