package com.project.showtime.controller;

import com.project.showtime.exception.CrudOperationException;
import com.project.showtime.exception.CrudValidationException;
import com.project.showtime.model.MoviesModel;
import com.project.showtime.service.MoviesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MoviesControllerTest {

    @Mock
    private MoviesService moviesService;

    @InjectMocks
    private MoviesController moviesController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // ----------------防治方法-------------
    // getAllMovies()
    // -----------------------------
    @Test
    void testGetAllMoviesSuccess() throws Exception {
        List<MoviesModel> movies = Arrays.asList(new MoviesModel(), new MoviesModel());
        when(moviesService.getAllMovies()).thenReturn(movies);

        ResponseEntity<?> response = moviesController.getAllMovies();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testGetAllMoviesCrudException() throws Exception {
        when(moviesService.getAllMovies())
                .thenThrow(new CrudOperationException( "DB error"));

        ResponseEntity<?> response = moviesController.getAllMovies();

        assertEquals(400, response.getStatusCode().value());
        assertEquals("DB error", response.getBody());
    }

    @Test
    void testGetAllMoviesUnexpectedException() throws Exception {
        when(moviesService.getAllMovies())
                .thenThrow(new RuntimeException("Server error"));

        ResponseEntity<?> response = moviesController.getAllMovies();

        assertEquals(500, response.getStatusCode().value());
        assertEquals("Server error", response.getBody());
    }

    // -----------------------------
    // addMovie()
    // -----------------------------
    @Test
    void testAddMovieSuccess() throws Exception {
        MoviesModel movie = new MoviesModel();
        when(moviesService.addMovie(movie)).thenReturn(movie);

        ResponseEntity<?> response = moviesController.addMovie(movie);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movie, response.getBody());
    }

    @Test
    void testAddMovieValidationException() throws Exception {
        MoviesModel movie = new MoviesModel();
        when(moviesService.addMovie(movie))
                .thenThrow(new CrudValidationException("Invalid movie data"));

        ResponseEntity<?> response = moviesController.addMovie(movie);
        assertEquals(400, response.getStatusCode().value());
        assertEquals("Invalid movie data", response.getBody());
    }

    @Test
    void testAddMovieUnexpectedException() throws Exception {
        MoviesModel movie = new MoviesModel();
        when(moviesService.addMovie(movie))
                .thenThrow(new RuntimeException("Server error"));

        ResponseEntity<?> response = moviesController.addMovie(movie);

        assertEquals(500, response.getStatusCode().value());
        assertEquals("Server error", response.getBody());
    }

    // -----------------------------
    // getMovieById()
    // -----------------------------
    @Test
    void testGetMovieByIdSuccess() throws Exception {
        MoviesModel movie = new MoviesModel();
        when(moviesService.getMovieById(1L)).thenReturn(movie);

        ResponseEntity<?> response = moviesController.getMovieById(1L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movie, response.getBody());
    }

    @Test
    void testGetMovieByIdException() throws Exception {
        when(moviesService.getMovieById(1L))
                .thenThrow(new CrudOperationException("Not found"));

        ResponseEntity<?> response = moviesController.getMovieById(1L);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Not found", response.getBody());
    }

    @Test
    void testGetMovieByIdUnexpectedException() throws Exception {
        when(moviesService.getMovieById(1L))
                .thenThrow(new RuntimeException("Server error"));

        ResponseEntity<?> response = moviesController.getMovieById(1L);

        assertEquals(500, response.getStatusCode().value());
        assertEquals("Server error", response.getBody());
    }

    // -----------------------------
    // getTopRatedMovies()
    // -----------------------------
    @Test
    void testGetTopRatedMoviesSuccess() throws Exception {
        List<MoviesModel> movies = Collections.singletonList(new MoviesModel());
        when(moviesService.getTopRatedMovies()).thenReturn(movies);

        ResponseEntity<?> response = moviesController.getTopRatedMovies();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testGetTopRatedMoviesException() throws Exception {
        when(moviesService.getTopRatedMovies())
                .thenThrow(new CrudValidationException("Error"));

        ResponseEntity<?> response = moviesController.getTopRatedMovies();

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Error", response.getBody());
    }

    @Test
    void testGetTopRatedMoviesUnexpected() throws Exception {
        when(moviesService.getTopRatedMovies())
                .thenThrow(new RuntimeException("Server error"));

        ResponseEntity<?> response = moviesController.getTopRatedMovies();

        assertEquals(500, response.getStatusCode().value());
        assertEquals("Server error", response.getBody());
    }

    // -----------------------------
    // filterMovies()
    // -----------------------------
    @Test
    void testFilterMoviesSuccess() throws Exception {
        List<MoviesModel> movies = Arrays.asList(new MoviesModel());
        when(moviesService.filterByAll(null, null, null)).thenReturn(movies);

        ResponseEntity<?> response = moviesController.filterMovies(null, null, null);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testFilterMoviesException() throws Exception {
        when(moviesService.filterByAll(null, null, null))
                .thenThrow(new CrudOperationException("Invalid filter"));

        ResponseEntity<?> response = moviesController.filterMovies(null, null, null);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Invalid filter", response.getBody());
    }

    @Test
    void testFilterMoviesUnexpectedException() throws Exception {
        when(moviesService.filterByAll(null, null, null))
                .thenThrow(new RuntimeException("Server error"));

        ResponseEntity<?> response = moviesController.filterMovies(null, null, null);

        assertEquals(500, response.getStatusCode().value());
        assertEquals("Server error", response.getBody());
    }

    // -----------------------------
    // Individual Filter Tests
    // -----------------------------
    @Test
    void testFilterByLanguagesSuccess() throws Exception {
        List<String> langs = Arrays.asList("English");
        List<MoviesModel> movies = List.of(new MoviesModel());

        when(moviesService.filterByLanguages(langs)).thenReturn(movies);

        ResponseEntity<?> response = moviesController.filterByLanguages(langs);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testFilterByGenresSuccess() throws Exception {
        List<String> genres = Arrays.asList("Action");
        List<MoviesModel> movies = List.of(new MoviesModel());

        when(moviesService.filterByGenres(genres)).thenReturn(movies);

        ResponseEntity<?> response = moviesController.filterByGenres(genres);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testFilterByFormatsSuccess() throws Exception {
        List<String> formats = Arrays.asList("2D");
        List<MoviesModel> movies = List.of(new MoviesModel());

        when(moviesService.filterByFormats(formats)).thenReturn(movies);

        ResponseEntity<?> response = moviesController.filterByFormats(formats);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testFilterByLanguagesAndGenresSuccess() throws Exception {
        List<String> langs = Arrays.asList("English");
        List<String> genres = Arrays.asList("Comedy");
        List<MoviesModel> movies = List.of(new MoviesModel());

        when(moviesService.filterByLanguagesAndGenres(langs, genres))
                .thenReturn(movies);

        ResponseEntity<?> response =
                moviesController.filterByLanguagesAndGenres(langs, genres);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testFilterByGenresAndFormatsSuccess() throws Exception {
        List<String> genres = Arrays.asList("Action");
        List<String> formats = Arrays.asList("IMAX");
        List<MoviesModel> movies = List.of(new MoviesModel());

        when(moviesService.filterByGenresAndFormats(genres, formats))
                .thenReturn(movies);

        ResponseEntity<?> response =
                moviesController.filterByGenresAndFormats(genres, formats);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }

    @Test
    void testFilterByLanguagesAndFormatsSuccess() throws Exception {
        List<String> langs = Arrays.asList("English");
        List<String> formats = Arrays.asList("3D");
        List<MoviesModel> movies = List.of(new MoviesModel());

        when(moviesService.filterByLanguagesAndFormats(langs, formats))
                .thenReturn(movies);

        ResponseEntity<?> response =
                moviesController.filterByLanguagesAndFormats(langs, formats);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(movies, response.getBody());
    }
}