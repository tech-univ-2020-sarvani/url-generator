const {urlGenerator, redirectUrl} = require('../handlers/urlGeneratorHandler');
const urlGeneratorSchema = require('../schemas/urlGeneratorSchema');

const routeArrays = [
	{path: '/urls', method:'POST', config : {handler: urlGenerator, validate:{payload: urlGeneratorSchema}}},
	{path: '/{id}', method:'GET', handler: redirectUrl},
];

module.exports = routeArrays;