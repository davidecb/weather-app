const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const baseURL = 'http://api.weatherstack.com/current?access_key=c1a163d45c0496dea7a41751d6854393&query=' + latitude + ',' + longitude

    request({ url: baseURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather API!', undefined)
        } else if (response.body.error) {
            callback(response.body.error.info, undefined)
        } else {
            const temperature = response.body.current.temperature
            const description = response.body.current.weather_descriptions[0]
            const forecastMessage = "the temperature is " + temperature + ", and the weather is " + description        
            callback(undefined, {
                forecastMessage,
                icon: response.body.current.weather_icons[0]
            })
        }
    })
}

module.exports = forecast