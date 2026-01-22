import * as yup from 'yup';

export const createTicket = yup.object().shape({
    code: yup.string().required('O campo Código é obrigatório.'),
    passenger: yup.string().required('O campo Passageiro é obrigatório.'),
    document: yup.string().required('O campo Documento é obrigatório.'),
    annotation: yup.string().required('O campo Anotação é obrigatório.'),
    includeBag: yup.boolean().required('O campo Incluir Bagagem é obrigatório.'),
    includeHand: yup.boolean().required('O campo Incluir Bagagem de Mão é obrigatório.'),
    includeDispatch: yup.boolean().required('O campo Incluir Despacho é obrigatório.'),
    price: yup.string(),
    alreadyPaid: yup.boolean(),
    askForPayment: yup.boolean()
});

export const updateTicket = yup.object().shape({
    code: yup.string(),
    passenger: yup.string(),
    document: yup.string(),
    includeBag: yup.boolean(),
    includeHand: yup.boolean(),
    includeDispatch: yup.boolean(),
});

export const createDetail = yup.object().shape({
    flightNumber: yup.string().required('O campo Número do Voo é obrigatório.'),
    webCode: yup.string().required('O campo Código Web é obrigatório.'),
    transporter: yup.string().required('O campo Transportadora é obrigatório.'),
    leaveDate: yup.string().required('O campo Data de Saída é obrigatório.'),
    arriveDate: yup.string().required('O campo Data de Chegada é obrigatório.'),
    leaveHour: yup.string().required('O campo Hora de Saída é obrigatório.'),
    arriveHour: yup.string().required('O campo Hora de Chegada é obrigatório.'),
    leaveAirport: yup.string().required('O campo Aeroporto de Saída é obrigatório.'),
    arriveAirport: yup.string().required('O campo Aeroporto de Chegada é obrigatório.'),
    leaveGate: yup.string().required('O campo Portão de Saída é obrigatório.'),
    arriveGate: yup.string().required('O campo Portão de Chegada é obrigatório.'),
    flightDuration: yup.string().required('O campo Duração do Voo é obrigatório.'),
    flightType: yup.string().required('O campo Tipo de Voo é obrigatório.'),
});

export const updateDetail = yup.object().shape({
    flightNumber: yup.string(),
    webCode: yup.string(),
    transporter: yup.string(),
    leaveDate: yup.date(),
    arriveDate: yup.date(),
    leaveHour: yup.string(),
    arriveHour: yup.string(),
    leaveAirport: yup.string(),
    arriveAirport: yup.string(),
    leaveGate: yup.string(),
    arriveGate: yup.string(),
    flightDuration: yup.string(),
    flightType: yup.string(),
});

export const createPassenger = yup.object().shape({
    name: yup.string().required('O campo Nome é obrigatório.'),
    document: yup.string().required('O campo Documento é obrigatório.'),
    reserve: yup.string().required('O campo Reserva é obrigatório.'),
});

export const updatePassenger = yup.object().shape({
    name: yup.string(),
    document: yup.string(),
    reserve: yup.string(),
});