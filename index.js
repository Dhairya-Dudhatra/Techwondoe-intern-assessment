const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose').set('debug', true);
const path = require('path');
 
 
 
// Router Files
const compRoutes = require('./routes/company');
const teamRoutes = require('./routes/team');
 
const DB_URL = process.env.DB_URL  

mongoose
	.connect( DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		 
	})
	.then(
		function () {
			//connected successfully
			console.log('Database connection successful!');
		},
		function (err) {
			console.log(err);
		}
	);

const app = express();
app.use(bodyParser.json());
 
 

 app.use('/', compRoutes)
 app.use('/', teamRoutes)

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`Server is running on port ${port} `);
});


