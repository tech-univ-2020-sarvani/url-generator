const dbUtils = require('../helpers/urlGeneratorDbOperations');
const urlGenerator = async (request, h)=> {
	try{
		let data = request.payload;
		const shortUrl = Math.random().toString(12).replace('0.', '');
		data.shortUrl = shortUrl;
		const result = await dbUtils.insertUrls(data); 
		return h.response(`Short URL: ${result.dataValues.shorturl}`).code(200);
	}
	catch(e){
		return h.response(e.message).code(500);
	}
};

module.exports = urlGenerator;