define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/autor'
], function ($, _, Backbone, Store, AutorModel) {

	'use strict';

	var Autors = Backbone.Collection.extend({
		model: AutorModel,
		initialize: function () {
			if (this.length === 0) {
				this.add(new AutorModel());
			}
		}
	});

	return Autors;
});
