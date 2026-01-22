import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const passengerSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    reserve: {
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

const Passenger = mongoose.model("passenger", passengerSchema);
export default Passenger;
