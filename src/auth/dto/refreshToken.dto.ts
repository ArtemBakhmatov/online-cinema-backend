/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class RefreshTokenDto {
    @IsString({
        message: 'You did not pass refresh token or it is not a string!'
    })  // проверка что тут должна быть строка
    refreshToken: string
}