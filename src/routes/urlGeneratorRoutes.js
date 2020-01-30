const urlGeneratorHandler = require('../handlers/urlGeneratorHandler');
const urlGeneratorSchema = require('../schemas/urlGeneratorSchema');

const routeArrays = [
	{path: '/urls', method:'POST', config : {handler: urlGeneratorHandler, validate:{payload: urlGeneratorSchema}}},
    
];

module.exports = routeArrays;