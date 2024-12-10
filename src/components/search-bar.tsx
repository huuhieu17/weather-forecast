import React, { useEffect, useRef, useState } from 'react';
import { IPlace } from '../interfaces/weather.interface';
import { getGeoByName } from '../services';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';

interface SearchBarProps {
  onSearch: (place: IPlace | undefined) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const searchRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState([]);
  const [suggestPlace, setSuggestPlace] = useState<any[]>([]);


  const suggestData = (keyword: string) => {
    if (data.length > 0) {
      const dataSuggest = searchByPartialName(data, keyword)
      setSuggestPlace(dataSuggest);
    };
  };

  // Tìm thành phố,quận, huyện theo tên
  const searchByPartialName = (data: Array<any>, targetSubstring: string): any[] => {
    let results: any[] = [];

    function recursiveSearch(items: any[]) {
      for (const item of items) {
        if (item.name && item.name.toLocaleLowerCase().includes(targetSubstring.toLocaleLowerCase())) {
          results.push(item);
        }
        if (item.districts) {
          recursiveSearch(item.districts);
        }
        if (item.wards) {
          recursiveSearch(item.wards);
        }
      }
    }

    recursiveSearch(data);
    return results;
  }

  const getGeoDataByPlace = async (place: any) => {
    const response = await getGeoByName(place.name);
    const { data } = response;
    if (data && data.length) {
      onSearch(data[0]);
      setSuggestPlace([])
    } else {
      alert('Không tìm thấy thông tin thành phố')
    }
  }

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data) {
                onSearch({
                  lat: latitude,
                  lon: longitude,
                  name: data.name
                })
              } else {
                console.log("No address found");
              }
            })
            .catch(error => {
              console.error("Error fetching address:", error);
            });
          console.log('Latitude:', latitude, 'Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  

  // Lấy data thành phố, quận, huyện
  useEffect(() => {
    fetch('/data.json')  // Đọc từ thư mục public
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  useEffect(() => {
    const toggleDropdown = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestPlace([]);
      }
    }
    document.addEventListener('click', toggleDropdown);
    return () => {
      document.removeEventListener('click', toggleDropdown);
    }
  })

  return (
    <div className="search-bar w-full">
      <div className='w-full relative flex items-center gap-2' ref={searchRef}>
        <CiSearch className='text-2xl absolute' />
        <div className='flex-1'>
          
          <input
            type="text"
            className='w-full px-8 py-2 rounded outline-none'
            onChange={(e) => suggestData(e.target.value)}
            placeholder="Tìm kiếm theo địa điểm..."
          />
          {suggestPlace.length > 0 && (
            <div className='w-full absolute border bg-white'>
              <div className=''>
                {suggestPlace.map((item, index) => {
                  if (index > 3) return;
                  return (
                    <div onClick={() => getGeoDataByPlace(item)} className='px-4 py-2 border-b cursor-pointer hover:bg-gray-200' key={index}>{item.name}</div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <button onClick={getCurrentPosition} className='outline-none'>
        <BsFillGeoAltFill className='text-2xl' />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
