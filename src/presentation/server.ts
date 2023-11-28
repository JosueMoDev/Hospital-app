import express, { Router } from "express";
import compression from 'compression';
import fileUplad from 'express-fileupload'
interface serverConfig {
    port: number;
    routes: Router;
}
export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly routes: Router;

    constructor(args: serverConfig) {
        const { port, routes } = args;

        this.port = port,
            this.routes = routes
    }


    async start() {
        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); //! x-www-form-urlencoded
        this.app.use(compression());
        this.app.use(fileUplad({}))
        //* Routes
        this.app.use(this.routes);

        this.serverListener = this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));

    }

    public close() {
        this.serverListener?.close();
    }
}