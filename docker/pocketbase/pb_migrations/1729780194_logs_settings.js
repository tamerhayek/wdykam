/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		let settings = app.settings();

		settings.logs.logIps = process.env.PB_LOGS_IP_ENABLED === 'true';
		settings.logs.maxDays = process.env.PB_LOGS_MAX_DAYS;
		settings.logs.minLevel = process.env.PB_LOGS_MIN_LEVEL;

		app.save(settings);
	},
	() => {}
);
