/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		const settings = app.settings();

		settings.backups.cron = process.env.PB_BACKUPS_CRON;
		settings.backups.cronMaxKeep = process.env.PB_BACKUPS_CRON_MAX_KEEP;

		settings.backups.s3.enabled = process.env.PB_BACKUPS_S3_ENABLED === 'true';
		if (settings.backups.s3.enabled) {
			settings.backups.s3.endpoint = process.env.PB_BACKUPS_S3_ENDPOINT;
			settings.backups.s3.bucket = process.env.PB_BACKUPS_S3_BUCKET;
			settings.backups.s3.region = process.env.PB_BACKUPS_S3_REGION;
			settings.backups.s3.accessKey = process.env.PB_BACKUPS_S3_ACCESS_KEY;
			settings.backups.s3.secretAccessKey = process.env.PB_BACKUPS_S3_SECRET_ACCESS_KEY;
		}

		app.save(settings);
	},
	() => {}
);
