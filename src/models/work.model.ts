import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
    isOverdue: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
  })

export const Work = mongoose.model("work", workSchema);