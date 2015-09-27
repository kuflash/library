define([
	'jquery',
	'underscore',
	'backbone',
	'models/book'
], function ($, _, Backbone, BookModel) {

	'use strict';

	var Header = Backbone.View.extend({

		el: '.header',

		events: {
			'click .add-book-btn': 'openPopupAddBook'
		},

		initialize: function (options) {
			this.formBook = options.formBook;
		},

		openPopupAddBook: function () {
			this.formBook.open(new BookModel());
		}
	});

	return Header;
});
