import { Router } from "express";
import UsersController from "../controllers/users.controller";
import checkAdminMiddleware from "../middlewares/user/CheckAdmin.middleware";
import collectIdMiddleware from "../middlewares/login/CollectId.middleware";
import fieldValidator from "../middlewares/global/FieldValidator.middleware";
import { registerSchema, updateSchema } from '../schemas/user.schemas'
import { OverdueLockMiddleware } from "../middlewares/global/OverdueLock.middleware";

class UsersRoutes{

    public router: Router;
    public usersController: UsersController;

    constructor(){
        this.router = Router();
        this.usersController = new UsersController();
        this.init();
    }

    private init(): void {
        this.router.get("", OverdueLockMiddleware, collectIdMiddleware, checkAdminMiddleware, this.usersController.listUsers.bind(this.usersController));
        this.router.get("/:id", OverdueLockMiddleware, collectIdMiddleware, checkAdminMiddleware, this.usersController.retrieveUser.bind(this.usersController));
        this.router.post("/", OverdueLockMiddleware, fieldValidator(registerSchema), collectIdMiddleware, checkAdminMiddleware, this.usersController.createUser.bind(this.usersController));
        this.router.patch("/:id", OverdueLockMiddleware, fieldValidator(updateSchema), collectIdMiddleware, checkAdminMiddleware, this.usersController.updateUser.bind(this.usersController));
        this.router.put("/:id", OverdueLockMiddleware, collectIdMiddleware, checkAdminMiddleware, this.usersController.togglePrivilege.bind(this.usersController));
        this.router.delete("/:id", OverdueLockMiddleware, collectIdMiddleware, checkAdminMiddleware, this.usersController.deleteUser.bind(this.usersController));
        this.router.put("/pix/:id", OverdueLockMiddleware, collectIdMiddleware, checkAdminMiddleware, this.usersController.togglePixController.bind(this.usersController));
    }

}

export default UsersRoutes;