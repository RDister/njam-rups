package com.njam.rups_geography_backend.data;

import java.util.Arrays;
import java.util.List;

import com.njam.rups_geography_backend.models.Answer;


public class LandmarksData {
    
    public static final List<Answer> LANDMARKS = Arrays.asList(
        // Add your landmarks here, for example:
        Answer.builder()
            .name("Eiffel Tower")
            .country("France")
            .lat(48.8584)
            .lon(2.2945)
            .build(),
        
        Answer.builder()
            .name("Colosseum")
            .country("Italy")
            .lat(41.8902)
            .lon(12.4922)
            .build(),
        
        Answer.builder()
            .name("Brandenburg Gate")
            .country("Germany")
            .lat(52.5163)
            .lon(13.3777)
            .build()
        
        // TODO: Add all your landmarks here
    );
    

    public static Answer getRandomLandmark() {
        int randomIndex = (int) (Math.random() * LANDMARKS.size());
        return LANDMARKS.get(randomIndex);
    }
    
    public static int getCount() {
        return LANDMARKS.size();
    }
}
