require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const https = require("https");
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const app = express();
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const path = require('path');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//connect to mongoDB data base
connectDB();



app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.post('/api/weather', (req, res) =>{
    const {lat, lon, type} = req.body;
    let baseUrl;

    if(type === 'CURRENT_WEATHER') {
        baseUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=';

    } else if (type === 'SEVEN_DAYS_WEATHER') {
        baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?exclude=current,minutely,hourly,alerts&lat='
    }

    const url = baseUrl + lat + '&lon=' + lon + '&units=metric&APPID=' + process.env.OPEN_WEATHER_API_KEY

    https.get(url, function(response){
        response.on('data', function(data){
        const weatherData = JSON.parse(data)
        res.send(weatherData);
        });
    });
});


// // ********** DEPLOYMENT *********

__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })

} else {

    app.get('/', (req, res) => {
        res.send("API is running..");
    });
}


// // ********** DEPLOYMENT *********


//app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server started on PORT " + PORT));