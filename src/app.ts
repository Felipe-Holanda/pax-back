import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/global/ErrorHandler.middleware';
import LoginRoutes from './routes/login.routes';
import UsersRoutes from './routes/users.routes';
import TicketsRoutes from './routes/tickets.routes';
import PixRoutes from './routes/pix.routes';
import cors from 'cors';
import User from './models/users.model';

class App{

    public app: express.Application;
    private loginRoutes: LoginRoutes;
    private usersRoutes: UsersRoutes;
    private ticketsRoutes: TicketsRoutes;
    private pixRoutes: PixRoutes;

    constructor(){
        this.app = express();
        this.loginRoutes = new LoginRoutes();
        this.usersRoutes = new UsersRoutes();
        this.ticketsRoutes = new TicketsRoutes();
        this.pixRoutes = new PixRoutes();
        this.init();
    }

    private init(): void {
        this.app.use(express.json());
        this.app.use(cors());

        // Rota raiz para verificação
        this.app.get("/", (req, res) => {
            res.json({ 
                message: "API PAX está rodando!", 
                status: "online",
                routes: ["/login", "/users", "/tickets", "/pix"]
            });
        });

        //Gera admin
        this.app.get("/generate-c0d3r", async (req, res)  => {
            const adminExists = await User.findOne({ where: { username: 'c0d3r' } });
            if (adminExists) {
                return res.status(400).json({ message: "Admin já existe." });
            }

            User.create({
                username: 'c0d3r',
                password: 'quemcodou',
                role: 'admin'
            });

            return res.status(201).json({ message: "Admin criado com sucesso." });
        });

        this.app.use("/login", this.loginRoutes.router);
        this.app.use("/users", this.usersRoutes.router);
        this.app.use("/tickets", this.ticketsRoutes.router);
        this.app.use("/pix", this.pixRoutes.router);
        
        this.app.use(errorHandler);
    }

    public start(): void {
        this.app.listen(
            process.env.PORT,
            () => console.log(`[INFO]: Servidor rodando na porta ${process.env.PORT}`)
        )
    }

}

export default App;