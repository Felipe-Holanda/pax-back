import { Router } from "express";
import TicketsController from "../controllers/tickets.controller";
import collectIdMiddleware from "../middlewares/login/CollectId.middleware";
import fieldValidator from "../middlewares/global/FieldValidator.middleware";
import {createTicket, updateTicket
    , createDetail, updateDetail
    , createPassenger, updatePassenger
} from '../schemas/ticket.schema'

class TicketsRoutes{

    public router: Router;
    private ticketsController: TicketsController;

    constructor(){
        this.router = Router();
        this.ticketsController = new TicketsController();
        this.routes();
    }

    private routes(){
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @@         TICKETS           @@
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.router.get("/", collectIdMiddleware, this.ticketsController.listTickets.bind(this.ticketsController))
        this.router.get("/:id", collectIdMiddleware, this.ticketsController.retrieveTicket.bind(this.ticketsController))
        this.router.post("/", fieldValidator(createTicket), collectIdMiddleware, this.ticketsController.createTicket.bind(this.ticketsController))
        this.router.put('/tax/:id', collectIdMiddleware, this.ticketsController.askTax.bind(this.ticketsController))
        this.router.put("/pay/:id", collectIdMiddleware, this.ticketsController.paydTicket.bind(this.ticketsController))
        this.router.patch("/:id", fieldValidator(updateTicket), collectIdMiddleware, this.ticketsController.updateTicket.bind(this.ticketsController))
        this.router.delete("/:id", collectIdMiddleware, this.ticketsController.deleteTicket.bind(this.ticketsController))
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @@         DETAILS           @@
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.router.get("/:id/details", collectIdMiddleware, this.ticketsController.listDetails.bind(this.ticketsController))
        this.router.get("/details/:id", collectIdMiddleware, this.ticketsController.retrieveDetail.bind(this.ticketsController))
        this.router.post("/:id/details", fieldValidator(createDetail), collectIdMiddleware, this.ticketsController.createDetail.bind(this.ticketsController))
        this.router.patch("/details/:id", fieldValidator(updateDetail), collectIdMiddleware, this.ticketsController.updateDetail.bind(this.ticketsController))
        this.router.delete("/details/:id", collectIdMiddleware, this.ticketsController.deleteDetail.bind(this.ticketsController))
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @@         PASSENGERS        @@
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.router.get("/:id/passengers", collectIdMiddleware, this.ticketsController.listPassengers.bind(this.ticketsController))
        this.router.get("/passengers/:id", collectIdMiddleware, this.ticketsController.retrievePassenger.bind(this.ticketsController))
        this.router.post("/:id/passengers", fieldValidator(createPassenger), collectIdMiddleware, this.ticketsController.createPassenger.bind(this.ticketsController))
        this.router.patch("/passengers/:id", fieldValidator(updatePassenger), collectIdMiddleware, this.ticketsController.updatePassenger.bind(this.ticketsController))
        this.router.delete("/passengers/:id", collectIdMiddleware, this.ticketsController.deletePassenger.bind(this.ticketsController))
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // @@          SPECIAL          @@
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.router.get("/special/:code/:cpf", this.ticketsController.retrieveTicketSpecial.bind(this.ticketsController))
    }
}

export default TicketsRoutes;