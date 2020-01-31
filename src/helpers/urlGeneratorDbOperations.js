const db = require('../../models/index');
const insertUrls = async (data) => {
	const urlData = await db.urls.create({ longurl:data.longUrl, shorturl:data.shortUrl });
	return urlData;
};

const findOneUrl = async(url) => {
	const urlData = await db.urls.findOne({where: {
		shorturl: url
	}});
	return urlData;
};

module.exports = {insertUrls, findOneUrl};