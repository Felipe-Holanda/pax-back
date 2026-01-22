import { Router } from "express";
import collectIdMiddleware from "../middlewares/login/CollectId.middleware";
import fieldValidator from "../middlewares/global/FieldValidator.middleware";
import pixKeySchema from "../schemas/pix.schema";
import { getPix, setPix } from "../controllers/pix.controller";

class PixRoutes {

    public router: Router;

    constructor(){
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.post("/", collectIdMiddleware, fieldValidator(pixKeySchema), setPix);
        this.router.get("/", collectIdMiddleware, getPix);
    }

}

export default PixRoutes;