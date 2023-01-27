require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});

const openAI = new OpenAIApi(configuration);

router.get('/', (req, res) => {
	res.send("Hello from Carl's server.");
});

router.post('/', async (req, res) => {
	try {
		const { prompt } = req.body;
		const aiReponse = await openAI.createImage({
			prompt,
			n: 1, // Number of results wanted
			size: '1024x1024',
			response_format: 'b64_json',
		});
		const image = aiReponse.data.data[0].b64_json;
		res.status(200).json({ photo: image });
	} catch (error) {
		res.status(400).send(error?.response.data.error.message);
	}
});

module.exports = router;
