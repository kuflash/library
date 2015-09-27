define([
	'jquery',
	'underscore',
	'backbone',
	'backboneValidation',
	'text!templates/formAutor.html'
], function ($, _, Backbone, BackboneValidation, formAutorTemplate) {

	'use strict';

	var FormAutor = Backbone.View.extend({

		template: _.template(formAutorTemplate),

		events: {
			'keyup input.autor-name': 'changeAutorName',
			'keyup input.autor-last-name': 'changeAutorLastName'
		},

		initialize: function (options) {

			_.bindAll(this, 'changeAutorName', 'changeAutorLastName');

			this.index = options.index;
			this.render();
		},

		render: function () {
			this.$el.html(this.template({ autor: this.model.toJSON(), index: this.index}));
			Backbone.Validation.bind(this, {
				valid: function(view, attr) {
					var index = view.index;
					var selector = '[name="autors[' + index + ']['+ attr +']"]';
					var $input = view.$el.find(selector);
					$input
						.closest('.form-group')
						.removeClass('has-error')
						.siblings('.bg-danger')
						.empty();
				},
				invalid: function(view, attr, error) {
					var index = view.index;
					var selector = '[name="autors[' + index + ']['+ attr +']"]';
					var $input = view.$el.find(selector);
					$input
						.closest('.form-group')
						.addClass('has-error')
						.siblings('.bg-danger')
						.text(error);
				}
			});
		},

		changeAutorName: function (event) {
			this.model.set('name', $(event.currentTarget).val());
		},

		changeAutorLastName: function (event) {
			this.model.set('lastName', $(event.currentTarget).val());
		}
	});

	return FormAutor;
});
