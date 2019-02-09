const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .argv
console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage){
        console.log(errorMessage);
    } else {
        console.log(`Address: ${results.address}`);
        weather.weather(results.latitude, results.longitude, (errorMessage, results) => {
            if (errorMessage){
                console.log(errorMessage);
            } else {
                console.log(results);
            }
        });
    }
});

//https://api.darksky.net/forecast/e8900e3468de39456509d84ad7aabbff/52.65106,-0.48286

