'use strict';

require.config({
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		jquerySerializeObject: {
			deps: ['jquery']
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'Bootstrap'
		},
		backboneValidation: {
			deps: ['backbone'],
			exports: 'BackboneValidation'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		backboneRelational: {
			deps: ['backbone'],
			exports: 'BackboneRelational'
		},
		backgrid: {
			deps: ['backbone'],
			exports: 'Backgrid'
		}
	},
	paths: {
		jquery: '../components/jquery/dist/jquery',
		underscore: '../components/underscore/underscore',
		backbone: '../components/backbone/backbone',
		jquerySerializeObject: '../components/jquery-serialize-object/jquery.serialize-object',
		backboneValidation: '../components/backbone-validation/dist/backbone-validation-amd',
		backboneRelational: '../components/backbone-relational/backbone-relational',
		backboneLocalstorage: '../components/backbone.localstorage/backbone.localStorage',
		backgrid: '../components/backgrid/lib/backgrid',
		bootstrap: '../components/bootstrap/dist/js/bootstrap',
		text: '../components/requirejs-text/text'
	}
});

require([
	'helpers/dateFormat',
	'router',
	'views/app',
], function (DateFormat, Router, AppView) {
	new Router();
	Backbone.history.start();
	new AppView();
});
