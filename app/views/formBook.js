define([
	'jquery',
	'underscore',
	'backbone',
	'backboneValidation',
	'bootstrap',
	'jquerySerializeObject',
	'models/book',
	'models/image',
	'collections/library',
	'views/formAutors',
	'views/formImage',
	'text!templates/formBook.html'
], function ($, _, Backbone, BackboneValidation, Bootstrap, jquerySerializeObject, Book, Image, Library, FormAutors, FormImage, formBookTemplate) {

	'use strict';

	var FormBook = Backbone.View.extend({

		template: _.template(formBookTemplate),

		events: {
			'click .save-btn': 'save'
		},

		initialize: function () {
		},

		render: function () {

			var bookData = this.model.toJSON();

			this.setElement(this.template({ book: bookData }));

			this.$form = this.$el.find('form');
			this.$formAutors = this.$el.find('#formAutors');
			this.$formImage = this.$form.find('#formImage');

			this.$formAutors.html(new FormAutors({ collection: this.model.get('autors') }).el);
			this.$formImage.html(new FormImage({ model: this.model.get('image') }).el);

			Backbone.Validation.bind(this, {
				valid: function(view, attr) {
					var index = view.index;
					var selector = '[name="'+ attr +'"]';
					var $input = view.$el.find(selector);
					$input
						.closest('.form-group')
						.removeClass('has-error')
						.next('.bg-danger')
						.empty();
				},
				invalid: function(view, attr, error) {
					var index = view.index;
					var selector = '[name="'+ attr +'"]';
					var $input = view.$el.find(selector);
					$input
						.closest('.form-group')
						.addClass('has-error')
						.next('.bg-danger')
						.text(error);
				}
			});
		},

		open: function (model) {
			this.model = model;
			this.render();
			this.$el.modal('show');
		},

		serialize: function () {
			var result = this.$form.serializeObject();

			result.date = new Date(result.date).getTime();
			delete result.image;
			delete result.autors;

			return result;
		},

		save: function () {

			var formData = this.serialize();
			var errors = null;
			this.model.set(formData);
			if (this.model.isValid(true)) {
				Library.add(this.model);
				this.model.save();
				this.$el.modal('hide');
			} else {
				console.log(this.model.validate());
			}

		}
	});

	return new FormBook();
});
