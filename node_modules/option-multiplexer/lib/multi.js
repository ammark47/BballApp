
var _ = require('lodash'),
	product = require('cartesian-product');

function arrayify(item) {
	return _.isArray(item) ? item : [item];
}

function multiplex(preset) {
	var choices = product(_.map(_.values(preset), arrayify));
	return _.map(choices, _.partial(_.zipObject, _.keys(preset)));
}

module.exports = multiplex;
