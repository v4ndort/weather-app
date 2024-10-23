"use client";
import React, {useState} from 'react'
import Input from "./component/Input";
import Current from './component/Current';
import WeekForecast from './component/WeekForecast';
import WeatherDetails from './component/WeatherDetails';

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=218109ad5b854b5fac5222337242110&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        setData({});
      }
    }
  };

  let content;
  if (Object.keys(data).length === 0 && error === ''){
    content=(
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-bold mb-4">Bem vindo ao WeatherApp </h2>
        <p className='text-xl'>Insira um nome de cidade para verificar a previsão do tempo.</p>
      </div>
    );
  } else if (error !== ""){
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <p className="text-3xl font-bold mb-4">Cidade Não Encontrada</p>
        <p className="text-xl">Insira uma cidade válida</p>
      </div>
    );
  } else {
    content = (
    <>
      <div className="flex md:flex-row flex-col p-12 items-center justify-between">
        <Current data={data}/>
        <WeekForecast data={data}/>
      </div>
      <div>
        <WeatherDetails data={data}/>
      </div>
    </>
    )
  }

  return (
  <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
    <div className="bg-white/25 w-full flex flex-col h-fit">
    {/*Input e Logo*/}
      <div className="flex flex-col md:flex-row justify-between items-center p-12">
        <Input handleSearch={handleSearch} setLocation={setLocation}/>
        <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">WeatherApp.</h1>
      </div>
      {content}
    </div>
  </div>
  )
}
export default Home








