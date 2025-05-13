module.exports = {
	secrets: {
		THE_SECRET: 'THIS IS NOT SECRET',
	},
	customEnvVariables: {
		THE_SECRET: '{{ secrets.THE_SECRET }}',
		THE_SECRET_NOT_SHOWN: '{{ secrets.THE_SECRET}}',
	},
	allowedPostUpgradeTasks: [
		"^./dump-env$"
	]
}
