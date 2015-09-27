define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/formImage.html'
], function ($, _, Backbone, formImageTemplate) {

	'use strict';

	var FormImage = Backbone.View.extend({

		template: _.template(formImageTemplate),

		events: {
			'shown.bs.tab a[data-toggle="tab"]': 'selectImageType',
			'change input[type="file"]': 'uploadImage',
			'change #bookImageURL': 'downloadImage',
			'click .download-image-btn': 'downloadImage'
		},

		initialize: function (options) {
			this.listenTo(this.model, 'change', this.render);
			this.fileReader = new FileReader();
			this.fileReader.onloadend = this.fileToBase64.bind(this);
			this.render();
		},

		render: function () {
			this.$el.html(this.template({ image: this.model.toJSON() }));
		},

		selectImageType: function (event) {
			var $currentTab = $(event.target);
			var $previousTab = $(event.relatedTarget);
			var type = $currentTab.data('type');
			this.model.set('type', type);
		},

		uploadImage: function (event) {

			var $input = $(event.currentTarget);
			var file = $input.get(0).files[0];

			if (file) {
				this.fileReader.readAsDataURL(file);
			}
		},

		downloadImage: function (event) {

			var url = this.$el.find('#bookImageURL').val();

			if (url) {
				this.model.set('value', this.$el.find('#bookImageURL').val());
			}
		},

		fileToBase64: function () {
			this.model.set('value', this.fileReader.result);
		}
	});

	return FormImage;
});
