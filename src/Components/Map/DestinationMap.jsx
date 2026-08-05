import PropTypes from 'prop-types';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './destination-map.css';

const DestinationMap = ({ destination }) => (
  <div className="destinationMap" aria-label={`Mapa de ${destination.name}`}>
    <MapContainer center={destination.coordinates} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker center={destination.coordinates} radius={11} pathOptions={{ color: '#087c80', fillColor: '#0aa6a6', fillOpacity: 0.9 }}>
        <Popup><strong>{destination.name}</strong><br />{destination.province}, Ica</Popup>
      </CircleMarker>
    </MapContainer>
  </div>
);

DestinationMap.propTypes = {
  destination: PropTypes.shape({ name: PropTypes.string, province: PropTypes.string, coordinates: PropTypes.arrayOf(PropTypes.number) }).isRequired,
};

export default DestinationMap;
