import app from './app';
import Logger from './helpers/logger';
import config from './helpers/config';

const { PORT } = config;

app.listen(PORT, () => Logger.info(`Test app listening on port ${Logger.chalk.blue.bold(PORT)}!`));
