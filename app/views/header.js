define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'models/book'
], function ($, _, Backbone, Bootstrap, Book) {

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
			this.formBook.open(new Book());
			console.log(this);
		}
	});

	return Header;
});
