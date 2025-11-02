"use client";

import GoalMarker from "@/components/Marker/GoalMarker/GoalMarker";
import {
	AdvancedMarker,
	APIProvider,
	Map,
	MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { memo } from "react";
import classes from "./GuessTheLandmarkMap.module.scss";
import { Polyline } from "@/components/Polyline/Polyline";

interface GuessTheLandmarkMapProps {
	guessPosition: google.maps.LatLngLiteral | null;
	onGuessPositionChange: (position: google.maps.LatLngLiteral | null) => void;
	disableGuessing: boolean;
	goalPosition: google.maps.LatLngLiteral | null;
}

const GuessTheLandmarkMap = ({
	guessPosition,
	onGuessPositionChange,
	disableGuessing = false,
	goalPosition,
}: GuessTheLandmarkMapProps) => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

	if (!apiKey || !mapId) {
		console.error("Google Maps configuration missing (api key or mapId)");
		return <div>Map cannot be loaded, missing configuration</div>;
	}

	return (
		<div className={classes.container}>
			<APIProvider apiKey={apiKey}>
				<Map
					defaultCenter={{ lat: 22.54992, lng: 0 }}
					defaultZoom={3}
					mapId={mapId}
					draggableCursor={!disableGuessing ? "crosshair" : undefined}
					gestureHandling="greedy"
					reuseMaps
					disableDefaultUI
					onClick={
						!disableGuessing
							? (ev: MapMouseEvent) => onGuessPositionChange(ev.detail.latLng)
							: undefined
					}
				>
					{guessPosition && <AdvancedMarker position={guessPosition} />}
					{goalPosition && <GoalMarker position={goalPosition} />}
					{goalPosition && guessPosition && (
						<Polyline dashed path={[goalPosition, guessPosition!]} />
					)}
				</Map>
			</APIProvider>
		</div>
	);
};

export default memo(GuessTheLandmarkMap);
