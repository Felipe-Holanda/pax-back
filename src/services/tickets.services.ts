import Ticket from "../models/tickets.model";
import Detail from "../models/details.model";
import Passenger from "../models/passenger.model";
import User from "../models/users.model";
import axios from "axios";
import { Document } from "mongoose";
import { iTicketData, iDetailsData, iPassengerData } from "../@types/ticket";
import { AppError } from "../errors/AppError.class";

class TicketServices {

    constructor(){}

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@         TICKETS           @@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    public async listTickets(id: string): Promise<Document[]>{
        const tickets = await Ticket.find({ownerId: id});

        return tickets;
    }

    public async retrieveTicket(id: string): Promise<Object>{
        const ticket = await Ticket.findOne({id});

        if(!ticket) throw new AppError("Ticket não encontrado.", 404);

        const details = await Detail.find({ relatedTicket: id});
        const passengers = await Passenger.find({ relatedTicket: id});

        return {...ticket.toObject(), details, passengers}
    }

    public async retrieveTicketSpecial(code: string, cpf: string): Promise<Object>{
        const ticket = await Ticket.findOne({code});

        if(!ticket) throw new AppError("Ticket não encontrado.", 404);

        // Normalizar CPF recebido - remover formatação
        let cpfNormalized = cpf.replace(/\./g, '').replace(/\-/g, '');

        // Normalizar CPF do ticket - remover formatação
        let ticketDocNormalized = ticket.document.replace(/\./g, '').replace(/\-/g, '');

        // Comparar os CPFs normalizados
        if(cpfNormalized !== ticketDocNormalized){
            //Vamos verificar se o cpf é de um passageiro
            // Precisamos buscar com ambas as versões (formatada e sem formatação)
            const passenger = await Passenger.findOne({
                $or: [
                    { document: cpf },
                    { document: cpfNormalized }
                ]
            });

            if(!passenger)  throw new AppError("CPF não confere com o ticket.", 401);

            //Vamos verificar se o passageiro encontrado é do ticket
            if(passenger.relatedTicket !== ticket.id) throw new AppError("CPF não confere com o ticket.", 401);
        }

        const details = await Detail.find({ relatedTicket: ticket.id});
        const passengers = await Passenger.find({ relatedTicket: ticket.id});
        return {...ticket.toObject(), details, passengers}
    }

    public async createTicket(id: string, data: iTicketData): Promise<Document>{
        const foundUser = await User.findOne({id});

        if(!foundUser) throw new AppError("Usuário não encontrado.", 404);

        if(foundUser.canPix){

            const reqData = {
                key_type: foundUser.key_type,
                key: foundUser.key,
                name: foundUser.name.trim(),
                city: foundUser.city,
                amount: "R$ " + data.price,
                reference: "Bilhete Passagem Promocional"
            }

            let options = {}
            let response = {
                data: {
                    qrcode_base64: "",
                    code: ""
                }
            }
            try{

                options = {
                    method: 'POST',
                    url: 'https://pix-qr-code1.p.rapidapi.com/generate',
                    headers: {
                      'content-type': 'application/json',
                      'X-RapidAPI-Key': 'd39ff5ffecmsh268bb23b81c4a85p15cba3jsnbf7861a028da',
                      'X-RapidAPI-Host': 'pix-qr-code1.p.rapidapi.com'
                    },
                    data: reqData
                };

                response = await axios.request(options);

            }catch(err){
                console.log(err);
            }


            data.qrCode = response.data.qrcode_base64;
            data.copyPaste = response.data.code;

        }else{
            data.qrCode = "";
            data.copyPaste = "";
        }

        const ticket = await Ticket.create({...data, ownerId: id});

        return ticket;
    }

    public async setPayd(id: string): Promise<Document>{
        const ticket = await Ticket.findOne({id});

        if(!ticket) throw new AppError("Ticket não encontrado.", 404);

        
        ticket.askForPayment = !ticket.askForPayment;

        return ticket.save();

    }

    public async askTax(id: string): Promise<Document>{
        const ticket = await Ticket.findOne({id});

        if(!ticket) throw new AppError("Ticket não encontrado.", 404);

        ticket.askForTax = !ticket.askForTax;

        return ticket.save();
    }

    public async updateTicket(id: string, data: iTicketData): Promise<Document>{
        const targetTicket = await Ticket.findOne({id});

        if(!targetTicket) throw new AppError("Ticket não encontrado.", 404);

        if(data.code) targetTicket.code = data.code;
        if(data.passenger) targetTicket.passenger = data.passenger;
        if(data.annotation) targetTicket.annotation = data.annotation;
        if(data.destiny) targetTicket.destiny = data.destiny;
        if(data.document) targetTicket.document = data.document;
        if(data.reserve) targetTicket.reserve = data.reserve;
        if(data.ticket) targetTicket.ticket = data.ticket;
        if(data.price) targetTicket.price = data.price;
        if(data.includeBag !== undefined) targetTicket.includeBag = data.includeBag;
        if(data.includeHand !== undefined) targetTicket.includeHand = data.includeHand;
        if(data.includeDispatch !== undefined) targetTicket.includeDispatch = data.includeDispatch;

        return targetTicket.save();        
    }

    public async deleteTicket(id: string): Promise<void>{
        const targetTicket = await Ticket.findOneAndDelete({id});
        
        if(!targetTicket){
            throw new AppError("Ticket não encontrado.", 404);
        } else{
            await Detail.deleteMany({relatedTicket: id});
            await Passenger.deleteMany({relatedTicket: id});
        }
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@         DETAILS           @@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    public async listDetails(id: string): Promise<Document[]>{
        const details = await Detail.find({ relatedTicket: id});

        return details;
    }

    public async retrieveDetail(id: string): Promise<Document>{
        const detail = await Detail.findOne({id});

        if(!detail) throw new AppError("Detalhe de passagem não encontrado.", 404);

        return detail;
    }

    public async createDetail(id: string, data: iDetailsData): Promise<Document>{

        const ticket = await Ticket.findOne({id});

        if(!ticket) throw new AppError("Ticket não encontrado.", 404);

        const detail = await Detail.create({...data, relatedTicket: ticket.id});

        return detail;
    }

    public async updateDetail(id: string, data: iDetailsData): Promise<Document>{
        const targetDetail = await Detail.findOne({id: id})
        if(!targetDetail) throw new AppError("Detalhe de passagem não encontrado.", 404);

        if(data.flightNumber) targetDetail.flightNumber = data.flightNumber;
        if(data.webCode) targetDetail.webCode = data.webCode;
        if(data.transporter) targetDetail.transporter = data.transporter;
        if(data.leaveDate) targetDetail.leaveDate = data.leaveDate;
        if(data.arriveDate) targetDetail.arriveDate = data.arriveDate;
        if(data.leaveHour) targetDetail.leaveHour = data.leaveHour;
        if(data.arriveHour) targetDetail.arriveHour = data.arriveHour;
        if(data.leaveAirport) targetDetail.leaveAirport = data.leaveAirport;
        if(data.arriveAirport) targetDetail.arriveAirport = data.arriveAirport;
        if(data.leaveGate) targetDetail.leaveGate = data.leaveGate;
        if(data.arriveGate) targetDetail.arriveGate = data.arriveGate;
        if(data.flightDuration) targetDetail.flightDuration = data.flightDuration;
        if(data.flightType) targetDetail.flightType = data.flightType;

        return targetDetail.save();
    }

    public async deleteDetail(id: string): Promise<void>{
        const targetDetail = await Detail.findOneAndDelete({id});

        if(!targetDetail) throw new AppError("Detalhe de passagem não encontrado.", 404);
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@         PASSENGERS        @@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    public async listPassengers(id: string): Promise<Document[]>{
        const passengers = await Passenger.find({ relatedTicket: id});

        return passengers;
    }

    public async retrievePassenger(id: string): Promise<Document>{
        const passenger = await Passenger.findOne({id});

        if(!passenger) throw new AppError("Passageiro não encontrado.", 404);

        return passenger;
    }

    public async createPassenger(id: string, data: iDetailsData): Promise<Document>{

        const ticket = await Ticket.findOne({id});

        if(!ticket) throw new AppError("Ticket não encontrado.", 404);

        const passenger = await Passenger.create({...data, relatedTicket: ticket.id});

        return passenger;
    }

    public async updatePassenger(id: string, data: iPassengerData): Promise<Document>{
        const foundPassenger = await Passenger.findOne({id});

        if(!foundPassenger) throw new AppError("Passageiro não encontrado.", 404);

        if(data.name) foundPassenger.name = data.name;
        if(data.document) foundPassenger.document = data.document;
        if(data.reserve) foundPassenger.reserve = data.reserve;

        const passenger = await foundPassenger.save();
        return passenger;
    }

    public async deletePassenger(id: string): Promise<void>{
        const targetPassenger = await Passenger.findOneAndDelete({id});

        if(!targetPassenger) throw new AppError("Passageiro não encontrado.", 404);
    }

}

export default TicketServices;