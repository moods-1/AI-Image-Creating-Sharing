import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
// The .js had to be added to 'connect' or an 'ERR_MODULE_NOT_FOUND' would be generated
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8088;

app.use(
	cors({
		origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
	})
);
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// app.get('/', async (req, res) => {
// 	res.status(200).send('Hello from DALL-E server...');
// });

const startServer = async () => {
	try {
		connectDB(process.env.DB_URI);
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}.`);
		});
	} catch (error) {
		console.log({ error });
	}
};

startServer();
