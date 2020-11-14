import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { api, key } from "../service/api";

import { Container, Input, Location, Main } from "./styles";

interface LocationData {
  city: string;
  country: string;
  lat: string;
  lng: string;
  postalCode: string;
  timezone: string;
}
interface IpData {
  ip: string;
  isp: string;
  location: LocationData;
}

interface Coordinates {
  latitute: number;
  longitude: number;
}

const Home: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);

  const [ipdata, setIpdata] = useState<IpData>({} as IpData);
  const [input, setInput] = useState("Search for any IP address or domain");
  const [coord, setCoord] = useState<Coordinates>({} as Coordinates);

  useEffect(() => {
    try {
      api.get(`${key}=${""}`).then((res) => {
        setIpdata(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClick = useCallback((ev) => {
    ev.preventDefault();

    api.get(`${key}=${`${"" || inputEl.current?.value}`}`).then((res) => {
      setIpdata(res.data);
    });
  }, []);

  const latitude =
    ipdata.location === undefined
      ? parseFloat("-10")
      : parseFloat(ipdata.location.lat);

  const long =
    ipdata.location === undefined
      ? parseFloat("-10")
      : parseFloat(ipdata.location.lng);

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
              <h3>IP ADDRESS</h3>
              <h2>{ipdata.ip === undefined ? "Loading..." : ipdata.ip}</h2>
            </div>
            <div className="location-group">
              <div className="vertical-line" />
              <div>
                <h3>LOCATION</h3>
                <h2>
                  {ipdata.location === undefined
                    ? "Loading..."
                    : ipdata.location.city}
                  {ipdata.location === undefined
                    ? ""
                    : `, ${ipdata.location.country}`}
                </h2>
                <span>
                  {ipdata.location === undefined
                    ? "Loading..."
                    : ipdata.location.postalCode}
                </span>
              </div>
            </div>
            <div className="location-group">
              <div className="vertical-line" />
              <div>
                <h3>TIMEZONE</h3>
                <h2>
                  {ipdata.location === undefined
                    ? "Loading..."
                    : `UTC ${ipdata.location.timezone}`}
                </h2>
              </div>
            </div>

            <div className="location-group">
              <div className="vertical-line" />
              <div>
                <h3>ISP</h3>
                <h2>{ipdata.isp === undefined ? "Loading..." : ipdata.isp}</h2>
              </div>
            </div>
          </div>
        </Location>
      </Container>

      <MapContainer
        center={{ lat: -43.232, lng: 93.239 }}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        <Marker position={[-43.232, 93.239]}></Marker>
      </MapContainer>
    </Main>
  );
};

export default Home;
