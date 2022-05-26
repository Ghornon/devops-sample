import mongoose from 'mongoose';
import config from './config';
import Logger from './logger';

const { DATABASE_IP, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD } = config;

const connect = async (
	uri = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_IP}:${DATABASE_PORT}`
) => {
	// let uri = 'mongodb://root:password@mongo:27017';

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	try {
		await mongoose.connect(uri, mongooseOpts);
		Logger.ok('Database connection successfully established');
	} catch (error) {
		Logger.error(error);
	}
};

const truncate = async () => {
	const { collections } = mongoose.connection;

	const promises = Object.keys(collections).map((collection) =>
		mongoose.connection.collection(collection).deleteMany({})
	);

	try {
		await Promise.all(promises);
	} catch (error) {
		Logger.error(error);
	}
};

const disconnect = async (mongoServer) => {
	try {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
		await mongoServer.stop();
	} catch (error) {
		Logger.error(error);
	}
};

export { connect, truncate, disconnect };
