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
}

export const europeanCountries: Country[] = [
	{ name: "Albania", lat: 41.1533, lon: 20.1683 },
	{ name: "Andorra", lat: 42.5063, lon: 1.5218 },
	{ name: "Austria", lat: 47.5162, lon: 14.5501 },
	{ name: "Belarus", lat: 53.7098, lon: 27.9534 },
	{ name: "Belgium", lat: 50.5039, lon: 4.4699 },
	{ name: "Bosnia and Herzegovina", lat: 43.9159, lon: 17.6791 },
	{ name: "Bulgaria", lat: 42.7339, lon: 25.4858 },
	{ name: "Croatia", lat: 45.1, lon: 15.2 },
	{ name: "Cyprus", lat: 35.1264, lon: 33.4299 },
	{ name: "Czech Republic", lat: 49.8175, lon: 15.473 },
	{ name: "Denmark", lat: 56.2639, lon: 9.5018 },
	{ name: "Estonia", lat: 58.5953, lon: 25.0136 },
	{ name: "Finland", lat: 61.9241, lon: 25.7482 },
	{ name: "France", lat: 46.6034, lon: 1.8883 },
	{ name: "Germany", lat: 51.1657, lon: 10.4515 },
	{ name: "Greece", lat: 39.0742, lon: 21.8243 },
	{ name: "Hungary", lat: 47.1625, lon: 19.5033 },
	{ name: "Iceland", lat: 64.9631, lon: -19.0208 },
	{ name: "Ireland", lat: 53.1424, lon: -7.6921 },
	{ name: "Italy", lat: 41.8719, lon: 12.5674 },
	{ name: "Kosovo", lat: 42.6026, lon: 20.903 },
	{ name: "Latvia", lat: 56.8796, lon: 24.6032 },
	{ name: "Liechtenstein", lat: 47.166, lon: 9.5554 },
	{ name: "Lithuania", lat: 55.1694, lon: 23.8813 },
	{ name: "Luxembourg", lat: 49.8153, lon: 6.1296 },
	{ name: "Malta", lat: 35.9375, lon: 14.3754 },
	{ name: "Moldova", lat: 47.4116, lon: 28.3699 },
	{ name: "Monaco", lat: 43.7384, lon: 7.4246 },
	{ name: "Montenegro", lat: 42.7087, lon: 19.3744 },
	{ name: "Netherlands", lat: 52.1326, lon: 5.2913 },
	{ name: "North Macedonia", lat: 41.6086, lon: 21.7453 },
	{ name: "Norway", lat: 60.472, lon: 8.4689 },
	{ name: "Poland", lat: 51.9194, lon: 19.1451 },
	{ name: "Portugal", lat: 39.3999, lon: -8.2245 },
	{ name: "Romania", lat: 45.9432, lon: 24.9668 },
	{ name: "Russia", lat: 61.524, lon: 105.3188 },
	{ name: "San Marino", lat: 43.9424, lon: 12.4578 },
	{ name: "Serbia", lat: 44.0165, lon: 21.0059 },
	{ name: "Slovakia", lat: 48.669, lon: 19.699 },
	{ name: "Slovenia", lat: 46.1512, lon: 14.9955 },
	{ name: "Spain", lat: 40.4637, lon: -3.7492 },
	{ name: "Sweden", lat: 60.1282, lon: 18.6435 },
	{ name: "Switzerland", lat: 46.8182, lon: 8.2275 },
	{ name: "Ukraine", lat: 48.3794, lon: 31.1656 },
	{ name: "United Kingdom", lat: 55.3781, lon: -3.436 },
	{ name: "Vatican City", lat: 41.9029, lon: 12.4534 },
];
