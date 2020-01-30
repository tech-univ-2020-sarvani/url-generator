const db = require('../../models/index');
const insertUrls = async (data) => {
	const urlData = await db.urls.create({ longurl:data.longUrl, shorturl:data.shortUrl });
	return urlData;
};

module.exports = {insertUrls};