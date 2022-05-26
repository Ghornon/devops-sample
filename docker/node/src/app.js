import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connect } from './helpers/database';
import { authRouter } from './routers';
import * as os from 'os';

class App {
	constructor() {
		this.app = express();
		if (process.env.NODE_ENV !== 'test') connect();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		if (process.env.NODE_ENV === 'dev') this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.set('trust proxy');
		this.app.use(cors());
	}

	routes() {
		this.app.get('/', (req, res) => {
			res.status(200).send(`Hello world! I'm ${os.hostname()}`);
		});

		this.app.use('/api/', authRouter);
	}
}

const { app } = new App();
export default app;
