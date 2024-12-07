/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = new Collection({
			fields: [
				{
					autogeneratePattern: '[a-z0-9]{15}',
					hidden: false,
					id: 'text3208210256',
					max: 15,
					min: 15,
					name: 'id',
					pattern: '^[a-z0-9]+$',
					presentable: false,
					primaryKey: true,
					required: true,
					system: true,
					type: 'text'
				},
				{
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
				},
				{
					hidden: false,
					id: 'select3671935525',
					maxSelect: 1,
					name: 'answer',
					presentable: false,
					required: false,
					system: false,
					type: 'select',
					values: ['one', 'two', 'three', 'four']
				},
				{
					cascadeDelete: false,
					collectionId: 'pbc_4009210445',
					hidden: false,
					id: 'relation276039651',
					maxSelect: 1,
					minSelect: 0,
					name: 'related_question',
					presentable: false,
					required: false,
					system: false,
					type: 'relation'
				},
				{
					hidden: false,
					id: 'autodate2990389176',
					name: 'created',
					onCreate: true,
					onUpdate: false,
					presentable: false,
					system: false,
					type: 'autodate'
				},
				{
					hidden: false,
					id: 'autodate3332085495',
					name: 'updated',
					onCreate: true,
					onUpdate: true,
					presentable: false,
					system: false,
					type: 'autodate'
				}
			],
			id: 'pbc_3246635500',
			indexes: [],
			name: 'answers',
			system: false,
			type: 'base',
			createRule: '',
			listRule: '',
			viewRule: '',
			updateRule: null,
			deleteRule: null
		});

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3246635500');

		return app.delete(collection);
	}
);
