var ractive = new Ractive({
	el: '#main',
	template: '#example-template',
	data: {
		selected: 'readme'
	},
	preserveWhitespace: true,
	delimiters: ['{{', '}}'],

	// This is how we tell Ractive to keep an eye out for Backbone objects
	adaptors: ['Backbone']
});

ractive.on({
	select: function(event, film) {
		// `film` is a Backbone model
		this.set('selectedFilm', film);
	},
	highlight: function(event, talent) {
		// `talent` is a Backbone model (either an Actor or Director)
		talent.set('highlighted', event.hover); // true on mouseover, false on mouseout
	}
});

var Film = Backbone.Model.extend();
var FilmCollection = Backbone.Collection.extend({
	model: Film
});

var Field = Backbone.Model.extend({
	defaults: {
		context: 'state2',
		type: 'inputText',
		value: '300000',
		displayName: 'Number',
		name: 'ss',
		errors: [
			'Error1',
		],
		htmlAttributes: {
			id: 'ss2'
		}
	}
});
var FieldCollection = Backbone.Collection.extend({
	model: Field,
})
var filmCollection = new FilmCollection([]);
filmCollection.add({
	name: 'Hey',
	year: 1984,
});
ractive.set({
	films: filmCollection,
	selectedFilm: filmCollection.get('dr-no')
});