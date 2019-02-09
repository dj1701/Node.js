var primefactors = primefactors || {};

(function(my) {

  my.generate = (given) => {
    var divider = 2;

    if (given < 2 || given == '' || given == null) {
        throw new Error('Can not accept invalid parameter');
    }

    var factors = isPrimeNumber(given) ? [given] : findPrimeFactors(given, divider);

    return new Promise((resolve, reject) => {
        resolve(factors);
    });
  };

  var findPrimeFactors = (primeFactor, divider) => {
    var prime_factors = [];

    for (var i = 2; i <= primeFactor; i++) {
        while ((primeFactor % i) === 0) {
            primeFactor /= i;
            prime_factors.push(i);
        }
    }

    return prime_factors;
  }

  var isPrimeNumber = (number) => {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

})(primefactors);

module.exports = primefactors;