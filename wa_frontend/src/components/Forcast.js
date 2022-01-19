import "./Forcast.css";

const Forcast = (props) => {
  let forcastDays = props.forcastDays; //a prop arry of objects containing props extracted from api data

  const oneDay = (dayForcast, i) => {
    //if its the first day then set the now_temp to the now_temp otherwise it it to undefined
    const now_temp = i === 0 ? dayForcast.now_temp : undefined;
    const weather_state_abbr = dayForcast.weather_state_abbr;
    //use the abbr we got to get url of the weather state icon
    const imgURL =
      "https://www.metaweather.com/static/img/weather/" +
      weather_state_abbr +
      ".svg";

    return (
      <li key={props.time + i}>
        <h3>{dayForcast.date_of_forcast}</h3>
        <img src={imgURL} width={60} height={60} alt={"Weather icon"} />
        <h4>{dayForcast.weather_state_name}</h4>
        <h4>Max:{dayForcast.max_temp}</h4>
        <h4>Min:{dayForcast.min_temp}</h4>
        {now_temp && <h4>Now: {now_temp}</h4>}
      </li>
    );
  };

  return (
    <div className="forcast">
      <h4 className="location-name">
        {props.city}
        <br />
        <span>Time: {props.time}</span>
      </h4>

      <div className="location-style">
        {/* maping the days the city focasts */}
        <ul>{forcastDays.map((day, index) => oneDay(day, index))}</ul>
      </div>
    </div>
  );
};

export default Forcast;
