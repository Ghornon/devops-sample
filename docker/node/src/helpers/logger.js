/* eslint no-console: 0 */
import chalk from 'chalk';

const Logger = {
	ok: (...data) => {
		console.log(chalk.greenBright('[OK]'), ...data);
	},
	info: (...data) => {
		console.info(chalk.blueBright('[INFO]'), ...data);
	},
	debug: (...data) => {
		console.info(chalk.blue('[DEBUG]'), ...data);
	},
	warn: (...data) => {
		console.warn(chalk.yellow('[WARN]'), ...data);
	},
	error: (...data) => {
		console.error(chalk.red('[ERROR]'), ...data);
	},
	chalk,
};

export default Logger;
