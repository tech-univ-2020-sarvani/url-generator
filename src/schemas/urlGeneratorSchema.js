const Joi = require('@hapi/joi');

const urlGeneratorSchema = Joi.object({
	longUrl:Joi.string().required(),
});

module.exports = urlGeneratorSchema;