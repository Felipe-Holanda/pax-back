import { Request, Response } from "express";
import LoginService from "../services/login.services";

class LoginController {

    constructor() {
    }

    public async login(req: Request, res: Response): Promise<Response> {
            const data = await LoginService.login(req.body);
            return res.status(200).json(data);
    }

    public async getMe(req: Request, res: Response): Promise<Response> {
            const user = await LoginService.getMe(req.user.id);
            return res.status(200).json(user);
    }
}

export default LoginController;