import { AppError } from "../../errors/AppError.class";
import { MultiErrors } from "../../errors/MultiErrors.class";
import {Request, Response, NextFunction} from 'express';

export default function errorHandler(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
): Response {
    if (error instanceof AppError){
        return response.status(error.status).json({message: error.message});
    }

    if (error instanceof MultiErrors){
        return response.status(error.status).json({message: error.errors});
    }

    console.log(error);
    
    return response.status(500).json({message: "Internal server error."})

}