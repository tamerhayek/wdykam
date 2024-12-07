/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_4009210445');

		// update collection data
		unmarshal(
			{
				indexes: ['CREATE UNIQUE INDEX `idx_XWElgxyA9z` ON `questions` (`index`)']
			},
			collection
		);

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_4009210445');

		// update collection data
		unmarshal(
			{
				indexes: ['CREATE INDEX `idx_XWElgxyA9z` ON `questions` (`index`)']
			},
			collection
		);

		return app.save(collection);
	}
);
