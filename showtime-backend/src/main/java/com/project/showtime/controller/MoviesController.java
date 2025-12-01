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
    public ResponseEntity<?> getAllMovies(){
        try{
            List<MoviesModel> movies = moviesService.getAllMovies();
            log.info("Successfully retrieved " + movies.size() + " movies");
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        }catch(CrudOperationException e){
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        catch(CrudValidationException e){
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch(Exception e){
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMovie(@RequestBody MoviesModel movie){
        try{
            MoviesModel newMovie = moviesService.addMovie(movie);
            return ResponseEntity.status(HttpStatus.OK).body(newMovie);
        }catch(CrudOperationException e){
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        catch(CrudValidationException e){
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch(Exception e){
            log.info("Exception while getting all movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable Long id){
        try{
            MoviesModel movie = moviesService.getMovieById(id);
            return ResponseEntity.status(HttpStatus.OK).body(movie);
        }catch(CrudOperationException e){
            log.info("Exception while getting movie by id: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        catch(CrudValidationException e){
            log.info("Exception while getting movie by id: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch(Exception e){
            log.info("Exception while getting movie by id: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/top-rated")
    public ResponseEntity<?> getTopRatedMovies(){
        try{
            List<MoviesModel> movies = moviesService.getTopRatedMovies();
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        }catch(CrudOperationException e){
            log.info("Exception while getting top rated movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        catch(CrudValidationException e){
            log.info("Exception while getting top rated movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch(Exception e){
            log.info("Exception while getting top rated movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
