package com.project.showtime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "showtime", name = "show_seats")
public class ShowSeatModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_seat_id")
    private Long showSeatId;

    @Column(name = "booked")
    private boolean isBooked = false;

    // Many show_seats belong to one show
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id", nullable = false)
    private ShowModel show;

    // Many show_seats refer to one seat_layout position
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_layout_id", nullable = false)
    private SeatLayoutModel seatLayout;
}