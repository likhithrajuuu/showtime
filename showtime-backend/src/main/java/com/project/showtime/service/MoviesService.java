package com.project.showtime.service;

import com.project.showtime.exception.CrudOperationException;
import com.project.showtime.exception.CrudValidationException;
import com.project.showtime.model.MoviesModel;
import com.project.showtime.repository.MoviesRepository;
import jakarta.validation.ConstraintViolation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.validation.Validator;

import java.util.List;
import java.util.Set;

@Service

public class MoviesService {
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

    public List<MoviesModel> getAllMovies() throws CrudOperationException{
        try{
            return moviesRepository.findAll();
        }catch (Exception e) {
            throw CrudOperationException.asFailedGetOperation(MoviesModel.class, e);
        }
    }

    public MoviesModel addMovie(MoviesModel movie) throws CrudOperationException{
        checkForNull(movie);
        validate(movie);
        return saveMovie(movie);
    }
}
