define([
	'jquery',
	'underscore',
	'backbone',
	'collections/library',
	'views/listBooks'
], function ($, _, Backbone, library, ListBooksView) {

	'use strict';

	var Router = Backbone.Router.extend({

		initialize: function () {
			library.fetch();
			this.list = new ListBooksView({ collection: library, router: this });
		},

		routes: {
			'sort?:params': 'sort'
		},

		sort: function (params) {
			var field = params.split(';')[0];
			var sortParams = field.split('=');
			if (!sortParams[0] || !sortParams[1] || (sortParams[1] !== 'ascending' && sortParams[1] !== 'descending')) {
				this.navigate('', { trigger: true });
				return;
			}
			this.list.grid.sort(sortParams[0], sortParams[1]);
		}

	});

	return Router;
});
