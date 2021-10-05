import CurrentWeather from './currentWeather/currentWeather'
import SevenDaysWeather from './7daysWeather/SevendaysWeather';
import mountainsBackground from './mountainsBackground.jpg'
import { useEffect, useState } from 'react';
import axios from "axios";
import {
    CURRENT_WEATHER,
    SEVEN_DAYS_WEATHER,
} from "../constants/weatherConstants";


//show full weather, get location from parent (MainScreen component) then send api request to OpenWeather
//after get the weather data send it to his children to show the current weather and the next 7 days weather
function FullWeather({latitude, longitude}) {

    const weekDays =['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [todayWeather, setTodayWeather] = useState({
        country: '',
        city: '',
        day: '',
        date: '',
        temp: '',
        feel: '',
        description: '',
        icon: '',
    });
    const [sevenDay, setSevenDay] = useState([{day: '', temp: '', icon: ''}]);

    let sevenDayWeatherData = [];

    //get the next 7 days weather
    const getWeekWeather = async () => {
        if(latitude && longitude) {
            await axios.post('/api/weather', {lon: longitude, lat: latitude, type: SEVEN_DAYS_WEATHER})
            .then(response => {
                const sevenDaysWeather = response.data.daily;
                for(var i = 1; i < sevenDaysWeather.length; i++)
                {
                    const date = new Date(sevenDaysWeather[i].dt * 1000)
                    const forecast = {
                        day: weekDays[date.getDay()],
                        temp: beautifulTemp(sevenDaysWeather[i].temp.day),
                        icon: "http://openweathermap.org/img/wn/" + sevenDaysWeather[i].weather[0].icon + "@2x.png"
                    }
                    sevenDayWeatherData.push(forecast)
                }
            })
            .catch(e => console.log(e))
        setSevenDay(sevenDayWeatherData);
        }
    };

    //get the weather today
    const getTodayWeather = async () => {
        if(latitude && longitude) {
            await axios.post('/api/weather', {lon: longitude, lat: latitude, type: CURRENT_WEATHER})
            .then(response => {
                const date = new Date(response.data.dt * 1000)
                console.log(Date.parse(response.data.dt));
                setTodayWeather({
                    country: response.data.sys.country,
                    city: response.data.name,
                    day: weekDays[date.getDay()],
                    date: date.getDate(),
                    temp: beautifulTemp(response.data.main.temp),
                    feel: beautifulTemp(response.data.main.feels_like),
                    description: response.data.weather[0].description,
                    icon: "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png"
                });
            })
            .catch(e => console.log(e))
        }
    };

    //round the temp up if its more than 0.5 or down if its less than 0.5
    const beautifulTemp = (num) => {
        const tmp = num - Math.floor(num);

        if (tmp > 0.5) {
            return (Math.floor(num) + 1);
        } else {
            return Math.floor(num);
        }
    };

    useEffect(() => {
        getWeekWeather();
        getTodayWeather();

    }, [latitude, longitude]);


    return (

        <div style={{borderRadius: '25px', backgroundImage: 'url('+ mountainsBackground +')', backgroundSize: 'cover'}}>
            <CurrentWeather todayWeather={todayWeather}/>
            <SevenDaysWeather weekWeather={sevenDay} />
        </div>
    );

};


export default FullWeather;
