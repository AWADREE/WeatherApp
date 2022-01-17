import "./MainContent.css";
import Forcast from "./Forcast";
import { React, useState, useRef } from "react";

const MainContent = () => {
  const [allForcasts, setallForcasts] = useState([]);
  const [error, setError] = useState("");
  const searchInputRef = useRef(); //a ref to the input element
  const allComponents = []; //a const containing an array of jsx forcast componenets

  //TODO useeffect to fetch user location once he loads the page adn get his woeid and his weather

  // useEffect(() => {
  //   //get lcoation of user
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     console.log(pos);
  //     //call back end with the locName
  //   });
  // }, []);

  //when clicked call backend giving it a lcation name
  const handleClick = (e) => {
    let el = searchInputRef.current;
    if (el.value === "") return; //if the value of it is an empty string then return

    //otherwise, get the value of the element an assign it to locName
    let locName = el.value;
    searchInputRef.current.value = null; //removing the text from the input field after we use it
    // make a url to fetch with the locName
    const url = `http://localhost:5000/forcasts/${locName}/`;
    fetch(url) //fetch the url, which will return a prmise
      .then((response) => {
        //when the prmise is resolved, get resolution data and make it into json
        return response.json();
      }) //when the data is made into json
      .then((data) => {
        const date = new Date();
        const time_now = date.getHours() + ":" + date.getMinutes();

        setallForcasts((prev) => {
          return [
            ...prev,
            {
              city: locName,
              time_now,
              consolidated_weather: data.consolidated_weather,
            },
          ];
        });
        setError(""); //we change the state to refresh
      })
      .catch((err) => {
        console.log(err);
        setError("Please choose a city"); //if the user inputs anything other thna city name , set the error state to this, so that the page will reload
      });
  };

  //formatting the json unto contants and variables
  const createForcast = (forcast) => {
    const city = forcast.city;
    const time_now = forcast.time_now;
    let forcastDays = [];

    for (let i = 0; i < forcast.consolidated_weather.length; i++) {
      const date_of_forcast = forcast.consolidated_weather[i].applicable_date;
      const max_temp = Math.round(forcast.consolidated_weather[i].max_temp);
      const min_temp = Math.round(forcast.consolidated_weather[i].min_temp);
      //if the i is 0 (that means its the first day in the array of six), set now_temp to the_temp (which is the current temp),
      //otherwise set it to an empty string
      const now_temp =
        i === 0 ? Math.round(forcast.consolidated_weather[i].the_temp) : "";
      const weather_state_name =
        forcast.consolidated_weather[i].weather_state_name;
      const weather_state_abbr =
        forcast.consolidated_weather[i].weather_state_abbr;

      forcastDays.push({
        date_of_forcast,
        max_temp,
        min_temp,
        now_temp,
        weather_state_name,
        weather_state_abbr,
      });
    }

    //return the forcast componenent props that we are going to construct
    return { city, time_now, forcastDays };
  };

  //returns an array of react city focast componenets
  const renderForcast = () => {
    let components = [];

    for (let i = 0; i < allForcasts.length; i++) {
      let forcastProps = createForcast(allForcasts[i]);

      components.push(
        <Forcast
          key={Math.floor(Math.random() * 100)}
          city={forcastProps.city}
          time={forcastProps.time_now}
          forcastDays={forcastProps.forcastDays}
        />
      );
    }

    while (components.length > 2) {
      components.shift();
    }
    components.reverse();
    return components;
  };

  allComponents.push(...renderForcast());

  return (
    <div className="container_box">
      <div>
        <input
          className="text_input"
          type="text"
          name="search"
          ref={searchInputRef}
          placeholder="Search for city name..."
        />
        <button
          className="button"
          type="button"
          name="button"
          value="getWeather"
          onClick={handleClick}
        >
          Get Weather
        </button>
        {error !== "" ? <h4 className="error">{error}</h4> : ""}
      </div>
      <div className="all-forcasts">
        {(allForcasts === undefined || allForcasts.length < 1) && (
          <h3 className="no_display">No forcasts to display</h3>
        )}
        {allForcasts &&
          allComponents.length >= 1 &&
          allComponents.map((item) => {
            return item;
          })}
      </div>
    </div>
  );
};

export default MainContent;
