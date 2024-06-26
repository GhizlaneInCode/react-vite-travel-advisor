// import { useState, useEffect } from 'react';

// import 'leaflet/dist/leaflet.css';
// import 'leaflet/dist/leaflet.js';
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import styles from './styles.module.css';

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet-control-geocoder'; 
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import styles from './styles.module.css';
import L from 'leaflet'; 



const Map = ({ coords, places, setCoords, setChildClicked}) => {

    const [latlng, setLatlng] = useState({ lat: null, lng: null });

    // var L = window.L;

    useEffect(() => {
        const map = L.map("map", {
            center: [coords.lat, coords.lng],
            zoom: 13,
            scrollWheelZoom: false,
        });

        const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);




        let DefaultIcon = L.icon({
            iconUrl: "./marker-icon-2x.png",
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        L.marker([coords.lat, coords.lng]).addTo(map)
            .bindPopup('You are here 😊')
            .openPopup();


        const geocode = L.Control.geocoder({
            defaultMarkGeocode: false
        })
            .on('markgeocode', function (e) {

                map.eachLayer(function (layer) {
                    if (layer !== tile) {
                        map.removeLayer(layer);
                    }
                });

                const latlng = e.geocode.center;

                setCoords({ lat: latlng.lat, lng: latlng.lng });

                // console.log("==> newww coords : lat " + latlng.lat + " lng : " + latlng.lng);

                L.marker(latlng)
                    .addTo(map)
                    .bindPopup(e.geocode.name)
                    .openPopup();

                map.fitBounds(e.geocode.bbox);


            });
            geocode.addTo(map);

        return () => {
            map.remove();

        };
    }, [latlng]);

    // console.log("map coords : lat : " + coords.lat + " lng : " + coords.lng);


    return (
        <div id="map" className={styles.map}>
        </div>
    );

};

export default Map;
