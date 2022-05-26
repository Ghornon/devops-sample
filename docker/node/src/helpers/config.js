const config = {
	PORT: process.env.PORT || 8080,
	DATABASE_IP: process.env.DATABASE_IP || 'mongo',
	DATABASE_PORT: process.env.DATABASE_POR || 27017,
	DATABASE_USER: process.env.DATABASE_USER || 'root',
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'password',
	JWT_SECRET: process.env.JWT_SECRET || '!YmZd!uj@6w7b4=cG5dC',
};

export default config;
