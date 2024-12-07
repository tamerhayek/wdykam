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
					id: 'text3069659470',
					max: 0,
					min: 0,
					name: 'question',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					hidden: false,
					id: 'select2718152672',
					maxSelect: 1,
					name: 'correct_answer',
					presentable: false,
					required: false,
					system: false,
					type: 'select',
					values: ['one', 'two', 'three', 'four']
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text2406893705',
					max: 0,
					min: 0,
					name: 'answer_one',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text3838854174',
					max: 0,
					min: 0,
					name: 'answer_two',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text3724489126',
					max: 0,
					min: 0,
					name: 'answer_three',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text3471476157',
					max: 0,
					min: 0,
					name: 'answer_four',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					hidden: false,
					id: 'file579229346',
					maxSelect: 1,
					maxSize: 0,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					name: 'image_one',
					presentable: false,
					protected: false,
					required: false,
					system: false,
					thumbs: [],
					type: 'file'
				},
				{
					hidden: false,
					id: 'file1226857013',
					maxSelect: 1,
					maxSize: 0,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					name: 'image_two',
					presentable: false,
					protected: false,
					required: false,
					system: false,
					thumbs: [],
					type: 'file'
				},
				{
					hidden: false,
					id: 'file1367366748',
					maxSelect: 1,
					maxSize: 0,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					name: 'image_three',
					presentable: false,
					protected: false,
					required: false,
					system: false,
					thumbs: [],
					type: 'file'
				},
				{
					hidden: false,
					id: 'file1660652771',
					maxSelect: 1,
					maxSize: 0,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					name: 'image_four',
					presentable: false,
					protected: false,
					required: false,
					system: false,
					thumbs: [],
					type: 'file'
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
			id: 'pbc_4009210445',
			indexes: [],
			name: 'questions',
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
		const collection = app.findCollectionByNameOrId('pbc_4009210445');

		return app.delete(collection);
	}
);
