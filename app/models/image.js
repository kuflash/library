define([
	'jquery',
	'underscore',
	'backbone',
	'backboneValidation'
], function ($, _, Backbone, BackboneValidation) {

	'use strict';

	var ImageModel = Backbone.Model.extend({
		defaults: {
			type: 'file',
			value: 'data:image/jpeg;base64,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'
		},
		validation: {
			type: function (value) {
				if (value !== 'file' &&  value !== 'url') {
					return 'Неверный формат';
				}
			},
			value: function (value, attr, customValue, model) {
				console.log(value, attr, customValue, model);
			}
		}
	});

	return ImageModel;
});
