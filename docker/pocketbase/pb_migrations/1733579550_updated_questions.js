/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_4009210445');

		// update collection data
		unmarshal(
			{
				indexes: ['CREATE INDEX `idx_XWElgxyA9z` ON `questions` (`index`)']
			},
			collection
		);

		// add field
		collection.fields.addAt(
			1,
			new Field({
				hidden: false,
				id: 'number2155046657',
				max: null,
				min: null,
				name: 'index',
				onlyInt: false,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			})
		);

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_4009210445');

		// update collection data
		unmarshal(
			{
				indexes: []
			},
			collection
		);

		// remove field
		collection.fields.removeById('number2155046657');

		return app.save(collection);
	}
);
