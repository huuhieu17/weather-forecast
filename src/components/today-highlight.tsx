import { useEffect, useState } from 'react'
import { IAirPollution, IWeather } from '../interfaces/weather.interface'
import { calculateWeather, getAirPolluteData, getUVindex } from '../services';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { FaWind } from 'react-icons/fa6';
import { CiTempHigh } from 'react-icons/ci';
import { MdOutlineVisibility } from 'react-icons/md';
import { TbUvIndex } from 'react-icons/tb';

interface ITodayHighlightProps {
    weather: IWeather
}
const TodayHighlight = ({ weather }: ITodayHighlightProps) => {
    const [airpollution, setAirPollution] = useState<IAirPollution | undefined>();
    const [uvi, setUvi] = useState<any | undefined>();
    const { humidity } = calculateWeather(weather);

    const getAirPollution = async () => {
        const response = await getAirPolluteData(weather.coord.lon, weather.coord.lat);
        const { data } = response;
        if (data) {
            setAirPollution(data.list[0])
        }
    }

    const getUVIndex = async () => {
        const response = await getUVindex(weather.coord.lon, weather.coord.lat);
        const { data } = response;
        if (data) {
            setUvi(data)
        }
    }

    const getStatusAqi = (aqi: number) => {
        switch (aqi) {
            case 1:
                return 'Tốt';
            case 2:
                return 'Bình thường';
            case 3:
                return 'Khá';
            case 4:
                return 'Xấu';
            default:
                return 'Rất xấu'
        }
    }

    useEffect(() => {
        getAirPollution();
        getUVIndex()
    }, [weather])
    return (
        <div className='w-full lg:pb-10 lg:px-10 p-2'>
            <div className='mb-4 text-3xl'>Tiêu điểm hôm nay</div>
            <div className="today-highlight  w-full grid lg:grid-cols-3 grid-cols-1 gap-4">
                <div className='bg-white px-6 py-3 rounded-lg'>
                    <div className="text-gray-500 uppercase">Chỉ số UV</div>
                    <div className='text-3xl my-2'>
                        {uvi?.value}  <span className='text-base font-medium'></span>
                    </div>
                    <TbUvIndex className='text-yellow-400 text-5xl' />
                </div>
                <div className='bg-white px-6 py-3 rounded-lg'>
                    <div className="text-gray-500 uppercase">
                        Tốc độ gió
                    </div>
                    <div className='text-3xl my-2'>
                        {weather.wind.speed}  <span className='text-base font-medium'>km/h</span>
                    </div>
                    <FaWind className='text-blue-500 text-5xl' />
                </div>
                <div className='bg-white px-6 py-3 rounded-lg'>
                    <div className="text-gray-500 uppercase">
                        Bình minh & Hoàng hôn
                    </div>
                    <div>
                        <div className='flex items-center gap-10 mt-2'>
                            <FiSunrise className='text-orange-500 text-5xl' />
                            <p className='text-2xl font-bold'>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString('vi-VN', {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}</p>
                        </div>
                        <div className='flex items-center gap-10 mt-2'>
                            <FiSunset className='text-orange-500 text-5xl' />
                            <p className='text-2xl font-bold'>{new Date(weather.sys.sunset * 1000).toLocaleTimeString('vi-VN', {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white px-6 py-3 rounded-lg'>
                    <div className="text-gray-500 uppercase">
                        Độ ẩm
                    </div>
                    <div className='text-3xl my-2'>
                        {humidity} <span className='text-base font-medium'>%</span>
                    </div>
                    <CiTempHigh className='text-red-400 text-5xl' />
                </div>
                <div className='bg-white px-6 py-3 rounded-lg'>
                    <div className="text-gray-500 uppercase">
                        Tầm nhìn
                    </div>
                    <div className='text-3xl my-2'>
                        {weather.visibility / 1000} <span className='text-base font-medium'>km</span>
                    </div>
                    <MdOutlineVisibility className='text-purple-300 text-5xl' />
                </div>
                <div className='bg-white px-6 py-3 rounded-lg'>
                    <div className="text-gray-500 uppercase">
                        Chất lượng không khí
                    </div>
                    {airpollution &&
                        <div className='my-2 '>
                            <div className='text-2xl my-2'>
                                {getStatusAqi(airpollution.main.aqi)}
                            </div>
                            <div className='flex'>
                                <div className='w-1/2'>
                                    <div>
                                        PM2.5: {airpollution.components.pm2_5}µg/m³
                                    </div>
                                    <div className=''>
                                        CO: {airpollution.components.co}µg/m³
                                    </div>
                                </div>
                                <div className='w-1/2'>
                                    <div>
                                        O3: {airpollution.components.o3}µg/m³
                                    </div>
                                    <div className=''>
                                        NO2: {airpollution.components.no2}µg/m³
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodayHighlight