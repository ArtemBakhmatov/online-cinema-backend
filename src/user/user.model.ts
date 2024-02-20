/* eslint-disable prettier/prettier */
import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export interface userModel extends Base {}
export class UserModel extends TimeStamps {
    @prop({ unique: true }) // наш email должен быть уникальным
    email: string

    @prop()
    password: string

    @prop({ default: false }) // по дефолту все юзеры не админы
    isAdmin?: boolean

    @prop({ default: []})
    favorites?: []
}

// TimeStamps -> он нужен для того чтобы когда создана коллекция и когда она обновлена
// Base -> Это id