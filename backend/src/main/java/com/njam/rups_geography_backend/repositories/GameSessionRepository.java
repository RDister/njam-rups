package com.njam.rups_geography_backend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.njam.rups_geography_backend.models.GameSession;

@Repository
public interface GameSessionRepository extends CrudRepository<GameSession, String> {
    
    Optional<GameSession> findById(String id);
    
    @Override
    boolean existsById(String id);
}
