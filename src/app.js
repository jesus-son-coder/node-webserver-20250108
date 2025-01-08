
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);

console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config :
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location :
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve :
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Piper'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if( !address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error: 'Unable to find location...Try another search'
            })
        }

        forecast(latitude, longitude, (error, forecastData, weatherIcon) => {
            if(error) {
                return res.send({
                    error: 'Unable to find weather...Try another search'
                })
            }
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData,
                picture: weatherIcon
            });
        })
    })

})

app.get('/products', (req, res) => {
    if( !req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        name: 'John Piper',
        products: ['Apple', 'Banana', 'Orange']
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'John Piper'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John Piper',
        helpText: 'This is some helpful text'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'John Piper',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Piper',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

