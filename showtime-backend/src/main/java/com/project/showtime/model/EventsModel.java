package com.project.showtime.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "showtime", name = "events")
public class EventsModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(name = "event_description", nullable = false)
    private String eventDescription;

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;
    
    @Column(name = "event_location", nullable = false)
    private String eventLocation;

    @Column(name = "event_image_url", nullable = false)
    private String eventImageUrl;

    @Column(name = "event_status", nullable = false)
    private String eventStatus;

    @Column(name = "event_created_at", insertable = false, updatable = false)
    private LocalDateTime eventCreatedAt;
    
    @Column(name = "event_updated_at", insertable = false, updatable = false)
    private LocalDateTime eventUpdatedAt;
}
