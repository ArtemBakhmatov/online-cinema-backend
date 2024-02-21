/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength } from "class-validator"

export class AuthDto {
    @IsEmail()      // проверка
    email: string
    @MinLength(6, {
        message: 'Password cannot be less than 6 characters!',
    })   // ограничение по символам при введении пароля
    @IsString()     // проверка
    password: string
}