package com.njam.rups_geography_backend.data;

import java.util.Arrays;
import java.util.List;

import com.njam.rups_geography_backend.models.Answer;

//For flags game mode

public class CountriesData {
    
    public static final List<Answer> COUNTRIES = Arrays.asList(
        Answer.builder().name("Albania").country("Albania").lat(41.1533).lon(20.1683).build(),
        Answer.builder().name("Andorra").country("Andorra").lat(42.5063).lon(1.5218).build(),
        Answer.builder().name("Austria").country("Austria").lat(47.5162).lon(14.5501).build(),
        Answer.builder().name("Belarus").country("Belarus").lat(53.7098).lon(27.9534).build(),
        Answer.builder().name("Belgium").country("Belgium").lat(50.5039).lon(4.4699).build(),
        Answer.builder().name("Bosnia and Herzegovina").country("Bosnia and Herzegovina").lat(43.9159).lon(17.6791).build(),
        Answer.builder().name("Bulgaria").country("Bulgaria").lat(42.7339).lon(25.4858).build(),
        Answer.builder().name("Croatia").country("Croatia").lat(45.1).lon(15.2).build(),
        Answer.builder().name("Cyprus").country("Cyprus").lat(35.1264).lon(33.4299).build(),
        Answer.builder().name("Czech Republic").country("Czech Republic").lat(49.8175).lon(15.473).build(),
        Answer.builder().name("Denmark").country("Denmark").lat(56.2639).lon(9.5018).build(),
        Answer.builder().name("Estonia").country("Estonia").lat(58.5953).lon(25.0136).build(),
        Answer.builder().name("Finland").country("Finland").lat(61.9241).lon(25.7482).build(),
        Answer.builder().name("France").country("France").lat(46.6034).lon(1.8883).build(),
        Answer.builder().name("Germany").country("Germany").lat(51.1657).lon(10.4515).build(),
        Answer.builder().name("Greece").country("Greece").lat(39.0742).lon(21.8243).build(),
        Answer.builder().name("Hungary").country("Hungary").lat(47.1625).lon(19.5033).build(),
        Answer.builder().name("Iceland").country("Iceland").lat(64.9631).lon(-19.0208).build(),
        Answer.builder().name("Ireland").country("Ireland").lat(53.1424).lon(-7.6921).build(),
        Answer.builder().name("Italy").country("Italy").lat(41.8719).lon(12.5674).build(),
        Answer.builder().name("Kosovo").country("Kosovo").lat(42.6026).lon(20.903).build(),
        Answer.builder().name("Latvia").country("Latvia").lat(56.8796).lon(24.6032).build(),
        Answer.builder().name("Liechtenstein").country("Liechtenstein").lat(47.166).lon(9.5554).build(),
        Answer.builder().name("Lithuania").country("Lithuania").lat(55.1694).lon(23.8813).build(),
        Answer.builder().name("Luxembourg").country("Luxembourg").lat(49.8153).lon(6.1296).build(),
        Answer.builder().name("Malta").country("Malta").lat(35.9375).lon(14.3754).build(),
        Answer.builder().name("Moldova").country("Moldova").lat(47.4116).lon(28.3699).build(),
        Answer.builder().name("Monaco").country("Monaco").lat(43.7384).lon(7.4246).build(),
        Answer.builder().name("Montenegro").country("Montenegro").lat(42.7087).lon(19.3744).build(),
        Answer.builder().name("Netherlands").country("Netherlands").lat(52.1326).lon(5.2913).build(),
        Answer.builder().name("North Macedonia").country("North Macedonia").lat(41.6086).lon(21.7453).build(),
        Answer.builder().name("Norway").country("Norway").lat(60.472).lon(8.4689).build(),
        Answer.builder().name("Poland").country("Poland").lat(51.9194).lon(19.1451).build(),
        Answer.builder().name("Portugal").country("Portugal").lat(39.3999).lon(-8.2245).build(),
        Answer.builder().name("Romania").country("Romania").lat(45.9432).lon(24.9668).build(),
        Answer.builder().name("Russia").country("Russia").lat(61.524).lon(105.3188).build(),
        Answer.builder().name("San Marino").country("San Marino").lat(43.9424).lon(12.4578).build(),
        Answer.builder().name("Serbia").country("Serbia").lat(44.0165).lon(21.0059).build(),
        Answer.builder().name("Slovakia").country("Slovakia").lat(48.669).lon(19.699).build(),
        Answer.builder().name("Slovenia").country("Slovenia").lat(46.1512).lon(14.9955).build(),
        Answer.builder().name("Spain").country("Spain").lat(40.4637).lon(-3.7492).build(),
        Answer.builder().name("Sweden").country("Sweden").lat(60.1282).lon(18.6435).build(),
        Answer.builder().name("Switzerland").country("Switzerland").lat(46.8182).lon(8.2275).build(),
        Answer.builder().name("Ukraine").country("Ukraine").lat(48.3794).lon(31.1656).build(),
        Answer.builder().name("United Kingdom").country("United Kingdom").lat(55.3781).lon(-3.436).build(),
        Answer.builder().name("Vatican City").country("Vatican City").lat(41.9029).lon(12.4534).build()
    );
    
    public static Answer getRandomCountry() {
        int randomIndex = (int) (Math.random() * COUNTRIES.size());
        return COUNTRIES.get(randomIndex);
    }
    
    public static int getCount() {
        return COUNTRIES.size();
    }
}
