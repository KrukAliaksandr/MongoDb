const todo = require('yargs');
const queryModules = require('./dbMethods');
const indexModules = require('./index');

todo.command('Run', 'getSimpleQueryAnd', function (yargs) {
	return yargs.options({});
},
async function () {
	await queryModules.dropAllTables();
	await queryModules.fillDatabase();
	const results = await queryModules.simpleQuery();
	await indexModules.writeToExcel(results);
}).help()
	.demandCommand(1, 'You need at least one command before moving on')
	.argv;
