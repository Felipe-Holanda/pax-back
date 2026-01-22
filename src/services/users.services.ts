import User from "../models/users.model";
import { AppError } from "../errors/AppError.class";
import { iUser } from "../@types/user";
import { Document } from "mongoose";

class UserServices{

    constructor(){}

    public async listUsers(): Promise<Object[]>{
        const users = await User.find({}).select("-password");

        return users.map((user: Document) => {
            return {...user.toObject(), password: undefined};
        });
    }

    public async retrieveUser(id: string): Promise<Object>{
        const user = await User.findOne({id}).select("-password");

        if(!user) throw new AppError("Usuário não encontrado.", 404);

        return {...user.toObject(), password: undefined};
    }

    public async createUser(data: iUser): Promise<Object>{
        const user = await User.create(data);
        
        return {...user.toObject(), password: undefined};
    }

    public async updateUser(id: string, data: iUser): Promise<Object>{
        const targetUser = await User.findOne({id});

        if(!targetUser) throw new AppError("Usuário não encontrado.", 404);

        if(data.username) targetUser.username = data.username;
        if(data.password) targetUser.password = data.password;

        const user = await targetUser.save();

        return {...user.toObject(), password: undefined};
    }

    public async deleteUser(id: string): Promise<void>{
        const targetUser = await User.findOneAndDelete({id});

        if(!targetUser) throw new AppError("Usuário não encontrado.", 404);
    }

    public async togglePrivilege(id: string): Promise<Object>{
        const targetUser = await User.findOne({id});

        if(!targetUser) throw new AppError("Usuário não encontrado.", 404);

        targetUser.isAdmin = !targetUser.isAdmin;

        const user = await targetUser.save();

        return {...user.toObject(), password: undefined};
    }

    public async togglePix(id: string): Promise<Object>{
        const targetUser = await User.findOne({id});

        if(!targetUser) throw new AppError("Usuário não encontrado.", 404);

        targetUser.canPix = !targetUser.canPix;

        const user = await targetUser.save();

        return {...user.toObject(), password: undefined};
    }

    public async updatePix(id: string, data: iUser): Promise<Object>{
        const foundUser = await User.findOne({id});

        if(!foundUser) throw new AppError("Usuário não encontrado.", 404);

        if(!foundUser.canPix) throw new AppError("Usuário não tem permissão para gerar PIX. Melhore o seu plano para isso.", 403);

        if(data.key_type) foundUser.key_type = data.key_type;
        if(data.key) foundUser.key = data.key;
        if(data.name) foundUser.name = data.name;
        if(data.city) foundUser.city = data.city;
        if(data.reference) foundUser.reference = data.reference;

        const user = await foundUser.save();

        return {...user.toObject(), password: undefined};
    }

}

export default UserServices;