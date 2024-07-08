import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet-control-geocoder';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import styles from './styles.module.css';
import L from 'leaflet';



const Map = ({ coords, places, setCoords, setChildClicked }) => {

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

        // places?.forEach(place => {
        //     const popupContent = `
        //     <div style="text-align: center; max-width: 200px;">
        //         <img src="${place.photos && place.photos.length > 0 ? place.photos[0].src : './restaurant.jpg'}" style="height: 100px; width: 100px; margin: 0 auto;"/>
        //         <h4 style="font-weight: bold; margin-top: 5px; overflow-wrap: break-word;">${place.name}</h4>
        //     </div>
        //     `;
        //     const popupOptions = {
        //         maxWidth: "200",
        //         maxHeight: "200",
        //         closeButton: false
        //     };
        //     const marker = L.marker([place.latitude, place.longitude]).addTo(map).bindPopup(popupContent, popupOptions);
        //     marker.openPopup();
        // });


        return () => {
            map.remove();

        };
    }, [latlng, places]);

    // console.log("map coords : lat : " + coords.lat + " lng : " + coords.lng);


    return (
        <div id="map" className={styles.map}>
        </div>
    );

};

export default Map;
