const Joi = require('@hapi/joi');

const urlGeneratorSchema = Joi.object({
	longUrl:Joi.string().required(),
});

const redirectUrlSchema = Joi.object({
	id:Joi.string().required(),
});

module.exports = {urlGeneratorSchema, redirectUrlSchema};