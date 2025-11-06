package com.project.showtime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "showtime", name = "seat_layout")
public class SeatLayoutModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_layout_id")
    private Long seatLayoutId;

    @Column(name = "seat_number", length = 20)
    private String seatNumber;

    @Column(name = "seat_type", length = 50)
    private String seatType;

    // Many seat layouts belong to one screen
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id", nullable = false)
    private ScreenModel screen;
}