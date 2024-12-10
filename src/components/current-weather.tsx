import React from 'react';
import { CiTempHigh } from 'react-icons/ci';
import { FaCloud } from 'react-icons/fa6';
import { IPlace, IWeather } from '../interfaces/weather.interface';
import { calculateWeather, getWeatherIcon } from '../services';

interface CurrentWeatherProps {
    data: IWeather;
    location?: IPlace
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, location }) => {
    if (!data || !data.weather || data.weather.length === 0) return;
    const weather = data.weather[0];

    const {cloudStatus, humidity} = calculateWeather(data);
    return (
        <div className="current-weather text-left w-full">
            <img className='m-auto aspect-square lg:w-full w-auto' src={`${getWeatherIcon(weather.icon)}`} />
            <div className='lg:text-[60px] text-6xl lg:text-left text-center mb-4'>{Math.round(data.main.temp)}°C</div>
            <div className='my-2'>
                {location && location.local_names?.vi || location?.name} - ({Math.round(data.main.temp_min)}°C - {Math.round(data.main.temp_max)}°C)
            </div>
            <hr/>

            <div>
                <div className='mt-2 flex gap-x-2 items-center'>
                    <FaCloud />
                    <div>{cloudStatus}</div>
                </div>
                <div className='mt-2 flex gap-x-2 items-center'>
                    <CiTempHigh />
                    <div>Độ ẩm - {humidity}%</div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
