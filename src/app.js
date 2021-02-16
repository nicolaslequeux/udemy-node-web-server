const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectory = path.join(__dirname, '..', 'public')
const viewsPaths = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPaths)
hbs.registerPartials(partialsPath)

// Setup startic directory to serve
app.use(express.static(publicDirectory))

// NOT USED ANYMORE AS EXPRESS CATCH THE INDEX.HTML FROM /PUBLIC
// app.get('', (req, res) => {
//     res.send("Hello express!")
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Nicolas"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Nicolas"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Nicolas"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You mus provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Nicolas",
        errorMessage: "Help article not found!"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Nicolas",
        errorMessage: "Page not found!"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
