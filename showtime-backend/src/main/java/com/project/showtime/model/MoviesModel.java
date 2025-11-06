package com.project.showtime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(schema = "showtime", name="movies")
public class MoviesModel {
    @Id
    @Column(name="movies_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name = "certificate")
    private String certificate;

    @Column(name="duration")
    private Integer duration;

    @Column(name="rating")
    private Double rating;

    @Column(name="description")
    private String description;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "trailer_url")
    private String trailerUrl;

    @Column(name="is_active")
    private Boolean isActive;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;
}
