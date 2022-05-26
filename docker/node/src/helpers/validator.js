import Joi from '@hapi/joi';

const validateBody = (schema) => (req, res, next) => {
	const result = schema.validate(req.body);

	if (result.error) {
		const {
			message,
			type,
			context: { label },
		} = result.error.details[0];

		return res.status(400).json({
			code: 400,
			message,
			type,
			context: label,
		});
	}

	return next();
};

const schemas = {
	User: {
		username: Joi.string().min(5),
		email: Joi.string().email(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,40}$')),
		repeatPassword: Joi.ref('password'),
		firstName: Joi.string().min(3).alphanum(),
		lastName: Joi.string().min(3).alphanum(),
	},
};

const bodySchemas = {
	authSchema: Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().required(),
	}),
	createUserSchema: Joi.object().keys({
		...schemas.User,
		username: schemas.User.username.required(),
		email: schemas.User.email.required(),
		password: schemas.User.password.required(),
	}),
};

export { validateBody, bodySchemas };
