import App from "./app";
import { connect } from "./data-source";
import 'dotenv/config'

const app = new App();

( 
    async () => {
        await connect();
        app.start();
    }
)()