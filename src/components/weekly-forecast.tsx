import React, { useEffect, useState } from 'react';
import { IDailyWeatherData, IPlace } from '../interfaces/weather.interface';
import { getDailyForecast, getWeatherIcon } from '../services';

interface WeeklyForecastProps {
  place: IPlace;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ place }) => {
  const [weeklyData, setWeeklyData] = useState<IDailyWeatherData[]>([]);

  const getWeeklyData = async () => {
    if (!place) return;
    const respone = await getDailyForecast(place.lon, place.lat)
    const { data } = respone;
    if (data) {
      const daily: IDailyWeatherData[] = data.daily
      setWeeklyData(daily)
    }
  }

  useEffect(() => {
    getWeeklyData();
  }, [place])

  return (
    <div className='w-full lg:pt-10 lg:px-10 p-2'>
      <div className='mb-4 text-3xl'>Dự báo 8 ngày tới</div>
      <div className="weekly-forecast flex lg:flex-row flex-col w-full gap-3">
        {weeklyData.map((day, index) => (
          <div key={index} className="day bg-white w-full text-center rounded lg:block flex">
            <p>{new Date(day.dt * 1000).toLocaleDateString('vi-VN', { weekday: 'short' })}</p>
            <img className='m-auto' src={getWeatherIcon(day.weather[0].icon)} />
            <b>{Math.round(day.temp.day)}°C</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
