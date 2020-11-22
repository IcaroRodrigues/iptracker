import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import CustomMarker from "../assets/maps-and-flags.svg";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { api, key } from "../service/api";
import { Container, Input, Location, Main } from "./styles";

const customMarker = L.icon({
  iconUrl: `${CustomMarker}`,
  iconSize: [30, 30],
});

interface LocationData {
  gmt_offset: number;
}

interface FlagData {
  png: string;
  svg: string;
}
interface IpData {
  ip_address: string;
  city: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  timezone: LocationData;
  flag: FlagData
}

const Home: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);

  const [ipdata, setIpdata] = useState<IpData>({} as IpData);


  useEffect(() => {

    api.get(`?api_key=${key}&ip_address`).then(res => {
      setIpdata(res.data)
    })
  }, [])

  const handleClick = useCallback((ev) => {
    ev.preventDefault();

    try {
      api.get(`?api_key=${key}&ip_address=8.8.8.8`).then((res) => {
        const response = res.data;
        console.log(response)
        if (response.type === null) {
          return console.log("Endereço de ip invalido");
        }

        setIpdata(response);
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
                {ipdata.ip_address === undefined ? "Loading..." : ipdata.ip_address}
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
                <h2>{ipdata.timezone === undefined ? "Loading..." : 'UTC' + ipdata.timezone.gmt_offset }</h2>
              </div>
            </div>

            <img
              alt={ipdata.country}
              src={ipdata.flag === undefined ? "Loading..." : ipdata.flag.png}
            />
          </div>
        </Location>
      </Container>

      {ipdata.latitude !== undefined && (
        <Map
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

          <Marker icon={customMarker} position={[ipdata.latitude, ipdata.longitude]}>
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
