/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		let settings = app.settings();

		settings.meta.senderName = process.env.PB_SMTP_SENDER_NAME;
		settings.meta.senderAddress = process.env.PB_SMTP_SENDER_ADDRESS;
		settings.smtp.enabled = process.env.PB_SMTP_ENABLED === 'true';
		if (settings.smtp.enabled) {
			settings.smtp.host = process.env.PB_SMTP_HOST;
			settings.smtp.port = process.env.PB_SMTP_PORT;
			settings.smtp.username = process.env.PB_SMTP_USERNAME;
			settings.smtp.password = process.env.PB_SMTP_PASSWORD;
		}
		app.save(settings);
	},
	() => {}
);
