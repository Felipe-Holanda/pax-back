import { Request, Response } from "express";
import UserServices from "../services/users.services";

class UsersController{

    private userServices: UserServices;

    constructor(){
        this.userServices = new UserServices();
    }

    public async listUsers(req: Request, res: Response): Promise<Response>{
        const users = await this.userServices.listUsers();
        return res.status(200).json(users);
    }

    public async retrieveUser(req: Request, res: Response): Promise<Response>{
        const user = await this.userServices.retrieveUser(req.params.id);
        return res.status(200).json(user);
    }

    public async createUser(req: Request, res: Response): Promise<Response>{
        const user = await this.userServices.createUser(req.body);
        return res.status(201).json(user);
    }

    public async updateUser(req: Request, res: Response): Promise<Response>{
        const user = await this.userServices.updateUser(req.params.id, req.body);
        return res.status(200).json(user);
    }

    public async deleteUser(req: Request, res: Response): Promise<Response>{
        await this.userServices.deleteUser(req.params.id);
        return res.status(204).send();
    }

    public async togglePrivilege(req: Request, res: Response): Promise<Response>{
        const user = await this.userServices.togglePrivilege(req.params.id);
        return res.status(200).json(user);
    }

    public async togglePixController(req: Request, res: Response): Promise<Response>{
        const user = await this.userServices.togglePix(req.params.id);
        return res.status(200).json(user);
    }


}

export default UsersController;