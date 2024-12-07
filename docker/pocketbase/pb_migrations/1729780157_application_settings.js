/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		let settings = app.settings();

		settings.meta.appName = process.env.PB_APP_NAME;
		settings.meta.appUrl = process.env.PB_APP_URL;

		app.save(settings);
	},
	() => {}
);
