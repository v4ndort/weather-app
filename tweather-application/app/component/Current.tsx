import { getCurrentDate } from "../utils/currentDate";
import { MdLocationOn } from "react-icons/md";

interface CurrentProps {
  data: {
    current: {
      condition: {
        icon: string;
        text: string;
      };
      temp_c: number;
    };
    location: {
      name: string;
      region: string;
    };
  };
}

const Current = ({ data } : CurrentProps) => {


  function getCurrentDate() {
    const options = { 
      weekday: 'long',  // Nome do dia da semana
      year: 'numeric',  // Ano completo
      month: 'long',    // Nome do mês por extenso
      day: 'numeric'    // Dia do mês
    };    
    return new Date().toLocaleDateString('pt-BR', options);
  }
  
  const currentDate=getCurrentDate()
  const weatherIcon = data.current.condition.icon;
  const conditionTranslations = {
    Sunny: "Ensolarado",
    Rain: "Chuva",
    Snow: "Neve",
    Cloudy: "Nublado",
    Thunderstorm: "Tempestade",
    Mist: "Neblina",
    Clear:"Céu Limpo",
    "Partly Cloudy":"Parcialmente Nublado"
  };
  
  function translateCondition(condition: string): string {
    return conditionTranslations[condition] || condition; // Retorna a tradução ou o valor original se não encontrado
  }

  return (
    <div className=" flex flex-col mb-8 md:mb-0 items-start gap-2 w-1/2">
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl text-white">Hoje</h1>
          <p className="text-white">{currentDate}</p>
        </div>
        {weatherIcon && (
        <div>
          <img className="w-[50px] object-cover" src={weatherIcon} alt={data.current.condition.text}/>
        </div>
      )} 
      </div>
      <div>
          <p className="text-5xl text-white">
          {data.current.temp_c.toFixed()}
          <span>°</span>
        </p>
        <span className="text-white">{translateCondition(data.current.condition.text)}</span>
      </div>
      <div>
        <div className="flex items-center text-black bg-white/90 px-2 py-2 rounded-xl">
          <MdLocationOn />
          <span>
            {data.location.name},{data.location.region}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Current;