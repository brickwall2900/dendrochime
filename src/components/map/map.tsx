"use client";

// TODO: DendroChime embeds Leaflet for the map prototype.
// If you want to use Google Maps instead, go ahead.

import React, { useImperativeHandle, useState } from 'react';

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";

// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

// import "leaflet-defaulticon-compatibility";
// yehey

import L, { LatLng, LatLngBounds, LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";

const icon = L.icon({ 
    iconUrl: '/images/marker-icon.png',
    iconSize:    [25, 41],
      iconAnchor:  [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize:  [41, 41]
});

const iconChoose = L.icon({ 
    iconUrl: '/images/marker-icon-choose.png',
    iconSize:    [25, 41],
      iconAnchor:  [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize:  [41, 41]
});

const iconLocated = L.icon({ 
    iconUrl: '/images/marker-icon-locate.png',
    iconSize:    [25, 41],
      iconAnchor:  [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize:  [41, 41]
});

export type Location = {
    lat: number, long: number
}
export type Marker = {
    id: any, popup?: React.ReactNode
} & Location;

function LocationOnClick({ onMapClicked }: { onMapClicked?: (where: Location) => void }) {
    const [position, setPosition] = useState<LatLng | null>(null);
    const [locatePosition, setLocatePosition] = useState<LatLng | null>(null);
    const map = useMapEvents({
        click(e) {
            const latlng = e.latlng.wrap();
            setPosition(latlng);
            if (onMapClicked) {
                const x = { lat: latlng.lat || 0, long: latlng.lng || 0 };
                onMapClicked(x);
            }
        },
        locationfound(e) {
            setLocatePosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        }
    });

    return <>
        {position === null ? null : (
            <Marker position={position} icon={iconChoose}>
                <Popup>
                    <div>
                        <p>Selected Location: {position.lat}, {position.lng}</p>
                    </div>
                </Popup>
            </Marker>
        )}

        {locatePosition === null ? null : (
            <Marker position={locatePosition} icon={iconChoose}>
                <Popup>
                    <div>
                        <p>Device Location: {locatePosition.lat}, {locatePosition.lng}</p>
                    </div>
                </Popup>
            </Marker>
        )}
    </>
}

export default function Map({ markers, onMapClicked, ref }: { markers?: Marker[], onMapClicked?: (where: Location) => void, ref?: any }) {
    return (
        <MapContainer
            center={[0, 0]}
            zoom={11}
            scrollWheelZoom
            ref={ref}
            
            className="h-full w-full">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {onMapClicked && <LocationOnClick onMapClicked={onMapClicked} />}

            {markers?.map((marker) => {
                return <Marker position={[marker.lat, marker.long] as LatLngTuple} key={marker.id} icon={icon}>
                    {marker.popup ? <Popup>{marker.popup}</Popup> : ""}
                </Marker>;
            })}
        </MapContainer>
    );
}