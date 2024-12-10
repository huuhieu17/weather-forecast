import { useEffect, useState } from 'react'
import SearchBar from './components/search-bar'
import { getCurrentForecast } from './services';
import { IPlace, IWeather } from './interfaces/weather.interface';
import CurrentWeather from './components/current-weather';
import WeeklyForecast from './components/weekly-forecast';
import TodayHighlight from './components/today-highlight';

function App() {
  const [location, setLocation] = useState<IPlace | undefined>({
    "name": "Hanoi",
    "local_names": {
        "zh": "河内市",
        "ja": "ハノイ",
        "tg": "Ханой",
        "en": "Hanoi",
        "th": "ฮานอย",
        "sl": "Hanoj",
        "fa": "هانوی",
        "et": "Hanoi",
        "am": "ሀኖይ",
        "my": "ဟနွိုင်းမြို့",
        "it": "Hanoi",
        "da": "Hanoi",
        "bg": "Ханой",
        "hu": "Hanoi",
        "ht": "Anòy",
        "kk": "Ханой",
        "de": "Hanoi",
        "fi": "Hanoi",
        "os": "Ханой",
        "si": "හැනෝයි",
        "cs": "Hanoj",
        "ug": "خانوي",
        "cv": "Ханой",
        "ga": "Ha Noi",
        "br": "Ha Noi",
        "az": "Hanoy",
        "mn": "Ханой",
        "ko": "하노이",
        "gl": "Hanoi - Hà Nội",
        "el": "Ανόι",
        "es": "Hanói",
        "mk": "Ханој",
        "fr": "Hanoï",
        "sr": "Ханој",
        "sk": "Hanoj",
        "he": "האנוי",
        "kn": "ಹಾನೊಯ್",
        "uk": "Ханой",
        "sv": "Hanoi",
        "be": "Ханой",
        "nl": "Hanoi",
        "lt": "Hanojus",
        "pt": "Hanói",
        "hr": "Hanoi",
        "ur": "ہنوئی",
        "ta": "ஹனோய்",
        "ka": "ჰანოი",
        "oc": "Hanòi",
        "qu": "Ha Nui",
        "is": "Hanoí",
        "mr": "हनोई",
        "pl": "Hanoi",
        "bo": "ཧེ་ནོ།",
        "ca": "Hanoi",
        "km": "ទីក្រុងហានូយ",
        "eo": "Hanojo",
        "lv": "Hanoja",
        "hi": "हनोई",
        "ku": "Hanoi",
        "eu": "Hanoi",
        "ru": "Ханой",
        "hy": "Հանոյ",
        "ar": "هانوي",
        "vi": "Thành phố Hà Nội",
        "bn": "হ্যানয়"
    },
    "lat": 21.0294498,
    "lon": 105.8544441,
    "country": "VN"
});
  const [weather, setWeather] = useState<IWeather | null>(null);

  const fetchWeather = async () => {
    if (!location) return;
    const response = await getCurrentForecast(location.lon, location.lat);
    const { data } = response;
    setWeather(data);
  }

  useEffect(() => {
    fetchWeather()
  }, [location])

  return (
    <div className='lg:p-20 p-2 w-full lg:h-screen h-full min-h-screen bg-[#D6D7DA]'>
      <div className='w-full lg:h-full h-auto lg:flex block border rounded-2xl overflow-hidden'>
        <div className='lg:w-[25%] w-full h-full bg-white lg:p-10 md:p-5 p-2'>
          <SearchBar onSearch={setLocation} />
          {weather && <CurrentWeather data={weather} location={location} />}
        </div>
        <div className='lg:w-[75%] w-full h-full bg-[#F6F6F8]'>
          {location && <WeeklyForecast place={location} />}
          {weather && <TodayHighlight weather={weather}/>}
        </div>
      </div>
    </div>
  )
}

export default App
