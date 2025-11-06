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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
