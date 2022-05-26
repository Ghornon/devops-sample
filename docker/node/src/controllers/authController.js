import UserModel from '../models/userModel';
import { genHash, signToken } from '../helpers/auth';

const logIn = async (req, res) => {
	const { _id, power } = req.user;
	const token = signToken(_id, power);

	return res.status(200).json({ token });
};

const signUp = async (req, res) => {
	const { username, email, password, firstName, lastName } = req.body;

	const isUserExist = await UserModel.findOne({ username }).exec();

	if (isUserExist) {
		return res.status(409).json({
			code: 409,
			message: '"Username" already taken!',
			type: 'client.conflict',
			context: 'username',
		});
	}

	const hash = await genHash(password);
	const verificationToken = new Date().getTime();

	const newUser = new UserModel({
		username,
		email,
		password: hash,
		firstName,
		lastName,
		resetToken: '',
		isVerified: false,
		verificationToken,
		uploaded: [],
		shearedWithMe: [],
	});

	await newUser.save((error, doc) => {
		if (error)
			return res.status(500).json({
				code: 500,
				message: 'Internal Server Error',
				type: 'server.internal',
				context: 'server',
			});
		return doc;
	});

	const token = signToken(newUser.id, newUser.power);

	return res.status(201).json({ code: 201, token });
};

const verifyUser = async (req, res) => {
	const { userId, verificationToken } = req.params;

	const user = UserModel.findOne({ _id: userId, verificationToken }).exec();

	if (user) {
		user.verificationToken = '';
		user.isVerified = true;

		user.save((error, doc) => {
			if (error)
				return res.status(500).json({
					code: 500,
					message: 'Internal Server Error',
					type: 'server.internal',
					context: 'server',
				});
			return doc;
		});
	}

	return res.status(400).json({
		code: 400,
		message: 'Bad request',
	});
};

export default {
	logIn,
	signUp,
	verifyUser,
};
