const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoicnZjazIwMDciLCJhIjoiY201aTE4dDhrMGpucTJrc2J5MWE4anUyMCJ9.UreUCFhJOAHInLHB0DdG4A';

    request({ url, json: true }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Geocode service!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode;