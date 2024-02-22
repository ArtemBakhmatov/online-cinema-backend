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

    /* 
        пока тут добавил id так как Base не работает, при логине (зарегистрированный логин) 
        все нормально работает, а при новой регистрации выдает баг, или Base на другую версию 
        переустановить или в 7 уроке будет известно по ошибке, мне кажется что лучше версию другую 
        поставить, пока оставлю так 
    */
    @prop() // при успешном Base обязательно удалить _id
    _id: string
}

// TimeStamps -> он нужен для того чтобы когда создана коллекция и когда она обновлена
// Base -> Это id