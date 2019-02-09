const request = require('request');

var geocodeAddress = (address, callBack) => {
    var encodedAddresss = encodeURIComponent(address);
    console.log(`Encoded addresss: ${encodedAddresss}`);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=vSEAHpOFLzE60e7z9In0ktMyAv7Rxm5h&location=${encodedAddresss}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callBack('Unable to connect to Google servers');
        } else if (body.info && body.info.statuscode === 400) {
            callBack('Unable to find that address');
        } else if (body.results && body.results[0].locations && body.results[0].locations.length > 0) {
            callBack(undefined, {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
};