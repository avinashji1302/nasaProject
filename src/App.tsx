import axios from "axios";
import React, { useState } from "react";
import "./Components/App.css";
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
      <div className="container">
        <div className="form">
          <h1 className="heading">Nasa Project</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Asteroid ID"
              onChange={handleChange}
              className="input"
            />
            <button disabled={!value} type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        <div className="random-as">
          <button onClick={handleRandomAsteroid} className="rdm-btn">
            Random Asteroid
          </button>
          {asteroid && (
            <div className="result">
              <p className="name">
                {" "}
                <b>Name :</b> {asteroid.name}
              </p>
              <p className="url">
                {" "}
                <b>nasa_jpl_url :</b> {asteroid.nasa_jpl_url}
              </p>
              <p className="isYes">
                {" "}
                <b>is_potentially_hazardous_asteroid :</b>
                {asteroid.is_potentially_hazardous_asteroid ? "yes" : "no"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
