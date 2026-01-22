import App from "../src/app";
import { connect } from "../src/data-source";
import 'dotenv/config';

const appInstance = new App();

// Conecta ao banco de dados
connect().catch(err => {
    console.error('[ERROR]: Falha ao conectar ao banco de dados:', err);
});

// Exporta o app para o Vercel
export default appInstance.app;
