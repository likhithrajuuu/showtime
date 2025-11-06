package com.project.showtime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "showtime", name = "show_dates")
public class ShowDateModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_date_id")
    private Long showDateId;

    @Column(name = "show_date", nullable = false)
    private LocalDate showDate;

    // Many show dates can be for one movie
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private MoviesModel movie;

    // One show date can have many shows
    @OneToMany(mappedBy = "showDate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShowModel> shows;
}