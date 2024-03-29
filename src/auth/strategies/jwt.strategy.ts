/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { InjectModel } from "nestjs-typegoose"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserModel } from "src/user/user.model"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService,
        @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 'тут токен'
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate({ _id }: Pick<UserModel, '_id'>) { 
        //Pick -> забираем те поля UserModel которые нам нужны , в этом случае _id
        return this.UserModel.findById(_id).exec()
    }
    // exec() -> для выполнения запроса
}

