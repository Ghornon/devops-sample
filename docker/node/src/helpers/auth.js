import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import config from './config';

const genHash = async (password) => {
	const salt = await bcrypt.genSalt(10);

	const hash = await bcrypt.hash(password, salt);

	return hash;
};

const signToken = (userId, power) =>
	JWT.sign(
		{
			sub: userId,
			power,
		},
		config.JWT_SECRET,
		{ expiresIn: '1h' }
	);

export { genHash, signToken };
