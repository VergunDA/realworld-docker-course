const express = require('express');
const axios = require('axios')
const mongoose = require('mongoose');
const { connectDB } = require('./helpers/db');
const app = express();
const { port, host, db, authApiUrl } = require('./configuration');

const postSchema = new mongoose.Schema({
	name: String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
	app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
		console.log(`host: ${host}`);
		console.log(`db: ${db}`);

		const post = new Post({name: 'new post'});
		console.log(post)
	});
}

app.get('/test', (req, res) => {
	res.send("Our API server is working correctly");
});


app.get('/testwithcurrentuser', (req, res) => {
	console.log('my request')
	const path = `${authApiUrl}/currentUser`
	console.log('path', path)
	axios.get(path).then((response) =>
		res.json({
	   testwithcurrentuser: true,
			currentUserFromAuth: response.data
		})
	)
});

app.get('/api/testapidata', (req, res) => {
	res.json({
		testwithapi: true
	})
	}
);

connectDB()
	.on('error', console.log)
	.on('disconnected', connectDB)
	.once('open', startServer)
