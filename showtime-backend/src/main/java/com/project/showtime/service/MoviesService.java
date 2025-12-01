package com.project.showtime.service;

import com.project.showtime.exception.CrudOperationException;
import com.project.showtime.exception.CrudValidationException;
import com.project.showtime.model.MoviesModel;
import com.project.showtime.repository.MoviesRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

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

    private void checkForNull(MoviesModel model) {
        if (model == null) {
            throw CrudOperationException.asNullEntity(MoviesModel.class);
        }
    }

    private void checkId(Long id) throws CrudValidationException {
        if (id <= 0) {
            throw CrudValidationException.asInvalidEntityId(MoviesModel.class);
        }
    }

    private void validate(MoviesModel model) throws CrudValidationException {
        Set<ConstraintViolation<MoviesModel>> violations = validator.validate(model);
        if (!violations.isEmpty()) {
            throw CrudValidationException.asFailedValidationOperation(MoviesModel.class, violations);
        }
    }

    private MoviesModel saveMovie(MoviesModel movie) throws CrudOperationException {
        try {
            boolean isNew = (movie.getMovieId() == null);
            MoviesModel savedModel = moviesRepository.save(movie);
            log.info((isNew ? "Added" : "Updated") + " MoviesModel with ID: " + savedModel.getMovieId());
            return savedModel;
        } catch (Exception e) {
            throw CrudOperationException.asFailedAddOperation(MoviesModel.class, e);
        }
    }

    public List<MoviesModel> getAllMovies() throws CrudOperationException {
        try {
            return moviesRepository.findAll();
        } catch (Exception e) {
            throw CrudOperationException.asFailedGetOperation(MoviesModel.class, e);
        }
    }

    public MoviesModel addMovie(MoviesModel movie) throws CrudOperationException {
        checkForNull(movie);
        validate(movie);
        return saveMovie(movie);
    }

    @Cacheable(value = "movies", key = "#id")
    public MoviesModel getMovieById(Long id) throws CrudOperationException {
        checkId(id);
        MoviesModel movie = moviesRepository.findById(id).orElse(null);
        if (movie == null) {
            log.info("Could not find MoviesModel with ID: " + id);
            throw CrudValidationException.asMissingEntity(MoviesModel.class, id);
        }
        return movie;
    }

    public MoviesModel updateMovie(MoviesModel movie) throws CrudOperationException {
        checkForNull(movie);
        validate(movie);
        return saveMovie(movie);
    }

    public void deleteMovie(Long id) throws CrudOperationException {
        checkId(id);
        moviesRepository.deleteById(id);
    }

    public Optional<MoviesModel> updateMovie(Long id, MoviesModel updated) throws CrudOperationException {
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

    public List<MoviesModel> getTopRatedMovies() {
        return moviesRepository.findTop10ByOrderByRatingDesc();
    }

    private List<MoviesModel> filterMovies(List<String> languages, List<String> genres, List<String> formats) throws CrudOperationException {
        try {
            List<MoviesModel> movies = moviesRepository.findAll();

            if (languages != null && !languages.isEmpty()) {
                movies = movies.stream()
                        .filter(m -> languages.stream().anyMatch(lang -> lang.equalsIgnoreCase(m.getLanguage())))
                        .toList();
            }

            if (genres != null && !genres.isEmpty()) {
                movies = movies.stream()
                        .filter(m -> genres.stream().anyMatch(genre -> genre.equalsIgnoreCase(m.getGenre())))
                        .toList();
            }

            if (formats != null && !formats.isEmpty()) {
                movies = movies.stream()
                        .filter(m -> formats.stream().anyMatch(format -> format.equalsIgnoreCase(m.getFormat())))
                        .toList();
            }

            return movies;
        } catch (Exception e) {
            throw CrudOperationException.asFailedGetOperation(MoviesModel.class, e);
        }
    }

    public List<MoviesModel> filterByLanguages(List<String> languages) throws CrudOperationException {
        return filterMovies(languages, null, null);
    }

    public List<MoviesModel> filterByGenres(List<String> genres) throws CrudOperationException {
        return filterMovies(null, genres, null);
    }

    public List<MoviesModel> filterByFormats(List<String> formats) throws CrudOperationException {
        return filterMovies(null, null, formats);
    }

    public List<MoviesModel> filterByLanguagesAndGenres(List<String> languages, List<String> genres) throws CrudOperationException {
        return filterMovies(languages, genres, null);
    }

    public List<MoviesModel> filterByGenresAndFormats(List<String> genres, List<String> formats) throws CrudOperationException {
        return filterMovies(null, genres, formats);
    }

    public List<MoviesModel> filterByLanguagesAndFormats(List<String> languages, List<String> formats) throws CrudOperationException {
        return filterMovies(languages, null, formats);
    }

    public List<MoviesModel> filterByAll(List<String> languages, List<String> genres, List<String> formats) throws CrudOperationException {
        return filterMovies(languages, genres, formats);
    }
}