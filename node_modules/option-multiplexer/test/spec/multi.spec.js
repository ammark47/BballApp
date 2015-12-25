
var multiplex = require('multi');

describe('multiplex', function() {
	it('should generate correct values', function() {
		var preset = {
			foo: ['a', 'b'],
			bar: [ 'c', 'd' ],
			baz: 'x',
			bom: { herp: 'derp' }
		};

		var result = multiplex(preset);

		expect(result).to.have.property('length', 4);
		expect(result[0]).to.have.property('foo', 'a');
		expect(result[1]).to.have.property('foo', 'a');
		expect(result[2]).to.have.property('foo', 'b');
		expect(result[3]).to.have.property('foo', 'b');
	});
});
