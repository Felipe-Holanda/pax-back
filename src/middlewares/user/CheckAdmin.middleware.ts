import { Request, Response, NextFunction } from "express";
import User from "../../models/users.model";
import { AppError } from "../../errors/AppError.class";

export default async function checkAdminMiddleware(req: Request, res: Response, next: NextFunction): Promise<void>{

    const user = await User.findOne({id: req.user.id});

    if(!user) throw new AppError("Verifique sua sessão e tente novamente.", 401);

    if(!user.isAdmin) throw new AppError("Você não tem permissão para fazer isso.", 403);

    return next();
}