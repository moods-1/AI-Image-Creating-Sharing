require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { json, urlencoded } = express;
const connectDB = require('./mongodb/connect');
const postRoutes = require('./routes/postRoutes');
const dalleRoutes = require('./routes/dalleRoutes');

const app = express();
const PORT = process.env.PORT || 8088;

app.use(
	cors({
		origin: '*',
	})
);
app.use(logger('dev'));
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: false }));

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
