(function() {
    "use strict"

    angular
        .module('app', [])
        .factory('stringCalculator', Calculator);

    function Calculator() {
        var stringCalculator = {};

        stringCalculator.add = function(value) {
            if (value === '') return 0;

            var numbers = value.split(/[,\\n]+/);

            var result = sum(numbers);

            return result;
        }

        var sum = function(numbers) {
            var total = 0;
            for (var i = 0; i < numbers.length; i++) {
                total += (numbers[i] | 0);
            }

            return total;
        };

        return stringCalculator;
    };

})();
