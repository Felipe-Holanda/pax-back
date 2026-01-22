import { Router } from "express";
import LoginController from "../controllers/login.controller";
import fieldValidator from "../middlewares/global/FieldValidator.middleware";
import { loginSchema } from "../schemas/login.schemas";
import LoginService from "../services/login.services";

class LoginRoutes {
    
        public router: Router;
        public loginController: LoginController;
        
        constructor(){
            this.router = Router();
            this.loginController = new LoginController();
            
            this.init();
        }
        
        private init(): void {
            this.router.post("/", fieldValidator(loginSchema), this.loginController.login);
        }
    
}


export default LoginRoutes;