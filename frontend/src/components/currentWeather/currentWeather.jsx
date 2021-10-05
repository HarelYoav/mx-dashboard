import './currentWeather.css';


function CurrentWeather({todayWeather}) {

    return (

        <div className='current-weather-component' style={{display: 'flex'}}>
            <div className='date'>
                <h3>{todayWeather.day + ' ' + todayWeather.date}</h3>
                <p className="weather-p date-p">Today in {todayWeather.city}, {todayWeather.country} </p>
            </div>
            <div className="icon">
                <img src={todayWeather.icon} alt=''/>
                <p className="weather-p" style={{textAlign: 'center'}}>{todayWeather.description}</p>
            </div>
            <div className='temp'>
                <h1>{todayWeather.temp}°</h1>
                <p className="weather-p">Feels like {todayWeather.feel}°</p>
            </div>
        </div>
    )

};

export default CurrentWeather;