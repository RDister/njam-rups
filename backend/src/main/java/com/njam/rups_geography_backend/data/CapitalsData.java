package com.njam.rups_geography_backend.data;

import java.util.Arrays;
import java.util.List;

import com.njam.rups_geography_backend.models.Answer;

//For capitals game mode

public class CapitalsData {
    
    public static final List<Answer> CAPITALS = Arrays.asList(
        Answer.builder().name("Tirana").country("Albania").lat(41.3275).lon(19.8189).build(),
        Answer.builder().name("Andorra la Vella").country("Andorra").lat(42.5078).lon(1.5211).build(),
        Answer.builder().name("Yerevan").country("Armenia").lat(40.1792).lon(44.4991).build(),
        Answer.builder().name("Vienna").country("Austria").lat(48.2082).lon(16.3738).build(),
        Answer.builder().name("Baku").country("Azerbaijan").lat(40.4093).lon(49.8671).build(),
        Answer.builder().name("Minsk").country("Belarus").lat(53.9006).lon(27.5590).build(),
        Answer.builder().name("Brussels").country("Belgium").lat(50.8503).lon(4.3517).build(),
        Answer.builder().name("Sarajevo").country("Bosnia and Herzegovina").lat(43.8563).lon(18.4131).build(),
        Answer.builder().name("Sofia").country("Bulgaria").lat(42.6977).lon(23.3219).build(),
        Answer.builder().name("Zagreb").country("Croatia").lat(45.8150).lon(15.9819).build(),
        Answer.builder().name("Nicosia").country("Cyprus").lat(35.1856).lon(33.3823).build(),
        Answer.builder().name("Prague").country("Czech Republic").lat(50.0755).lon(14.4378).build(),
        Answer.builder().name("Copenhagen").country("Denmark").lat(55.6761).lon(12.5683).build(),
        Answer.builder().name("Tallinn").country("Estonia").lat(59.4370).lon(24.7536).build(),
        Answer.builder().name("Helsinki").country("Finland").lat(60.1695).lon(24.9354).build(),
        Answer.builder().name("Paris").country("France").lat(48.8566).lon(2.3522).build(),
        Answer.builder().name("Tbilisi").country("Georgia").lat(41.7151).lon(44.8271).build(),
        Answer.builder().name("Berlin").country("Germany").lat(52.5200).lon(13.4050).build(),
        Answer.builder().name("Athens").country("Greece").lat(37.9838).lon(23.7275).build(),
        Answer.builder().name("Budapest").country("Hungary").lat(47.4979).lon(19.0402).build(),
        Answer.builder().name("Reykjavik").country("Iceland").lat(64.1355).lon(-21.8954).build(),
        Answer.builder().name("Dublin").country("Ireland").lat(53.3498).lon(-6.2603).build(),
        Answer.builder().name("Rome").country("Italy").lat(41.9028).lon(12.4964).build(),
        Answer.builder().name("Astana").country("Kazakhstan").lat(51.1605).lon(71.4704).build(),
        Answer.builder().name("Pristina").country("Kosovo").lat(42.6629).lon(21.1655).build(),
        Answer.builder().name("Riga").country("Latvia").lat(56.9496).lon(24.1052).build(),
        Answer.builder().name("Vaduz").country("Liechtenstein").lat(47.1416).lon(9.5215).build(),
        Answer.builder().name("Vilnius").country("Lithuania").lat(54.6872).lon(25.2797).build(),
        Answer.builder().name("Luxembourg").country("Luxembourg").lat(49.6117).lon(6.1319).build(),
        Answer.builder().name("Valletta").country("Malta").lat(35.8997).lon(14.5146).build(),
        Answer.builder().name("Chisinau").country("Moldova").lat(47.0105).lon(28.8638).build(),
        Answer.builder().name("Monaco").country("Monaco").lat(43.7384).lon(7.4246).build(),
        Answer.builder().name("Podgorica").country("Montenegro").lat(42.4410).lon(19.2627).build(),
        Answer.builder().name("Amsterdam").country("Netherlands").lat(52.3676).lon(4.9041).build(),
        Answer.builder().name("Skopje").country("North Macedonia").lat(41.9981).lon(21.4254).build(),
        Answer.builder().name("Oslo").country("Norway").lat(59.9139).lon(10.7522).build(),
        Answer.builder().name("Warsaw").country("Poland").lat(52.2297).lon(21.0122).build(),
        Answer.builder().name("Lisbon").country("Portugal").lat(38.7169).lon(-9.1399).build(),
        Answer.builder().name("Bucharest").country("Romania").lat(44.4268).lon(26.1025).build(),
        Answer.builder().name("Moscow").country("Russia").lat(55.7558).lon(37.6173).build(),
        Answer.builder().name("San Marino").country("San Marino").lat(43.9336).lon(12.4508).build(),
        Answer.builder().name("Belgrade").country("Serbia").lat(44.7872).lon(20.4573).build(),
        Answer.builder().name("Bratislava").country("Slovakia").lat(48.1486).lon(17.1077).build(),
        Answer.builder().name("Ljubljana").country("Slovenia").lat(46.0569).lon(14.5058).build(),
        Answer.builder().name("Madrid").country("Spain").lat(40.4168).lon(-3.7038).build(),
        Answer.builder().name("Stockholm").country("Sweden").lat(59.3293).lon(18.0686).build(),
        Answer.builder().name("Bern").country("Switzerland").lat(46.9481).lon(7.4474).build(),
        Answer.builder().name("Ankara").country("Turkey").lat(39.9334).lon(32.8597).build(),
        Answer.builder().name("Kyiv").country("Ukraine").lat(50.4501).lon(30.5234).build(),
        Answer.builder().name("London").country("United Kingdom").lat(51.5074).lon(-0.1278).build(),
        Answer.builder().name("Vatican City").country("Vatican City").lat(41.9029).lon(12.4534).build()
    );
    
    /**
     * Get a random capital from the list.
     */
    public static Answer getRandomCapital() {
        int randomIndex = (int) (Math.random() * CAPITALS.size());
        return CAPITALS.get(randomIndex);
    }
    
    /**
     * Get total number of capitals.
     */
    public static int getCount() {
        return CAPITALS.size();
    }
}
