package com.project.showtime.controller;

import com.project.showtime.exception.CrudOperationException;
import com.project.showtime.exception.CrudValidationException;
import com.project.showtime.model.MoviesModel;
import com.project.showtime.service.MoviesService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MoviesController {

    @Autowired
    private MoviesService moviesService;

    private Logger log = LogManager.getLogger(MoviesController.class);

    @GetMapping("/getall")
    public ResponseEntity<?> getAllMovies() {
        try {
            List<MoviesModel> movies = moviesService.getAllMovies();
            log.info("Successfully retrieved " + movies.size() + " movies");
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (CrudOperationException | CrudValidationException e) {
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMovie(@RequestBody MoviesModel movie) {
        try {
            MoviesModel newMovie = moviesService.addMovie(movie);
            return ResponseEntity.status(HttpStatus.OK).body(newMovie);
        } catch (CrudOperationException | CrudValidationException e) {
            log.info("Exception while adding movie: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.info("Exception while adding movie: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable Long id) {
        try {
            MoviesModel movie = moviesService.getMovieById(id);
            return ResponseEntity.status(HttpStatus.OK).body(movie);
        } catch (CrudOperationException | CrudValidationException e) {
            log.info("Exception while getting movie by id: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.info("Exception while getting movie by id: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/top-rated")
    public ResponseEntity<?> getTopRatedMovies() {
        try {
            List<MoviesModel> movies = moviesService.getTopRatedMovies();
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (CrudOperationException | CrudValidationException e) {
            log.info("Exception while getting top rated movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.info("Exception while getting top rated movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterMovies(
            @RequestParam(required = false) List<String> languages,
            @RequestParam(required = false) List<String> genres,
            @RequestParam(required = false) List<String> formats
    ) {
        try {
            List<MoviesModel> movies = moviesService.filterByAll(languages, genres, formats);
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (CrudOperationException | CrudValidationException e) {
            log.info("Exception while filtering movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.info("Exception while filtering movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/filter/languages")
    public ResponseEntity<?> filterByLanguages(@RequestParam List<String> languages) {
        try {
            List<MoviesModel> movies = moviesService.filterByLanguages(languages);
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (Exception e) {
            log.info("Exception while filtering by languages: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/filter/genres")
    public ResponseEntity<?> filterByGenres(@RequestParam List<String> genres) {
        try {
            List<MoviesModel> movies = moviesService.filterByGenres(genres);
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (Exception e) {
            log.info("Exception while filtering by genres: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/filter/formats")
    public ResponseEntity<?> filterByFormats(@RequestParam List<String> formats) {
        try {
            List<MoviesModel> movies = moviesService.filterByFormats(formats);
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (Exception e) {
            log.info("Exception while filtering by formats: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/filter/languages-genres")
    public ResponseEntity<?> filterByLanguagesAndGenres(
            @RequestParam List<String> languages,
            @RequestParam List<String> genres
    ) {
        try {
            List<MoviesModel> movies = moviesService.filterByLanguagesAndGenres(languages, genres);
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (Exception e) {
            log.info("Exception while filtering by languages and genres: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/filter/genres-formats")
    public ResponseEntity<?> filterByGenresAndFormats(
            @RequestParam List<String> genres,
            @RequestParam List<String> formats
    ) {
        try {
            List<MoviesModel> movies = moviesService.filterByGenresAndFormats(genres, formats);
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (Exception e) {
            log.info("Exception while filtering by genres and formats: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/filter/languages-formats")
    public ResponseEntity<?> filterByLanguagesAndFormats(
            @RequestParam List<String> languages,
            @RequestParam List<String> formats
    ) {
        try {
            List<MoviesModel> movies = moviesService.filterByLanguagesAndFormats(languages, formats);
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (Exception e) {
            log.info("Exception while filtering by languages and formats: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}