import {sign} from 'jsonwebtoken'
import User from "../models/users.model";
import 'dotenv/config';
import { iLoginData } from "../@types/login";
import { compare } from "bcryptjs";
import { AppError } from "../errors/AppError.class";

class LoginService {
    constructor() {}

    public static async login(data: iLoginData): Promise<string> {
        const {username, password} = data;

        const foundUser = await User.findOne({username});

        if(!foundUser) throw new AppError("Usuário ou senha incorretos.", 401);

        const passwordMatch = await compare(password, foundUser.password);

        if(!passwordMatch) throw new AppError("Usuário ou senha incorretos.", 401);

        const token = await sign({id: foundUser.id}, process.env.SECRET_KEY!, { expiresIn: '1d' });

        return token;
    }
}

export default LoginService;