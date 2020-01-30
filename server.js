const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/urlGeneratorRoutes.js');
const Joi = require('@hapi/joi');

const start = () => {
	const server = Hapi.Server({
		host: 'localhost',
		port: 8080
	});
	server.route(routes);
	server.validator(Joi);
	console.log(`Server running at: ${server.info.uri}`);
	return server;
};

module.exports = start;