// variable declarations
const router = require('express').Router();
const apiRoutes = require('./routes/apiRoutes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// provide file path for static resources
app.use(express.static('public'));

// use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

module.exports = router;

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});