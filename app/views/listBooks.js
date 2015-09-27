define([
	'jquery',
	'underscore',
	'backbone',
	'backgrid',
	'views/formBook',
	'text!templates/actionCell.html'
], function ($, _, Backbone, Backgrid, FormBook, actionCellTemplate) {

	'use strict';

	var Grid = Backbone.View.extend({

		el: '#content',

		actionCellTemplate: _.template(actionCellTemplate),

		initialize: function (options) {

			var actionCell = this.actionCellTemplate();

			var router = options.router;

			this.row = Backgrid.Row.extend({
				className: 'library__book'
			});

			this.header = Backgrid.Header.extend({
				className: 'library__header'
			});

			this.headerCell = Backgrid.HeaderCell.extend({
				className: 'library__header-cell',

				setCellDirection: function (column, direction) {
					Backgrid.HeaderCell.prototype.setCellDirection.apply(this, arguments);
					if (direction) {
						router.navigate('sort?' + [column.get('name'), direction].join('='), { trigger: false } );
					} else {
						router.navigate('', { trigger: false } );
					}
				}
			});

			this.body = Backgrid.Body.extend({
				className: 'library__body'
			});

			this.columns = [
				{
					name: 'image',
					label: 'Обложка',
					editable: false,
					sortable: false,
					headerCell: this.headerCell,
					cell: Backgrid.Cell.extend({

						className: 'library__book-cover',

						render: function () {
							this.$el.empty();
							this.$el.html( this.renderImage( this.model ) );
							this.delegateEvents();
							return this;
						},

						renderImage: function(model) {
							var img = this.model.get('image').get('value')
							return '<img src="'+img+'" width="120">';
						}
					})
				},
				{
					name: 'title',
					label: 'Заголовок',
					editable: false,
					headerCell: this.headerCell,
					cell: Backgrid.StringCell.extend({
						className: 'library__book-title'
					})
				},
				{
					name: 'autors',
					label: 'Авторы',
					editable: false,
					sortable: false,
					headerCell: this.headerCell,
					cell: 'string',
					formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
						fromRaw: function (autors, model) {

							var result = "";

							_.map(autors.models, function (autor, index) {
								result += autor.toString() + (index < autors.models.length - 1 ? ', ' : '');
							});

							return result
						}
					})
				},
				{
					name: 'publishName',
					label: 'Издательство',
					editable: false,
					sortable: false,
					headerCell: this.headerCell,
					cell: 'string'
				},
				{
					name: 'publishYear',
					label: 'Год публикации',
					editable: false,
					headerCell: this.headerCell,
					cell: 'integer',
					formatter:  _.extend({}, Backgrid.CellFormatter.prototype, {
						fromRaw: function (year, model) {
							return new String(year);
						}
					})
				},
				{
					name: 'date',
					label: 'Дата выхода в тираж',
					editable: false,
					sortable: false,
					headerCell: this.headerCell,
					cell: 'date'
				},
				{
					name: 'isbn',
					label: 'ISBN',
					editable: false,
					sortable: false,
					headerCell: this.headerCell,
					cell: 'string'
				},
				{
					label: 'Действие',
					editable: false,
					sortable: false,
					headerCell: this.headerCell,
					cell: Backgrid.Cell.extend({

						className: "action-cell",

						events: {
							'click button.edit-btn': 'editBook',
							'click button.remove-btn': 'removeBook'
						},

						initialize: function () {
							_.bindAll(this, 'render', 'editBook', 'removeBook');
						},

						render: function () {
							this.$el.empty();
							this.$el.html(actionCell);
							this.delegateEvents();
							return this;
						},

						editBook: function () {
							FormBook.open(this.model);
						},

						removeBook: function (event) {
							this.model.destroy();
						}
					})
				}
			];

			this.render();
		},
		render: function () {

			this.grid = new Backgrid.Grid({
				className: 'library',
				header: this.header,
				body: this.body,
				row: this.row,
				columns: this.columns,
				collection: this.collection,
				emptyText: 'Каталог пуст'
			});

			this.$el.html(this.grid.render().el);

			return this;
		}
	});

	return Grid;
});
