import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
    const [forecast, setForecast] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        getForecast();
        getCurrentWeather();
    }, []);

    async function getForecast() {
        const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=0e1a4933340661f4dd47a82384fb434b';
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setForecast(data);
            //console.log(data);
        } catch (error) {
            console.error('Error fetching the forecast:', error);
        }
    }

    async function getCurrentWeather() {
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=0e1a4933340661f4dd47a82384fb434b';
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setCurrentWeather(data);
            console.log(data);
        } catch (error){
            console.error('Error fetching the forecast:', error);
        }
    }

    return (
        
        <div>
            <p>Weather app 2</p>
            {forecast && (
                <div>
                    <h2>Weather Forecast</h2>
                    <div>
                        <p>{new Date(currentWeather.dt * 1000).toLocaleString()}</p> 
                        <img src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}></img>       
                        <p>{currentWeather.main.temp} C</p>
                        <p>{currentWeather.weather[0].main}</p>
                        <p>Wind Speed</p>
                        <p>{currentWeather.wind.speed} m/s</p>
                        <p>Humidity</p>
                        <p>{currentWeather.main.humidity}%</p>
                    </div>

                </div>
            )}
        </div>
        
    );
}