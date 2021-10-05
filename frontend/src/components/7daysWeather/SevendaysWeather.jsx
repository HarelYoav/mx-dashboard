import React from "react";
import './SevenDaysWeather.css';


const SevenDaysWeather = ({weekWeather}) => {

    return (

        <div className="weather-table">

            <h5 className="sevenDays-Heading">
                Next 7 Days...
            </h5>

            <div className="d-flex justify-content-between sevenDays-Row">
                {weekWeather?.map( (dayWeather, index) => (
                        <div className="eachDay-div" key={index}>
                            <p className="sevenDays-p sevenDays-day" >{dayWeather.day}</p>
                            <img  className="sevenDays-img"  src={dayWeather.icon} alt=''/>
                            <p className="sevenDays-p sevenDays-temp" >{dayWeather.temp}°</p>
                        </div>
                    ))}
            </div>

        </div>

    );

};

export default SevenDaysWeather;