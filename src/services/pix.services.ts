import User from "../models/users.model";
import { AppError } from "../errors/AppError.class";


export async function setPixData(id: string, data: any){

    const user = await User.findOne({ id });

    if(!user) throw new AppError("Usuário solicitado não foi encontrado", 404);

    if(!user.canPix) throw new AppError("Usuário não tem permissão para definir dados de pix", 403);

    if(data.key_type) user.key_type = data.key_type;

    if(data.key) user.key = data.key;

    if(data.name) user.name = data.name;

    if(data.city) user.city = data.city;

    await user.save();

    const retorno = user.toObject();

    return {...retorno, password: undefined, _id: undefined, __v: undefined};

}


export async function getPixData(id: string){

    const user = await User.findOne({ id });

    if(!user) throw new AppError("Usuário solicitado não foi encontrado", 404);

    if(!user.canPix) throw new AppError("Usuário não tem permissão para utilziar dados de pix", 403);

    const retorno = user.toObject();

    return {...retorno, password: undefined, _id: undefined, __v: undefined};

}


export async function alteraPermissaoPix(id: string){

    const user = await User.findOne({ id });

    if(!user) throw new AppError("Usuário solicitado não foi encontrado", 404);

    user.canPix = !user.canPix;

    await user.save();

    const retorno = user.toObject();

    return {...retorno, password: undefined, _id: undefined, __v: undefined};

}