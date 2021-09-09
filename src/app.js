const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express  config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'David Esteban Cortes Baez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'David Esteban Cortes Baez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'David Esteban Cortes Baez'
    })
})

app.get('/weather', (req, res) => {    
    if (!req.query.address) {
        return res.send({
            error: 'Please insert an address to get the weather.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, { forecastMessage, icon } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastMessage,
                address: req.query.address,
                icon
            })
        })
    })
    
})

app.get('/about/*', (req, res) => {
    res.render('article404', {
        title: 'Error 404',
        author: 'David Esteban Cortes Baez',
        error: 'Unable to find the article in about section'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        author: 'David Esteban Cortes Baez',
        error: 'Unable to find the article in help section'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        author: 'David Esteban Cortes Baez',
        error: 'Unable to find the page. try another url'
    })
})

app.listen(port, () =>{
    console.log('Server is running on port ' + port + '.')
})