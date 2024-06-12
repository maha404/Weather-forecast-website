import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
    const [forecast, setForecast] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        getForecast();
        getCurrentWeather();
    }, []);

    async function getForecast() {
        const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=0e1a4933340661f4dd47a82384fb434b&units=metric';
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
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=0e1a4933340661f4dd47a82384fb434b';
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

    return (
        <div>
            {forecast && currentWeather && (
                <div>
                    <h2>Weather Forecast</h2>
                    <div>
                        <p>{new Date(currentWeather.dt * 1000).toLocaleString()}</p>
                        <img src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt={currentWeather.weather[0].description} />
                        <p>{currentWeather.main.temp} °C</p>
                        <p>{currentWeather.weather[0].main}</p>
                        <p>Wind Speed</p>
                        <p>{currentWeather.wind.speed} m/s</p>
                        <p>Humidity</p>
                        <p>{currentWeather.main.humidity}%</p>
                    </div>
                    <div>
                        {getDailyForecasts(forecast.list).map((item, index) => (
                            <div key={index}>
                                <p>{new Date(item.dt * 1000).toLocaleString()}</p>
                                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                                <p>{item.main.temp} °C</p>
                                <p>{item.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
