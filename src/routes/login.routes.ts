import { Router } from "express";
import LoginController from "../controllers/login.controller";
import fieldValidator from "../middlewares/global/FieldValidator.middleware";
import { loginSchema } from "../schemas/login.schemas";
import collectIdMiddleware from "../middlewares/login/CollectId.middleware";
import { OverdueLockMiddleware } from "../middlewares/global/OverdueLock.middleware";

class LoginRoutes {
    
        public router: Router;
        public loginController: LoginController;
        
        constructor(){
            this.router = Router();
            this.loginController = new LoginController();
            
            this.init();
        }
        
        private init(): void {
            this.router.post("/", OverdueLockMiddleware, fieldValidator(loginSchema), this.loginController.login);
            this.router.get("/me", OverdueLockMiddleware, collectIdMiddleware, this.loginController.getMe);
        }
    
}


export default LoginRoutes;