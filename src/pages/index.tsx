import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { api, key } from "../service/api";

import { Container, Input, Location, Main } from "./styles";

interface Location {
  city: string;
  country: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
}

interface IpData {
  ip: string;
  isp: string;
  location: Location;
}

const Home: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);

  const [ipdata, setIpdata] = useState<IpData>({} as IpData);
  const [input, setInput] = useState("Search for any IP address or domain");

  const handleClick = useCallback((ev) => {
    ev.preventDefault();

    console.log(inputEl.current?.value);

    api.get(`${key}=${`${"" || inputEl.current?.value}`}`).then((res) => {
      setIpdata(res.data);
    });
  }, []);

  return (
    <Main>
      <Container>
        <div className="container">
          <h1>IP Address Tracker</h1>
          <form onSubmit={handleClick}>
            <Input>
              <input type="text" placeholder={input} ref={inputEl} />
              <IoIosArrowForward
                color="white"
                size={40}
                onClick={handleClick}
              />
            </Input>
          </form>
        </div>
        <Location>
          <div>
            <div className="location-group">
              <h2>IP ADDRESS</h2>
              <h2>{ipdata.ip}</h2>
            </div>
            <div className="location-group">
              <div className="vertical-line" />
              <div>
                <h2>LOCATION</h2>
                <h2></h2>
              </div>
            </div>
            <div className="location-group">
              <div className="vertical-line" />
              <div>
                <h2>TIMEZONE</h2>
              </div>
            </div>
            <div className="location-group">
              <div className="vertical-line" />
              <div>
                <h2>ISP</h2>
                <h2>{ipdata.isp}</h2>
              </div>
            </div>
          </div>
        </Location>
      </Container>
      <Map
        center={[-10, -10]}
        zoom={13}
        style={{ width: "100%", height: "100%", zIndex: -1 }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>
    </Main>
  );
};

export default Home;
