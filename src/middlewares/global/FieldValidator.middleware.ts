import {Request, Response, NextFunction} from 'express';
import { MultiErrors } from '../../errors/MultiErrors.class';

export default function fieldValidator(schema: any){
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { body } = request

        try {
            const valid = await schema.validate(body, { abortEarly: false })
            return next()
        } catch (error: any) {
            throw new MultiErrors(error.errors, 400)
        }
        
    }
}