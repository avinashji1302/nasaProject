import axios from "axios";
import React, { useState } from "react";
import "./styles.css";
import { API, API_KEY } from "./Components/Api";

interface Asteroid {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

export default function App() {
  const [value, setValue] = useState("");
  const [asteroid, setAsteroid] = useState<Asteroid | null>(null);

  const handleChange = (e: React.FormEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .get(`${API}{${value}}?api_key={${API_KEY}}`)
      .then((res) => setValue(res.data));

    setValue("");
  };

  const handleRandomAsteroid = () => {
    axios
      .get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
      .then((response) => {
        const asteroidId =
          response.data.near_earth_objects[
            Math.floor(Math.random() * response.data.near_earth_objects.length)
          ].id;
        axios
          .get(
            `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${API_KEY}`
          )
          .then((response) => {
            setAsteroid(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Nasa Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Asteroid ID"
          onChange={handleChange}
        />
        <button disabled={!value} type="submit">
          Submit
        </button>
      </form>
      <button onClick={handleRandomAsteroid}>Random Asteroid</button>
      {asteroid && (
        <div>
          <p>Name :{asteroid.name}</p>
          <p>nasa_jpl_url :{asteroid.nasa_jpl_url}</p>
          <p>
            is_potentially_hazardous_asteroid :
            {asteroid.is_potentially_hazardous_asteroid ? "yes" : "no"}
          </p>
        </div>
      )}
    </div>
  );
}
