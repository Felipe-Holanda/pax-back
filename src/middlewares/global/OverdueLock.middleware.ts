import { Work } from "../../models/work.model";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError.class";

export const OverdueLockMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const work = await Work.findOne().sort({ createdAt: -1 });

        console.log(work);

        if (work && work.isOverdue) {
            throw new AppError("O sistema está Bloqueado por atraso no pagamento. Fale com o programador para resolver este impedimento", 423);
        }

        return next();
    } catch (error) {
        next(error);
    }
};