import React, {useState} from "react";
import {
  TextField,
  PrimaryButton
} from "office-ui-fabric-react";
// http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
import "./Weather.css";


export default props => {
  let [zip, setZip] = useState("");
  let [location, setLocation] = useState({});
  let [weather, setWeather] = useState({});
  let weatherReq = new Request("https://dark-sky.p.rapidapi.com/41.698650,-71.460182");


  const handleGetWeather = () => {
    // do shit
    fetch("https://dark-sky.p.rapidapi.com/41.698650,-71.460182?lang=en&units=auto", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "dark-sky.p.rapidapi.com",
        "x-rapidapi-key": "abd6d9c1fdmsh1cc8c0a4b585126p12cd16jsn14a2957c86bc"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });



  };

  return (
    <div className="WeatherItem">
      <PrimaryButton
        text="Get Weather"
        onClick={handleGetWeather}
      />
    </div>
  )
}
