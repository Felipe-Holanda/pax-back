import App from "./app";
import { connect } from "./data-source";
import 'dotenv/config'

const app = new App();

// Conecta ao banco de dados de forma assíncrona
(async () => {
    await connect();
})();

// Se não estiver no Vercel (ambiente de produção serverless), inicia o servidor
if (process.env.VERCEL !== '1') {
    app.start();
}

// Exporta para o Vercel
export default app.app;