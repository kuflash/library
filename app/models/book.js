define([
	'jquery',
	'underscore',
	'backbone',
	'backboneValidation',
	'collections/autors',
	'models/image'
], function ($, _, Backbone, BackboneValidation, AutorsCollection, ImageModel) {

	'use strict';

	var BookModel = Backbone.Model.extend({
		defaults: {
			title: '',
			autors: new AutorsCollection(),
			countPages: 1,
			publishName: '',
			publishYear: 2000,
			date: -5364673200000,
			isbn: '',
			image: new ImageModel()
		},
		validation: {
			title: function (value, attr, customValue, model) {
				if (!value) {
					return "Необходимо заполнить поле";
				} else if (value.length > 30) {
					return "Заголовок не должен превышать 30 символов";
				}
			},
			autors: function (value, attr, customValue, model) {

				if (!value || value.length < 1) {
					return "У книги должен быть хотя бы один автор"
				}

				var errors = value.map(function (entry) {
					return entry.isValid(true);
				});

				if (_.indexOf(errors, false) !== -1) {
					return 'Неверно заполнено поле: ' + attr;
				}
			},
			countPages: function (value, attr, customValue, model) {
				if (!value) {
					return "Необходимо заполнить поле"
				} else if (Number(value) < 0 || Number(value) > 10000) {
					return "Количество страниц должно быть в диапазоне от 0 до 10000"
				}
			},
			publishName: function (value, attr, customValue, model) {
				if (!value) {
					return "Необходимо заполнить поле";
				} else if (value.length > 30 ) {
					return "Название издательства не божет превышать 30 символов";
				}
			},
			publishYear: function (value, attr, customValue, model) {
				if (!value) {
					return "Необходимо заполнить поле";
				} else if (value < 1800) {
					return "Год публикации должен быть больше 1800";
				}
			},
			date: function (value) {
				var date = new Date(value).getTime();
				if (date < -5364673200000) {
					return 'Дата должна быть больше 1 января 1800 года';
				}
			},
			isbn: function (value) {
				if (value) {
					var pattern = new RegExp(/(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})/);
					if (!pattern.test(value)) {
						return "Не верный формат ISBN";
					}
				}
			},
			image: function (value) {
				if (value && !value.isValid(true)) {
					return 'Invalid ' + attr;
				}
			}
		},
		parse: function (data) {
			data.autors = new AutorsCollection(data.autors);
			data.image = new ImageModel(data.image);
			return data;
		}
	});

	return BookModel;
});
