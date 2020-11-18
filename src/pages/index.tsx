import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import CustomMarker from "../assets/maps-and-flags.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { api, key } from "../service/api";
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
  ip: string;
  isp: string;
  city: string;
  zip: string;
  location: LocationData;
  region_code: string;
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);

  const [ipdata, setIpdata] = useState<IpData>({} as IpData);
  const [timezone, setTimezone] = useState("");

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

  const handleClick = useCallback((ev) => {
    ev.preventDefault();

    try {
      api.get(`${inputEl.current?.value}?access_key=${key}`).then((res) => {
        const response = res.data;
        if (response.type === null) {
          return console.log("Endereço de ip invalido");
        }

        setIpdata(response);
        console.log(response);
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
              <h2>{ipdata.ip === undefined ? "Loading..." : ipdata.ip}</h2>
            </div>
            <div className="vertical-line"></div>
            <div className="location-group">
              <h3>LOCATION</h3>
              <h2>
                {ipdata.city === undefined ? "Loading..." : ipdata.city}
                {ipdata.region_code === undefined
                  ? ""
                  : `, ${ipdata.region_code}`}
              </h2>
            </div>
            <div className="vertical-line"></div>
            <div className="location-group">
              <div>
                <h3>TIMEZONE</h3>
                <h2>{timezone === "" ? "Loading" : timezone}</h2>
              </div>
            </div>

            <img
              alt={ipdata.region_code}
              src={
                ipdata.location === undefined
                  ? "Loading..."
                  : ipdata.location.country_flag
              }
            />
          </div>
        </Location>
      </Container>

      {ipdata.location !== undefined && (
        <MapContainer
          center={{
            lat: ipdata.latitude,
            lng: ipdata.longitude,
          }}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          <Marker
            icon={customMarker}
            position={[ipdata.latitude, ipdata.longitude]}
          >
            <Popup>
              <span>You are here</span>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </Main>
  );
};

export default Home;
