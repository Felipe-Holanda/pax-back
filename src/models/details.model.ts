import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const detailSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        index: true
    },
    flightNumber: {
        type: String,
        required: true
    },
    webCode: {
        type: String,
        required: true
    },
    transporter: {
        type: String,
        required: true
    },
    leaveDate: {
        type: String,
        required: true
    },
    arriveDate: {
        type: String,
        required: true
    },
    leaveHour: {
        type: String,
        required: true
    },
    arriveHour: {
        type: String,
        required: true
    },
    leaveAirport: {
        type: String,
        required: true
    },
    arriveAirport: {
        type: String,
        required: true
    },
    leaveGate: {
        type: String,
        required: true
    },
    arriveGate: {
        type: String,
        required: true
    },
    flightDuration: {
        type: String,
        required: true
    },
    flightType: {
        type: String,
        required: true
    },
    relatedTicket: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
  })

const Detail = mongoose.model("detail", detailSchema);
export default Detail;