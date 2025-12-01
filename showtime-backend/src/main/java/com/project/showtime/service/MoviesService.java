package com.project.showtime.service;

import com.project.showtime.exception.CrudOperationException;
import com.project.showtime.exception.CrudValidationException;
import com.project.showtime.model.MoviesModel;
import com.project.showtime.repository.MoviesRepository;
import jakarta.validation.ConstraintViolation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import jakarta.validation.Validator;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service

public class MoviesService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Autowired
    private MoviesRepository moviesRepository;

    private Logger log = LogManager.getLogger(MoviesService.class);

    @Autowired
    private Validator validator;

    private static final int DEFAULT_PAGE_NUMBER = 0;
    private static final int DEFAULT_PAGE_SIZE = 10;

    private void checkForNull(MoviesModel MoviesModel) {
        if(MoviesModel == null) {
            throw CrudOperationException.asNullEntity(MoviesModel.class);
        }
    }

    private void checkId(Long id) throws CrudValidationException {
        if(id<=0){
            throw CrudValidationException.asInvalidEntityId(MoviesModel.class);
        }
    }

    private void validate(MoviesModel MoviesModel) throws CrudValidationException {
        Set<ConstraintViolation<MoviesModel>> violations = validator.validate(MoviesModel);
        if(!violations.isEmpty()){
            throw CrudValidationException.asFailedValidationOperation(MoviesModel.class, violations);
        }
    }

    private MoviesModel saveMovie(MoviesModel movie) throws CrudOperationException{
        try{
            boolean isNew = (movie.getMovieId() == null);
            MoviesModel savedModel = moviesRepository.save(movie);
            log.info((isNew ? "Added" : "Updated") + " MoviesModel with ID: " + savedModel.getMovieId());
            return savedModel;
        }catch (Exception e) {
            throw CrudOperationException.asFailedAddOperation(MoviesModel.class, e);
        }
    }


    //Get all the movies
    public List<MoviesModel> getAllMovies() throws CrudOperationException{
        try{
            return moviesRepository.findAll();
        }catch (Exception e) {
            throw CrudOperationException.asFailedGetOperation(MoviesModel.class, e);
        }
    }

    //Add a new movie
    public MoviesModel addMovie(MoviesModel movie) throws CrudOperationException{
        checkForNull(movie);
        validate(movie);
        return saveMovie(movie);
    }

    //Get a movie by id
    @Cacheable(value = "movies", key = "#id")
    public MoviesModel getMovieById(Long id) throws CrudOperationException{
        checkId(id);
        MoviesModel movie = moviesRepository.findById(id).orElse(null);
        if(movie == null){
            log.info("Could not find MoviesModel with ID: " + id);
            throw CrudValidationException.asMissingEntity(MoviesModel.class, id);
        }
        return movie;
    }

    //Update a movie
    public MoviesModel updateMovie(MoviesModel movie) throws CrudOperationException{
        checkForNull(movie);
        validate(movie);
        return saveMovie(movie);
    }

    //Delete a movie
    public void deleteMovie(Long id) throws CrudOperationException{
        checkId(id);
        moviesRepository.deleteById(id);
    }

    //Update a movie by id
    public Optional<MoviesModel> updateMovie(Long id, MoviesModel updated) throws CrudOperationException{
        return moviesRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setCertificate(updated.getCertificate());
            existing.setDuration(updated.getDuration());
            existing.setRating(updated.getRating());
            existing.setDescription(updated.getDescription());
            existing.setPosterUrl(updated.getPosterUrl());
            existing.setTrailerUrl(updated.getTrailerUrl());
            existing.setIsActive(updated.getIsActive());
            existing.setUpdatedAt(LocalDateTime.now());
            return moviesRepository.save(existing);
        });
    }

    public List<MoviesModel> getTopRatedMovies(){
        return moviesRepository.findTop10ByOrderByRatingDesc();
    }

    
}
