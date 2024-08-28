import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Leaf } from 'lucide-react'

// Custom leaf icon
const leafIcon = new L.Icon({
  iconUrl: '/leaflet/leaf-green.png',
  shadowUrl: '/leaflet/leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
})

export default function Map() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]} icon={leafIcon}>
        <Popup>
          A sample waste collection point. <br />
          <Leaf className="w-6 h-6 inline-block mr-2 text-green-600" />
          Join our eco-friendly waste management initiative!
        </Popup>
      </Marker>
    </MapContainer>
  )
}