define([
	'jquery',
	'underscore',
	'backbone',
	'backboneValidation'
], function ($, _, Backbone, BackboneValidation) {

	'use strict';

	var AutorModel = Backbone.Model.extend({
		defaults: {
			name: null,
			lastName: null
		},
		validation: {
			name: function (value, attr, customValue, model) {
				if (!value) {
					return "Необходимо заполнить поле";
				} else if (value.length > 20) {
					return "Имя должно быть не больше 20 символов";
				}
			},
			lastName: function (value, attr, customValue, model) {
				if (!value) {
					return "Необходимо заполнить поле";
				} else if (value.length > 20) {
					return "Фамилия должна быть не больше 20 символов";
				}
			}
		},

		toString: function () {
			return this.get('lastName') + ' ' + this.get('name');
		}
	});

	return AutorModel;
});
