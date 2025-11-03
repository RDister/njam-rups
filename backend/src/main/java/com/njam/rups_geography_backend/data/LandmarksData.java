package com.njam.rups_geography_backend.data;

import java.util.Arrays;
import java.util.List;

import com.njam.rups_geography_backend.models.Answer;



public class LandmarksData {
    
    public static final List<Answer> LANDMARKS = Arrays.asList(
        Answer.builder().name("Eiffel Tower").country("France").lat(48.8584).lon(2.2945).build(),
        Answer.builder().name("Colosseum").country("Italy").lat(41.8902).lon(12.4922).build(),
        Answer.builder().name("Acropolis of Athens").country("Greece").lat(37.9715).lon(23.7267).build(),
        Answer.builder().name("Louvre Museum").country("France").lat(48.8606).lon(2.3376).build(),
        Answer.builder().name("Stonehenge").country("United Kingdom").lat(51.1789).lon(-1.8262).build(),
        Answer.builder().name("Prague Castle").country("Czech Republic").lat(50.0909).lon(14.4009).build(),
        Answer.builder().name("Neuschwanstein Castle").country("Germany").lat(47.5576).lon(10.7498).build(),
        Answer.builder().name("Sagrada Família").country("Spain").lat(41.4036).lon(2.1744).build(),
        Answer.builder().name("Big Ben").country("United Kingdom").lat(51.5007).lon(-0.1246).build(),
        Answer.builder().name("Brandenburg Gate").country("Germany").lat(52.5163).lon(13.3777).build(),
        Answer.builder().name("Buckingham Palace").country("United Kingdom").lat(51.5014).lon(-0.1419).build(),
        Answer.builder().name("St. Peter's Basilica").country("Vatican City").lat(41.9022).lon(12.4539).build(),
        Answer.builder().name("Santorini Caldera").country("Greece").lat(36.4066).lon(25.4569).build(),
        Answer.builder().name("Plitvice Lakes National Park").country("Croatia").lat(44.8800).lon(15.6160).build(),
        Answer.builder().name("Lake Bled").country("Slovenia").lat(46.3625).lon(14.0936).build(),
        Answer.builder().name("Schönbrunn Palace").country("Austria").lat(48.1845).lon(16.3122).build(),
        Answer.builder().name("Cliffs of Moher").country("Ireland").lat(52.9715).lon(-9.4309).build(),
        Answer.builder().name("Palace of Versailles").country("France").lat(48.8049).lon(2.1204).build(),
        Answer.builder().name("Vatican Museums and Sistine Chapel").country("Vatican City").lat(41.9065).lon(12.4536).build(),
        Answer.builder().name("Uffizi Gallery").country("Italy").lat(43.7687).lon(11.2550).build(),
        Answer.builder().name("Anne Frank House").country("Netherlands").lat(52.3752).lon(4.8833).build(),
        Answer.builder().name("Rijksmuseum").country("Netherlands").lat(52.3600).lon(4.8852).build(),
        Answer.builder().name("Blue Lagoon").country("Iceland").lat(63.8804).lon(-22.4495).build(),
        Answer.builder().name("Cologne Cathedral").country("Germany").lat(50.9413).lon(6.9583).build(),
        Answer.builder().name("Pompeii Archaeological Park").country("Italy").lat(40.7497).lon(14.4853).build(),
        Answer.builder().name("Matterhorn").country("Switzerland").lat(45.9763).lon(7.6586).build(),
        Answer.builder().name("Geirangerfjord").country("Norway").lat(62.1015).lon(7.2057).build(),
        Answer.builder().name("Mount Etna").country("Italy").lat(37.7510).lon(14.9934).build(),
        Answer.builder().name("Timanfaya National Park").country("Spain").lat(29.0158).lon(-13.6026).build(),
        Answer.builder().name("Fisherman's Bastion").country("Hungary").lat(47.5028).lon(19.0399).build(),
        Answer.builder().name("Hallstatt Village").country("Austria").lat(47.5619).lon(13.6495).build(),
        Answer.builder().name("Alhambra").country("Spain").lat(37.1760).lon(-3.5881).build(),
        Answer.builder().name("Annecy Old Town").country("France").lat(45.8992).lon(6.1280).build(),
        Answer.builder().name("Dubrovnik Old City Walls").country("Croatia").lat(42.6403).lon(18.1102).build(),
        Answer.builder().name("Bran Castle").country("Romania").lat(45.5155).lon(25.3676).build(),
        Answer.builder().name("Plaza de España").country("Spain").lat(37.3770).lon(-5.9861).build(),
        Answer.builder().name("Blue Grotto").country("Italy").lat(40.5500).lon(14.2430).build(),
        Answer.builder().name("Mont Saint-Michel").country("France").lat(48.6360).lon(-1.5115).build(),
        Answer.builder().name("St. Stephen's Basilica").country("Hungary").lat(47.5000).lon(19.0454).build(),
        Answer.builder().name("St. Mark's Basilica").country("Italy").lat(45.4340).lon(12.3398).build(),
        Answer.builder().name("Vernazza (Cinque Terre)").country("Italy").lat(44.1400).lon(9.6830).build(),
        Answer.builder().name("Hallstatt Skywalk").country("Austria").lat(47.5602).lon(13.6529).build(),
        Answer.builder().name("Montmartre & Sacré-Cœur").country("France").lat(48.8867).lon(2.3431).build(),
        Answer.builder().name("Giant's Causeway").country("United Kingdom").lat(55.2408).lon(-6.5116).build(),
        Answer.builder().name("Charles Bridge").country("Czech Republic").lat(50.0865).lon(14.4114).build(),
        Answer.builder().name("Keukenhof Gardens").country("Netherlands").lat(52.2719).lon(4.5469).build(),
        Answer.builder().name("Old Town of Tallinn").country("Estonia").lat(59.4370).lon(24.7536).build(),
        Answer.builder().name("Edinburgh Castle").country("United Kingdom").lat(55.9486).lon(-3.1999).build(),
        Answer.builder().name("Swiss Jungfraujoch").country("Switzerland").lat(46.5484).lon(7.9853).build(),
        Answer.builder().name("Vatican Gardens").country("Vatican City").lat(41.9029).lon(12.4534).build(),
        Answer.builder().name("Canals of Venice").country("Italy").lat(45.4408).lon(12.3155).build()
    );
    
    public static Answer getRandomLandmark() {
        int randomIndex = (int) (Math.random() * LANDMARKS.size());
        return LANDMARKS.get(randomIndex);
    }
    
    public static int getCount() {
        return LANDMARKS.size();
    }
}
