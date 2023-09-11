import { ZipCodeData } from "@/typings";
import React, { useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface MapChartProps {
  zipCodeData: ZipCodeData[];
}

const MapChart: React.FC<MapChartProps> = ({ zipCodeData }) => {
  useEffect(() => {
   
  }, []);
  return (
    <ComposableMap
      projection="geoAlbers"
      projectionConfig={{
        scale: 1000,
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {zipCodeData?.map((map) => (
        map?.latitude && map?.longitude &&
        <Marker key={map.city} coordinates={[map.longitude, map.latitude]}>
        <g
          fill="none"
          stroke="#FF5533"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-12, -24)"
        >
          <circle cx="12" cy="10" r="3" />
          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
        </g>
        <text
          textAnchor="middle"
          y={15}
          style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
        >
          {map.city}
        </text>
      </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
