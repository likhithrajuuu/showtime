package com.project.showtime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "showtime", name = "booked_seats")
public class BookedSeatModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_seat_id")
    private Long bookingSeatId;

    // Many "booked seats" records belong to one booking
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private BookingModel booking;

    // Each "booked seat" record refers to one specific seat in the layout
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="seat_layout_id", nullable = false)
    private SeatLayoutModel seatLayout;
}