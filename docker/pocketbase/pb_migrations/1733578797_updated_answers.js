/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3246635500');

		// remove field
		collection.fields.removeById('text3617549073');

		// add field
		collection.fields.addAt(
			1,
			new Field({
				cascadeDelete: false,
				collectionId: 'pbc_653341844',
				hidden: false,
				id: 'relation3617549073',
				maxSelect: 1,
				minSelect: 0,
				name: 'participant',
				presentable: false,
				required: false,
				system: false,
				type: 'relation'
			})
		);

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3246635500');

		// add field
		collection.fields.addAt(
			1,
			new Field({
				autogeneratePattern: '',
				hidden: false,
				id: 'text3617549073',
				max: 0,
				min: 0,
				name: 'participant',
				pattern: '',
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'text'
			})
		);

		// remove field
		collection.fields.removeById('relation3617549073');

		return app.save(collection);
	}
);
