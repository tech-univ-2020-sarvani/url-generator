'use strict';
module.exports = (sequelize, DataTypes) => {
	const urls = sequelize.define('urls', {
		longurl: DataTypes.STRING,
		shorturl: DataTypes.STRING
	}, {});
	urls.associate = function(models) {
		// associations can be defined here
	};
	return urls;
};