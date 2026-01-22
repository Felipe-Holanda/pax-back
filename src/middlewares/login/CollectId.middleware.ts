import {Request, Response, NextFunction} from 'express';
import { verify } from "jsonwebtoken";
import { AppError } from '../../errors/AppError.class';
import 'dotenv/config';

export default async function collectIdMiddleware(req: Request, res: Response, next: NextFunction):  Promise<void> {
    const authHeader = req.headers.authorization;

    if(!authHeader) throw new AppError("Token não encontrado", 401);

    const [, token] = authHeader.split(" ");

    try {
        const decoded: any = await verify(token, process.env.SECRET_KEY!);

        req.user = {
            id: decoded.id
        }

        return next();
    } catch (error) {
        console.log(error)
        throw new AppError("Token inválido", 401);
    }
}