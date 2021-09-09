const request = require('postman-request')

const geocode = (adress, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZGF2aWRlY29iYWV6IiwiYSI6ImNrdDh0dTA0NjE1bTQydmxqaDFobm83dGoifQ.UL0Y5lmgEiyZpSMLwb0pzw&limit=1'
    
    request({ url: geocodeURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geocode API!', undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find the location", undefined)
        } else {        
            const location = response.body.features[0].place_name
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            callback(undefined, {
                latitude,
                longitude,
                location
            }) 
        }
    })
}

module.exports = geocode