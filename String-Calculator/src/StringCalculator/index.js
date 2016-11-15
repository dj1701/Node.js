var stringcalculator = stringcalculator || {};

(function (my) {
		my.Add = function (value) {
			if(value === '') return 0;

			var numbers = value.split(/[,\n]+/);

			var result = sum(numbers);

			return result;
		};

		var sum = function(numbers){
			var total = 0;
			for(var i=0; i<numbers.length; i++){
				total += (numbers[i] | 0);
			}

			return total;
		}
})(stringcalculator);

module.exports = stringcalculator;
