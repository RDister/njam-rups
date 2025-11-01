"use client";

import { memo } from "react";
import classes from "./GameMap.module.scss";
import {
	AdvancedMarker,
	Pin,
	APIProvider,
	Map,
} from "@vis.gl/react-google-maps";
import colors from "@/styles/variables";

interface MapGuess {
	lat: number;
	lng: number;
	isCorrect: boolean;
}

interface GameMapProps {
	guesses: MapGuess[];
}

const GameMap = ({ guesses }: GameMapProps) => {
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
					style={{ width: "100%", height: "100%" }}
					defaultCenter={{ lat: 22.54992, lng: 0 }}
					defaultZoom={3}
					mapId={mapId}
					gestureHandling="greedy"
					disableDefaultUI
					reuseMaps
				>
					{guesses.map((guess) => (
						<AdvancedMarker
							key={guess.lat + guess.lng}
							position={{ lat: guess.lat, lng: guess.lng }}
						>
							<Pin
								background={guess.isCorrect ? colors.success : colors.fail}
								borderColor={
									guess.isCorrect ? colors.successDarker : colors.failDarker
								}
								glyphColor={
									guess.isCorrect ? colors.successDarker : colors.failDarker
								}
							/>
						</AdvancedMarker>
					))}
				</Map>
			</APIProvider>
		</div>
	);
};

export default memo(GameMap);
