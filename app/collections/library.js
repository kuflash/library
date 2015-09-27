define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/book'
], function ($, _, Backbone, Store, BookModel) {

	'use strict';

	var Library = Backbone.Collection.extend({
		model: BookModel,
		localStorage: new Store('LibraryStore')
	});

	return new Library();
});
