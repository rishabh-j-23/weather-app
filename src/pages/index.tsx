import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [inputText, setInputText] = useState('');
  const [temp, setTemp] = useState(null);

  const API_KEY = '7gxZkHhAU8EGaB19jjAaOXrGtzoP7Tk9';

  const locationKeyUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=`;
  
  async function getLocationKey(location: String) {
    const url = `${locationKeyUrl}${location}`;
    const res = await axios.get(url);
    const loc = res.data[0]['Key'];
    // console.log(loc);
    const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${loc}?apikey=${API_KEY}`;
    const weatherRes = await axios.get(weatherUrl);
    const temp = weatherRes.data[0]['Temperature']['Metric']['Value'];
    // console.log(temp);
    setTemp(temp);
    return loc;
  }
  
  const loactionWeatherDataUrl = `http://dataservice.accuweather.com/currentconditions/v1/${getLocationKey(inputText)}?apikey=${API_KEY}`;

  return (
    <div className='
        flex h-screen justify-center items-center'>
      <div className='flex-col justify-center items-center'>
        {/* Search bar */}
        <div className='flex justify-center items-center px-4 py-4'>
          <input
            placeholder='Search Location'
            className='flex rounded-lg border-gray-100 bg-gray-100 px-4 py-1 mx-2  text-black'
            value={inputText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputText(e.target.value);
            }}
          ></input>
          <button
            className='bg-sky-500 rounded-lg px-2 py-1'
            onClick={() => {
              setInputText(inputText);
              () => {
                var temp;
                axios.get(loactionWeatherDataUrl).then((res) => {
                  var data = res.data
                  console.log(data);
                  temp = data[0]['Temperature']['Metric']['value'];
                  console.log(temp);
                  setTemp(temp);
                });
              }
            }}
          >Search</button>
        </div>

        {/* image */}
        <div className='flex'>
          <img
            src='https://openweathermap.org/img/wn/02d@2x.png'
            className='
            flex justify-center items-center w-60 rounded-full
            ml-14
            '
          ></img>
        </div>

        {/* display */}
        <div className='flex-row border-slate-400 border-solid rounded-lg justify-center items-center  px-3 py-2 ml-14'>
          <div className=''>
            <span
              className='font-extrabold'
            >Temperature : </span><span >{temp}&deg;C</span>
          </div>
          {/* <div className='flex-1'>
            <span
              className='font-extrabold'
            >Humidity : </span><span>hum%</span> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
