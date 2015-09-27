define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'views/header',
	'views/formBook',
], function ($, _, Backbone, Bootstrap, Header, FormBook) {

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
