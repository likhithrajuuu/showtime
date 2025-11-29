package com.project.showtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.showtime.model.EventsModel;

public interface EventsRepository extends JpaRepository<EventsModel, Long> {
    
}
