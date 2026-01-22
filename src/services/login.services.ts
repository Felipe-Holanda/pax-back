import {sign} from 'jsonwebtoken'
import User from "../models/users.model";
import 'dotenv/config';
import { iLoginData } from "../@types/login";
import { compare } from "bcryptjs";
import { AppError } from "../errors/AppError.class";

class LoginService {
    constructor() {}

    public static async login(data: iLoginData): Promise<{token: string, user: any}> {
        const {username, password} = data;

        const foundUser = await User.findOne({username});

        if(!foundUser) throw new AppError("Usuário ou senha incorretos.", 401);

        const passwordMatch = await compare(password, foundUser.password);

        if(!passwordMatch) throw new AppError("Usuário ou senha incorretos.", 401);

        const token = await sign(
            {
                id: foundUser.id,
                isAdmin: foundUser.isAdmin,
                canPix: foundUser.canPix
            },
            process.env.SECRET_KEY!,
            { expiresIn: '1d' }
        );

        const user = {
            id: foundUser.id,
            username: foundUser.username,
            isAdmin: foundUser.isAdmin,
            canPix: foundUser.canPix,
            name: foundUser.name,
            city: foundUser.city,
            key: foundUser.key,
            key_type: foundUser.key_type
        };

        return { token, user };
    }

    public static async getMe(userId: string): Promise<any> {
        const foundUser = await User.findOne({id: userId}).select("-password");

        if(!foundUser) throw new AppError("Usuário não encontrado.", 404);

        return {
            id: foundUser.id,
            username: foundUser.username,
            isAdmin: foundUser.isAdmin,
            canPix: foundUser.canPix,
            name: foundUser.name,
            city: foundUser.city,
            key: foundUser.key,
            key_type: foundUser.key_type
        };
    }
}

export default LoginService;