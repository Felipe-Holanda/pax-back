import {Request, Response} from 'express'
import TicketServices from '../services/tickets.services'

class TicketsController{

    private ticketServices: TicketServices;

    constructor(){
        this.ticketServices = new TicketServices();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@         TICKETS           @@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


    public async listTickets(req: Request, res: Response): Promise<Response>{
        const { id } = req.user;
        const tickets = await this.ticketServices.listTickets(id);
        return res.status(200).json(tickets);
    }

    public async retrieveTicket(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const ticket = await this.ticketServices.retrieveTicket(id);
        return res.status(200).json(ticket);
    }

    public async retrieveTicketSpecial(req: Request, res: Response): Promise<Response>{
        const { code, cpf } = req.params;
        const ticket = await this.ticketServices.retrieveTicketSpecial(code, cpf);
        return res.status(200).json(ticket);
    }

    public async createTicket(req: Request, res: Response): Promise<Response>{
        const { id } = req.user;
        const data = req.body;
        const ticket = await this.ticketServices.createTicket(id, data);
        return res.status(201).json(ticket);
    }

    public async paydTicket(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const ticket = await this.ticketServices.setPayd(id);
        return res.status(200).json(ticket);
    }

    public async updateTicket(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const data = req.body;
        const ticket = await this.ticketServices.updateTicket(id, data);
        return res.status(200).json(ticket);
    }

    public async deleteTicket(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        await this.ticketServices.deleteTicket(id);
        return res.status(204).send();
    }

    public async askTax(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const ticket = await this.ticketServices.askTax(id);
        return res.status(200).json(ticket);
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@         DETAILS           @@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    public async listDetails(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const details = await this.ticketServices.listDetails(id);
        return res.status(200).json(details);
    }

    public async retrieveDetail(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const detail = await this.ticketServices.retrieveDetail(id);
        return res.status(200).json(detail);
    }

    public async createDetail(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const data = req.body;
        const detail = await this.ticketServices.createDetail(id, data);
        return res.status(201).json(detail);
    }

    public async updateDetail(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const data = req.body;
        const detail = await this.ticketServices.updateDetail(id, data);
        return res.status(200).json(detail);
    }

    public async deleteDetail(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        await this.ticketServices.deleteDetail(id);
        return res.status(204).send();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@         PASSENGERS        @@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    public async listPassengers(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const passengers = await this.ticketServices.listPassengers(id);
        return res.status(200).json(passengers);
    }

    public async retrievePassenger(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const passenger = await this.ticketServices.retrievePassenger(id);
        return res.status(200).json(passenger);
    }

    public async createPassenger(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const data = req.body;
        const passenger = await this.ticketServices.createPassenger(id, data);
        return res.status(201).json(passenger);
    }

    public async updatePassenger(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const data = req.body;
        const passenger = await this.ticketServices.updatePassenger(id, data);
        return res.status(200).json(passenger);
    }

    public async deletePassenger(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        await this.ticketServices.deletePassenger(id);
        return res.status(204).send();
    }

}

export default TicketsController;