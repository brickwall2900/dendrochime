"use client";

// TODO: Dendrochime embeds Leaflet for the map prototype.
// If you want to use Google Maps instead, go ahead.

import { useState } from 'react';

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";

// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

// import "leaflet-defaulticon-compatibility";
// yehey

import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";

const icon = L.icon({ 
    iconUrl: '/images/marker-icon.png',
    iconSize:    [25, 41],
      iconAnchor:  [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize:  [41, 41]
});

export type Marker = {
    lat: number, long: number, popup?: string
};

export default function Map({ markers }: { markers?: Marker[] }) {
    return (
        <MapContainer
            center={[0, 0]}
            zoom={11}
            scrollWheelZoom={true}
            className="h-full w-full">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers?.map((marker) => {
                return <Marker position={[marker.lat, marker.long]} icon={icon}>
                    {marker.popup ? <Popup>marker.popup</Popup> : ""}
                </Marker>;
            })}
        </MapContainer>
    );
}