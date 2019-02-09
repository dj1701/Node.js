const request = require('request');

var weather = (latitude, longitude, callBack) => {
    request({
        url: `https://api.darksky.net/forecast/e8900e3468de39456509d84ad7aabbff/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callBack('Unable to connnect to DarkSky server.');
        } else if(response.statusCode === 400){
            callBack('Unable to fetch weather');
        } else if(response.statusCode === 200){
            callBack(undefined, `Curennt temperature: ${body.currently.temperature} Apparent Temperature: ${body.currently.apparentTemperature}`);
        }
    });
};

module.exports = {
    weather
};