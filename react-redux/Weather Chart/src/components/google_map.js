import React from 'react';
import { GoogleMapLoader, Marker, GoogleMap } from 'react-google-maps';

export default ({ lat, lon }) => {
	return (
		<GoogleMapLoader
			containerElement={
				<div style={{height: '100%'}} />
			}
			googleMapElement={
				<GoogleMap defaultZoom={10} defaultCenter={{lat: lat, lng: lon}}>
					<Marker position={{lat: lat, lng: lon}} />
				</GoogleMap>
			}
			/>
	)
}
