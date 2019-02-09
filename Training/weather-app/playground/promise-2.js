const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddresss = encodeURIComponent(address);
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=vSEAHpOFLzE60e7z9In0ktMyAv7Rxm5h&location=${encodedAddresss}`,
            json: true
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Google servers');
            } else if (body.info && body.info.statuscode === 400) {
                reject('Unable to find that address');
            } else if (body.results && body.results[0].locations && body.results[0].locations.length > 0) {
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });
    });
};

geocodeAddress('2 Warrene Keep, Stamford UK').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(`Error: ${errorMessage}`);
});