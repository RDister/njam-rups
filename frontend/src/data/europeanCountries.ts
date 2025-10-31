import { StaticImageData } from "next/image";
import albania from "../../public/GuessTheCountry/albania.png";
import andorra from "../../public/GuessTheCountry/andorra.png";
import austria from "../../public/GuessTheCountry/austria.png";
import belarus from "../../public/GuessTheCountry/belarus.png";
import belgium from "../../public/GuessTheCountry/belgium.png";
import bosnia from "../../public/GuessTheCountry/bosnia.png";
import bulgaria from "../../public/GuessTheCountry/bulgaria.png";
import croatia from "../../public/GuessTheCountry/croatia.png";

export interface Country {
	name: string;
	lat: number;
	lon: number;
	image: StaticImageData;
}

export const europeanCountries: Country[] = [
	{ name: "Albania", lat: 41.1533, lon: 20.1683, image: albania },
	{ name: "Andorra", lat: 42.5063, lon: 1.5218, image: andorra },
	{ name: "Austria", lat: 47.5162, lon: 14.5501, image: austria },
	{ name: "Belarus", lat: 53.7098, lon: 27.9534, image: belarus },
	{ name: "Belgium", lat: 50.5039, lon: 4.4699, image: belgium },
	{ name: "Bosnia and Herzegovina", lat: 43.9159, lon: 17.6791, image: bosnia },
	{ name: "Bulgaria", lat: 42.7339, lon: 25.4858, image: bulgaria },
	{ name: "Croatia", lat: 45.1, lon: 15.2, image: croatia },
];
