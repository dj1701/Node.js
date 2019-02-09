const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddresss = encodeURIComponent(argv.address);
var geocodeUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=vSEAHpOFLzE60e7z9In0ktMyAv7Rxm5h&location=${encodedAddresss}`;

axios.get(geocodeUrl).then((response) => {
    console.log(response);
    if(!response.results) {
        throw new Error('Unable to find that address');
    }
    var latitude = response.results[0].locations[0].latLng.lat;
    var longitude = response.results[0].locations[0].latLng.lng;
    console.log(response.results[0].providedLocation.location);
    var weatherUrl = `https://api.darksky.net/forecast/e8900e3468de39456509d84ad7aabbff/${latitude},${longitude}`;
    axios.get(weatherUrl);
}).then((response) => {
    console.log(`Curennt temperature: ${response.currently.temperature} Apparent Temperature: ${response.currently.apparentTemperature}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});