import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
    const [forecast, setForecast] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [city, setCity] = useState('London');

    useEffect(() => {
        getForecast();
        getCurrentWeather();
        timeOfDay();
    }, []);

    async function getForecast() {
        const baseURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0e1a4933340661f4dd47a82384fb434b&units=metric`
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setForecast(data);
        } catch (error) {
            console.error('Error fetching the forecast:', error);
        }
    }

    async function getCurrentWeather() {
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0e1a4933340661f4dd47a82384fb434b`;
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCurrentWeather(data);
        } catch (error) {
            console.error('Error fetching the forecast:', error);
        }
    }

    function getDailyForecasts(list) {
        const dailyForecasts = [];
        const uniqueDays = new Set();

        for (const item of list) {
            const date = new Date(item.dt * 1000);
            const day = date.getUTCDate();
            const hour = date.getUTCHours();

            if (hour === 12 && !uniqueDays.has(day)) {
                dailyForecasts.push(item);
                uniqueDays.add(day);
            }

            if (dailyForecasts.length === 4) {
                break;
            }
        }

        return dailyForecasts;
    }

    function timeOfDay () {
        const date = new Date();
        const hour = date.getHours();
        //const hour = 1;
        console.log(hour);
        if (hour < 12 && hour > 6) {
            document.body.style.background = 'linear-gradient(#7399D2, #ffffff)';
            console.log('morning');
        } else if (hour < 18 && hour >= 12) {
            console.log('afternoon');
            document.body.style.background = 'linear-gradient(#123074, #8F6492, #E86853)';
        } else {
            console.log('evening');
            document.body.style.background = 'linear-gradient(#061240, #4B5DA2)';
        }
    }

    async function getUserForecast(event) {
        const newValue = event.target.value;
        setCity(newValue);
        getCurrentWeather();
        getForecast();
    }

    return (
        <div>
            {forecast && currentWeather && (
                <div>
                    <div className='form'>
                        <label for="city" className='label'>Your City: </label>
                        <input name="city" id="city" value={city} onChange={getUserForecast}></input>

                    </div>
                    <br/>
                    <div className='container'>
                        <div className='current-weather-card'>
                            <p className='date'>{new Date(currentWeather.dt * 1000).toLocaleString()}</p>
                            <div className='temp-icon'>
                                <img className='weather-icon' src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt={currentWeather.weather[0].description} />
                                <p>{currentWeather.main.temp} °C</p>
                            </div>
                            
                            <p className='weather'>{currentWeather.weather[0].main}</p>

                            <div className='wind-humidity'>
                                <div className='wind-box'>
                                    <p className='title-wind'>Wind Speed</p>
                                    <p className='wind-data'>{currentWeather.wind.speed} m/s</p>
                                </div>

                                <div className='humidity-box'>
                                    <p className='title-humidity'>Humidity</p>
                                    <p className='humidity-data'>{currentWeather.main.humidity}%</p>
                                </div>
                            </div>

                        </div>
                        
                        <div className='daily-forecast-container'>
                        {/* <div><h2>Weather Forecast</h2></div> */}
                            {getDailyForecasts(forecast.list).map((item, index) => (
                                <div className='daily-forecast-card' key={index}>
                                    <p>{new Date(item.dt * 1000).toLocaleString()}</p>
                                    <img className='forecast-icon' src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`} alt={item.weather[0].description}></img>
                                    <p>{item.main.temp} °C</p>
                                    <p>{item.weather[0].main}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
