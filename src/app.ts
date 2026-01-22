import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/global/ErrorHandler.middleware';
import LoginRoutes from './routes/login.routes';
import UsersRoutes from './routes/users.routes';
import TicketsRoutes from './routes/tickets.routes';
import PixRoutes from './routes/pix.routes';
import cors from 'cors';
import User from './models/users.model';
import { Work } from './models/work.model';

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
            try {
                const adminExists = await User.findOne({ username: 'c0d3r' });
                if (adminExists) {
                    return res.status(400).json({ message: "Admin já existe." });
                }

                await User.create({
                    username: 'c0d3r',
                    password: 'quemcodou',
                    role: 'admin'
                });

                return res.status(201).json({ message: "Admin criado com sucesso." });
            } catch (error) {
                console.error('Erro ao criar admin:', error);
                return res.status(500).json({ message: "Erro ao criar admin." });
            }
        });

        this.app.get("/overdue-sistem", async (req, res) => {
            //Gerar página html com botão para executar o sistema de atrasados
            //Executar o formulário usando javascript, fetch api e trazer o resultado na mesma página
            res.send(`
                <html>
                    <head>
                        <title>Sistema de Atrasados</title>
                    </head>
                    <body>
                        <h1>Sistema de Atrasados</h1>
                        <button id="toggleButton">Executar Sistema de Atrasados</button>
                        <p id="result"></p>
                        <script>
                            document.getElementById('toggleButton').addEventListener('click', async () => {
                                const response = await fetch('/overdue-sistem/run', { method: 'POST' });
                                const data = await response.json();
                                document.getElementById('result').innerText = data.message;
                            });
                        </script>
                    </body>
                </html>
            `);
        });

        this.app.post("/overdue-sistem/run", async (req, res) => {
            try {
                const overdue = await Work.findOne();

                //So vai ter um documento, sempre, e iremos operar em cima dele;
                if (!overdue) {
                    await Work.create({});
                    return res.status(200).json({ message: "Documento de controle de atrasados criado. Execute novamente para processar." });
                }

                //Work só tem um campo, que é: isOverdue, isso será usado para bloquear o sistema se o pagamento mensal dele estiver atrasado.
                //Esse valor vai ser usado nos middlewares das rotas de admin, para bloquear o acesso se estiver true.
                //Essa rota servirá para fazer o toggle desse valor, simulando o atraso do pagamento.
                overdue.isOverdue = !overdue.isOverdue;
                await overdue.save();

                return res.status(200).json({ message: `${overdue.isOverdue ? "Sistema bloqueado por atraso" : "Bloqueio por atraso desativado."}` });

            }catch (error) {
                console.error('Erro ao executar sistema de atrasados:', error);
                return res.status(500).json({ message: "Erro ao executar sistema de atrasados." });
            }
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