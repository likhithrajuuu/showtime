package com.project.showtime.repository;

import com.project.showtime.model.MoviesModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoviesRepository extends JpaRepository<MoviesModel, Long> {
    List<MoviesModel> findTop10ByOrderByRatingDesc();
}
