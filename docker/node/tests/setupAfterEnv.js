import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, truncate, disconnect } from '../src/helpers/database';
import testHelper from './testHelper';

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();

	await connect(uri);
	await truncate();
	await testHelper.seedUserCollection();
});

afterAll(() => disconnect(mongoServer));
