define([
	'jquery',
	'underscore',
	'backbone',
	'models/autor'
], function ($, _, Backbone, AutorModel) {

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
