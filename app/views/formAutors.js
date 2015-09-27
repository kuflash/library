define([
	'jquery',
	'underscore',
	'backbone',
	'backboneValidation',
	'models/autor',
	'views/formAutor',
	'text!templates/formAutors.html'
], function ($, _, Backbone, BackboneValidation, AutorModel, FormAutor, formAutorsTemplate) {

	'use strict';

	var FormAutors = Backbone.View.extend({

		template: _.template(formAutorsTemplate),

		events: {
			'click .add-autor-btn': 'addAutor',
			'click .remove-autor-btn': 'removeAutor'
		},

		initialize: function (options) {
			this.collection.on('add', this.render, this);
			this.collection.on('remove', this.render, this);
			this.render();
		},

		render: function () {

			var autors = this.collection.models;

			this.$el.html(this.template());

			var $content = this.$el.find('.content');

			_.each(autors, function (autor, index) {
				$content.append(new FormAutor({ model: autor, index: index }).el);
			});
		},

		addAutor: function () {
			this.collection.add(new AutorModel());
		},

		removeAutor: function (event) {
			var index = $(event.currentTarget).data('index');
			var autor = this.collection.get(index)
			this.collection.remove(this.collection.models[index]);
		}
	});

	return FormAutors;
});
