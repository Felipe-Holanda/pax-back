import mongoose from "mongoose";
import 'dotenv/config'

export const connect = async () => {
    if(!process.env.DB_URL) {
        console.error("[ERROR]: DB_URL não definida!");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("[INFO]: Conectado ao banco de dados!")
    } catch(err) {
        console.error("[ERROR]: Erro ao conectar ao banco de dados!", err);
        process.exit(1);
    }
}