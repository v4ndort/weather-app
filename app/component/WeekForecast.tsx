import React from 'react'

interface DayForecast {
    date: string;
    day: {
      condition: {
        icon: string;
        text: string;
      };
      maxtemp_c: number;
      mintemp_c: number;
    };
}
  
interface WeekForecastProps {
    data: {
      forecast: {
        forecastday: DayForecast[];
      };
    };
}

const WeekForecast = ({data}: WeekForecastProps) => {
  return <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 w-full">
    {data.forecast.forecastday.map((day,index) => (
        <div key={index} className="bg-white/40 p-2 text-center rounded-lg flex flex-col items-center">
            <p>
                {new Date(day.date).toLocaleString("pt-BR", {weekday: "short"})}
            </p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <div>
                <p>Max {day.day.maxtemp_c.toFixed()}°</p>
                <p>Min {day.day.mintemp_c.toFixed()}°</p>
            </div>

        </div>
    )
    )}

  </div>;
}

export default WeekForecast