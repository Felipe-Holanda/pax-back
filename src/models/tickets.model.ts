import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        index: true
    },
    code: {
        type: String,
        required: true,
        length: 6
    },
    passenger: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    ticket: {
        type: String,
        required: true
    },
    reserve: {
        type: String,
        required: true
    },
    annotation: {
        type: String,
        required: true
    },
    destiny: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    includeBag: {
        type: Boolean,
        required: true,
        default: false
    },
    includeHand: {
        type: Boolean,
        required: true,
        default: false
    },
    includeDispatch: {
        type: Boolean,
        required: true,
        default: false
    },
    ownerId: {
        type: String,
    },
    qrCode: {
        type: String,
        default: ""
    },
    copyPaste: {
        type: String,
        default: ""
    },
    alreadyPaid: {
        type: Boolean,
        default: false
    },
    askForPayment: {
        type: Boolean,
        default: false
    },
    askForTax: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
  })

const Ticket = mongoose.model("ticket", ticketSchema);
export default Ticket;