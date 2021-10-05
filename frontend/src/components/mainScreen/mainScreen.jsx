import './mainScreen.css';
import { Container, Row, Col } from 'react-bootstrap';
import FullWeather from '../fullWeather';
import geolocation from 'geolocation';
import { useEffect, useState } from 'react';
import axios from 'axios';


function MainScreen({title, children}){

    //get user location by gps, if user decline get the location thru ip (not accurate)
    const getLocation = async () => {
        await geolocation.getCurrentPosition(async (err, position) => {
            if(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            } else {
                axios.get('https://ipapi.co/json/').then((response) => {
                let data = response.data;
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                }).catch((error) => {
                    console.log(error);
                });
            }

        });

        if(latitude && longitude){
            cities();
        }
    }


    //get nearby cities by the user location
    const cities = async () => {
        var axios = require("axios").default;
        var options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/locations/'+ latitude + '+' + longitude+'/nearbyDivisions',
        params: {radius: '100'},
        headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': '1db207e0afmsh18b1d813641a578p1e3636jsn57286bd2976f'
        }
        };

        axios.request(options).then(function (response) {
            setPlaces(response.data.data);
        }).catch(function (error) {
            console.error(error);
        });
    }


    //when press on nerby city it adjust the location tho the city location
    const changeWeather = (index) => {
        if (index === 'myLocation') {
            getLocation();

        } else if (index >= 0 && index <= places.length) {
            setLatitude(places[index].latitude)
            setLongitude(places[index].longitude)
        }
    }

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [places, setPlaces] = useState();
    const images = [
       './images/island.png',
        './images/northern-lights.png',
        './images/cassiopeia.png',
        './images/clouds-and-sun.png',
        './images/rainbow.png',
        './images/full-moon.png',
    ]


    useEffect(() => {
        if(!places){
            getLocation();
        }

    },[latitude, longitude])


    return (
        <div className='mainback'>
            <Container>
                {/* <Row> */}
                    <Row className='header'>
                        <Col lg={6}>
                            <div>
                                {title && (
                                    <>

                                        <h1 className='heading'>{title}</h1>
                                    </>
                                )}
                            </div>

                            <div className='nearbyComponent' >
                                <div className='scrolling-div' >
                                    <div id={'myLocation'} className='nearby' style={{margin: ' 0 10px'}}>
                                        <a
                                            href=''
                                            style={{ textAlign: 'center', margin: ' 0 10px'}}
                                            onClick={(e) => changeWeather(e.target.id)}
                                            >

                                            <img className='nearby-img' src='./images/myLocation.png' alt='' id={'myLocation'}></img>
                                            <p id={'myLocation'}>My Location</p>

                                        </a>
                                    </div>
                                    {places?.map((place, index) => (
                                        <div
                                            key={place.id}
                                            id={index}
                                            className='nearby'
                                            style={{margin: ' 0 10px'}}
                                        >
                                            <a
                                                href=''
                                                style={{ textAlign: 'center', margin: ' 0 10px'}}
                                                onClick={(e) => changeWeather(e.target.id)}
                                            >

                                                <img
                                                    className='nearby-img'
                                                    src={images[index]}
                                                    alt=''
                                                    id={index}>
                                                </img>
                                                <p id={index} style={{margin: ' 0 5px'}}>{place.name}</p>

                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <FullWeather latitude={latitude} longitude={longitude}/>
                        </Col>
                        <hr/>
                    </Row>


                    <div style={{alignItems: 'center'}}>
                        {children}
                    </div>

                {/* </Row> */}
            </Container>
        </div>
    )
}

export default MainScreen;