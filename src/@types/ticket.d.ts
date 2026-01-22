export interface iTicketData{
    code: string;
    passenger: string;
    document: string;
    annotation: string;
    ticket: string;
    reserve: string;
    destiny: string;
    price: string;
    includeBag: boolean;
    includeHand: boolean;
    includeDispatch: boolean;
    ownerId: string;
    qrCode: string;
    copyPaste: string;
}

export interface iDetailsData{
    flightNumber: string;
    webCode: string;
    transporter: string;
    leaveDate: string;
    arriveDate: string;
    leaveHour: string;
    arriveHour: string;
    leaveAirport: string;
    arriveAirport: string;
    leaveGate: string;
    arriveGate: string;
    flightDuration: string;
    flightType: string;
    includeBag: boolean;
    includeMeal: boolean;
    includeDispatch: boolean;
    relatedTicket: string;
}

export interface iPassengerData{
    name: string;
    document: string;
    reserve: string;
    relatedTicket: string;
}