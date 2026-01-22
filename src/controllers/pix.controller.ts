import {Request, Response} from 'express';
import {getPixData, setPixData} from '../services/pix.services';

export async function setPix(req: Request, res: Response){
    const retorno = await setPixData(req.user.id, req.body);
    res.status(200).json(retorno);
}

export async function getPix(req: Request, res: Response){
    const retorno = await getPixData(req.user.id);
    res.status(200).json(retorno);
}