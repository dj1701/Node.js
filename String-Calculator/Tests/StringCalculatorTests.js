var should = require('should');
var calculator = require('../src/StringCalculator.js');

describe('String Calculator Tests', function(){
	it('Return 0 for empty string ', function(){
      var result = calculator.Add('');

      result.should.be.exactly(0);
  })

	it('Return 1 for the input of 1', function(){
			var result = calculator.Add('1');

			result.should.be.exactly(1);
	})

	it('Return 3 for the input of 1,2', function(){
			var result = calculator.Add('1,2');

			result.should.be.exactly(3);
	})

	it('Return 4 for input of 1,1,1,1', function(){
			var result = calculator.Add('1,1,1,1');

			result.should.be.exactly(4);
	})

	it('Return 124 for input of 49,49,25,1,0', function(){
			var result = calculator.Add('49,49,25,1,0');

			result.should.be.exactly(124);
	})

	it('Return 6 for the input of 1\\n2,3', function(){
			var result = calculator.Add('1\n2,3');

			result.should.be.exactly(6);
	})
})
