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
const redirectUrl = async (request, h) => {
	try{
		const url = request.url.pathname.substr(1);
		const data = await dbUtils.findOneUrl(url);
		console.log(data);
		if(!data || !data.longurl){
			return h.response('Not Found').code(404);
		} 
		if(data.createdAt < new Date(new Date().getTime() - 30*60000)){
			return h.response('Gone').code(410);
		} 
		return h.redirect(data.longurl).code(200);
	}catch(e){
		return h.response(e.message).code(500);
	}
};

module.exports = {urlGenerator, redirectUrl};