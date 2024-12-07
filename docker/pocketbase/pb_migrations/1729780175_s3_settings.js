/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		let settings = app.settings();

		settings.s3.enabled = process.env.PB_S3_ENABLED === 'true';
		if (settings.s3.enabled) {
			settings.s3.endpoint = process.env.PB_S3_ENDPOINT;
			settings.s3.bucket = process.env.PB_S3_BUCKET;
			settings.s3.region = process.env.PB_S3_REGION;
			settings.s3.accessKey = process.env.PB_S3_ACCESS_KEY;
			settings.s3.secretAccessKey = process.env.PB_S3_SECRET_ACCESS_KEY;
		}

		app.save(settings);
	},
	() => {}
);
