package com.project.showtime.repository;

import com.project.showtime.model.MoviesModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviesRepository extends JpaRepository<MoviesModel, Long> {

}
