/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3246635500');

		// add field
		collection.fields.addAt(
			4,
			new Field({
				hidden: false,
				id: 'bool3710709107',
				name: 'is_correct',
				presentable: false,
				required: false,
				system: false,
				type: 'bool'
			})
		);

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3246635500');

		// remove field
		collection.fields.removeById('bool3710709107');

		return app.save(collection);
	}
);
