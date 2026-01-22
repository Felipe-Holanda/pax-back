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
        required: false
    },
    webCode: {
        type: String,
        required: false
    },
    transporter: {
        type: String,
        required: false
    },
    leaveDate: {
        type: String,
        required: false
    },
    arriveDate: {
        type: String,
        required: false
    },
    leaveHour: {
        type: String,
        required: false
    },
    arriveHour: {
        type: String,
        required: false
    },
    leaveAirport: {
        type: String,
        required: false
    },
    arriveAirport: {
        type: String,
        required: false
    },
    leaveGate: {
        type: String,
        required: false
    },
    arriveGate: {
        type: String,
        required: false
    },
    flightDuration: {
        type: String,
        required: false
    },
    flightType: {
        type: String,
        required: false
    },
    relatedTicket: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
  })

const Detail = mongoose.model("detail", detailSchema);
export default Detail;