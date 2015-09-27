define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'collections/library',
	'views/header',
	'views/formBook',
	// 'views/listBooks'
], function ($, _, Backbone, Bootstrap, library, Header, FormBook) {

	'use strict';

	var AppView = Backbone.View.extend({

		el: '#app',

		initialize: function () {
			this.header = new Header({
				formBook: FormBook
			});
			this.render();
		},

		render: function () {
			this.$el.append(FormBook.$el);
			return this;
		}
	});

	return AppView;
});
