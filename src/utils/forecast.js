const request = require('request');

/* ******************* */
/*  API WeatherStack : */
/* ******************* */
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=8392e20a153f08b2f980e2a892853015&query=' + latitude + ',' + longitude;

    request({url, json: true }, function(error, response, body) {
        if(error) {
            callback('Unable to connect to weather service!', undefined, undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined, undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out' + ' in '
                + body.location.name + '. It is ' + body.current.weather_descriptions[0].toLowerCase(), body.current.weather_icons)
        }
    })
};

module.exports = forecast;