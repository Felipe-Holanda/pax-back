import { Request, Response } from "express";
import LoginService from "../services/login.services";

class LoginController {

    constructor() {
    }

    public async login(req: Request, res: Response): Promise<Response> {
            const token =await LoginService.login(req.body);
            return res.status(200).json({ token });
    }
}

export default LoginController;