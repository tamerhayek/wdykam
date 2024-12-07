/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3246635500');

		// update field
		collection.fields.addAt(
			1,
			new Field({
				cascadeDelete: true,
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

		// update field
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
	}
);
