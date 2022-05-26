import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			select: false,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		firstName: String,
		lastName: String,
		resetToken: String,
		isVerified: Boolean,
		verificationToken: String,
		uploaded: Array,
		shearedWithMe: Array,
	},
	{ timestamps: true }
);

const UserModel = mongoose.model('Users', UserSchema);
export default UserModel;
