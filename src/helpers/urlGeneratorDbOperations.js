const db = require('../../models/index');
const insertUrls = async (data) => {
	const result = await db.urls.create({ longurl:data.longUrl, shorturl:data.shortUrl });
	return result;
};

const findOneUrl = async(url) => {
	const urlData = await db.urls.findOne({where: {
		shorturl: url
	}});
	console.log(urlData);
	return urlData;
};

module.exports = {insertUrls, findOneUrl};