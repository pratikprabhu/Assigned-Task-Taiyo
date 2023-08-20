import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './Maps.css'; // Import custom CSS for Maps

interface CountryData {
  country: string;
  cases: number;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    _id: number;
    lat: number;
    long: number;
  };
}

const Maps: React.FC = () => {
    const [countriesData, setCountriesData] = useState<CountryData[]>([]);
    const [mapBounds, setMapBounds] = useState<[[number, number], [number, number]]>([[-90, -180], [90, 180]]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data: CountryData[] = await response.json();

      setCountriesData(data);

      if (data.length > 0) {
        const newMapBounds = calculateMapBounds(data);
        setMapBounds(newMapBounds);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const customIcon = (flagUrl) =>
  L.divIcon({
    className: 'custom-icon',
    html: `<img src=${flagUrl} class="w-8 h-6" />`,
    iconSize: [32, 24],
    iconAnchor: [16, 12],
  });


  const calculateMapBounds = (data: CountryData[]): [[number, number], [number, number]] => {
    return data.reduce(
      ([[minLat, minLng], [maxLat, maxLng]], country) => [
        [Math.min(minLat, country.countryInfo.lat), Math.min(minLng, country.countryInfo.long)],
        [Math.max(maxLat, country.countryInfo.lat), Math.max(maxLng, country.countryInfo.long)],
      ],
      [[Infinity, Infinity], [-Infinity, -Infinity]]
    );
  };

  
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-9/12 h-5/6 relative map-container  overflow-hidden">
            {countriesData.length > 0 && (
              <MapContainer bounds={mapBounds} zoomControl={false} className="h-full w-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                  subdomains={['a', 'b', 'c']}
                  noWrap={true}
                />
{countriesData.map(country => (
  <Marker
    key={country.countryInfo._id}
    position={[country.countryInfo.lat, country.countryInfo.long]}
    icon={customIcon(country.countryInfo.flag)}
  >
    <Popup>
      <div className="popup-content">
        <h3 className="mb-2 text-lg font-semibold">
          {country.country}
        </h3>
        <img src={country.countryInfo.flag} alt={country.country} className="w-8 h-6 mb-2" />
        <p>Total Cases: {country.cases}</p>
        <p>Active Cases: {country.active}</p>
        <p>Recovered: {country.recovered}</p>
        <p>Deaths: {country.deaths}</p>
      </div>
    </Popup>
  </Marker>
))}

            <ZoomControl position="topleft" />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Maps;
