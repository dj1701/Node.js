import angular from 'angular';
import { expect } from 'chai';

describe('String Calculator Tests', function(){
  var stringCalculator;

	beforeEach(ngModule('app'));

  beforeEach(inject(($injector) => {
    var injector = $injector;
    stringCalculator = injector.get("stringCalculator");
  }));

  it('should have a working stringCalculator object', function() {
    expect(stringCalculator).to.exist;
  });

	it('Return 0 for empty string ', function() {
    var result = stringCalculator.add('');

    expect(result).to.be.equal(0);
  });

	it('Return 1 for the input of 1', function(){
			var result = stringCalculator.add('1');

			expect(result).to.be.equal(1);
	});

	it('Return 3 for the input of 1,2', function(){
			var result = stringCalculator.add('1,2');

			expect(result).to.be.equal(3)
	});

	it('Return 4 for input of 1,1,1,1', function(){
			var result = stringCalculator.add('1,1,1,1');

			expect(result).to.be.equal(4);
	});

	it('Return 124 for input of 49,49,25,1,0', function(){
			var result = stringCalculator.add('49,49,25,1,0');

			expect(result).to.be.equal(124);
	});

	it('Return 6 for the input of 1\\n2,3', function(){
			var result = stringCalculator.add('1\\n2,3');

      expect(result).to.be.equal(6);
	});
});
