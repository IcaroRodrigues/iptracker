import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import CustomMarker from "../assets/maps-and-flags.svg";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { api, countrieFlagApi } from "../service/api";
import { Container, Input, Location, Main } from "./styles";

const customMarker = L.icon({
  iconUrl: `${CustomMarker}`,
  iconSize: [30, 30],
});

interface LocationData {
  timezone: string;
  country_flag: string;
}

interface IpData {
  city: string;
  country: string;
  countryCode: string;
  region: string;
  isp: string;
  lat: number;
  lon: number;
  query: number;
}

const Home: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);

  const [ipdata, setIpdata] = useState<IpData>({} as IpData);
  const [flagData, setFlagData] = useState("");
  const [timezone, setTimezone] = useState("");

  /*
  useEffect(() => {
    try {
      api.get(`${"189.6.24.243"}?access_key=${`${key}`}`).then((res) => {
        setIpdata(res.data);
      });

      api.get("http://ip-api.com/json/").then((res) => {
        setTimezone(res.data.timezone);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      api.get(`https://extreme-ip-lookup.com/json/`).then((res) => {
        console.log(res.data);
      });

      api.get("http://ip-api.com/json/").then((res) => {
        setTimezone(res.data.timezone);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  */

  useEffect(() => {
    try {
      api.get("").then((res) => {
        setIpdata(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      countrieFlagApi
        .get(`${ipdata.countryCode === undefined ? "us" : ipdata.countryCode}`)
        .then((res) => {
          setFlagData(res.data.flag);
        });
    } catch (err) {}
  }, [ipdata.countryCode]);

  const handleClick = useCallback((ev) => {
    ev.preventDefault();

    try {
      api.get(`${inputEl.current?.value}`).then((res) => {
        const response = res.data;
        if (response.type === null) {
          return console.log("Endereço de ip invalido");
        }

        setIpdata(response);
      });

      api
        .get(`http://ip-api.com/json/${inputEl.current?.value}`)
        .then((res) => {
          setTimezone(res.data.timezone);
        });
    } catch (err) {
      console.log("Endereço de ip inválido", err);
    }
  }, []);

  return (
    <Main>
      <Container>
        <div className="container">
          <h1>IP Address Tracker</h1>
          <form onSubmit={handleClick}>
            <Input>
              <input
                type="text"
                placeholder="Search for any IP address or domain"
                ref={inputEl}
              />
              <IoIosArrowForward
                color="white"
                size={40}
                onClick={handleClick}
              />
            </Input>
          </form>
        </div>
        <Location>
          <div className="location-container">
            <div className="location-group">
              <h3>IP ADDRESS</h3>
              <h2>
                {ipdata.query === undefined ? "Loading..." : ipdata.query}
              </h2>
            </div>
            <div className="vertical-line"></div>
            <div className="location-group">
              <h3>LOCATION</h3>
              <h2>{ipdata.city === undefined ? "Loading..." : ipdata.city}</h2>
            </div>
            <div className="vertical-line"></div>
            <div className="location-group">
              <div>
                <h3>TIMEZONE</h3>
                <h2>{timezone === "" ? "Loading..." : timezone}</h2>
              </div>
            </div>

            <img
              alt={ipdata.country}
              src={flagData === undefined ? "Loading..." : flagData}
            />
          </div>
        </Location>
      </Container>

      {ipdata.lat !== undefined && (
        <Map
          center={{
            lat: ipdata.lat,
            lng: ipdata.lon,
          }}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          <Marker icon={customMarker} position={[ipdata.lat, ipdata.lon]}>
            <Popup>
              <span>You are here</span>
            </Popup>
          </Marker>
        </Map>
      )}
    </Main>
  );
};

export default Home;
