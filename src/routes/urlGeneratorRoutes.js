const {urlGenerator, redirectUrl} = require('../handlers/urlGeneratorHandler');
const {urlGeneratorSchema, redirectUrlSchema} = require('../schemas/urlGeneratorSchema');

const routeArrays = [
	{path: '/urls', method:'POST', config : {handler: urlGenerator, validate:{payload: urlGeneratorSchema}}},
	{path: '/{id}', method:'GET', config : {handler: redirectUrl, validate:{params: redirectUrlSchema}}},
];

module.exports = routeArrays;