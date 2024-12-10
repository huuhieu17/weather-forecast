import { AxiosResponse } from "axios"
import { IWeather } from "../interfaces/weather.interface"
import api from "../utils/api"

export const getCurrentForecast = (lon: number, lat: number): Promise<AxiosResponse<IWeather>> => {
    return api({
        url: '/data/2.5/weather',
        params: {
            lat,
            lon
        }
    })
}

export const getDailyForecast = (lon: number, lat: number) => {
    return api({
        url: '/data/2.5/onecall',
        params: {
            lat,
            lon,
            exclude: "hourly,minutely"
        }
    })
}

export const getGeoByName = (name: string) => {
    return api({
        url: '/geo/1.0/direct',
        params: {
            q: name
        }
    })
}

export const getAirPolluteData = (lon: number, lat: number) => {
    return api({
        url: '/data/2.5/air_pollution',
        params: {
            lat,
            lon,
        }
    })
}

export const getUVindex = (lon: number, lat: number) => {
    return api({
        url: '/data/2.5/uvi',
        params: {
            lat,
            lon,
        }
    })
}

export const calculateWeather = (data: IWeather) => {
    const cloudiness = data.clouds.all;
    const humidity = data.main.humidity;
  
    const rainProbability = Math.round((cloudiness * 0.6 + humidity * 0.4));
  
    const adjustedRainProbability = Math.min(100, Math.max(0, rainProbability));
    
    return {
        cloudStatus: data.weather[0].description,
        humidity,
        rainProbability: adjustedRainProbability
    }
};

export const getWeatherIcon = (iconCode: string): string => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
};