const express = require('express');
const axios = require('axios')
const { connectDB } = require('./helpers/db');
const app = express();
const { port, host, db, apiUrl } = require('./configuration');

const startServer = () => {
	app.listen(port, () => {
		console.log(`AUTH Server is running on port: ${port}`);
		console.log(`host: ${host}`);
		console.log(`db: ${db}`);
	});
}

app.get('/test', (req, res) => {
	res.send("Our AUTH server is working correctly");
});

app.get('/api/currentUser', (req, res) => {
	res.json(
		{
			id: '123456',
			email: 'current_user@.domain.com'
		}
	);
});

app.get('/testwithapidata', (req, res) => {
	axios.get(`${apiUrl}/testapidata`).then(response => {
		console.log('response', response.data)
		res.json({
			testapidata: response.data.testwithapi
		})
	})
});

connectDB()
	.on('error', console.log)
	.on('disconnected', connectDB)
	.once('open', startServer)
