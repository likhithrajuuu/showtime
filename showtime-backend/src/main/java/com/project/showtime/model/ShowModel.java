package com.project.showtime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "showtime", name = "shows")
public class ShowModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_id")
    private Long showId;

    @Column(name = "show_time", nullable = false)
    private LocalTime showTime;

    @Column(name = "format", nullable = false, length = 50)
    private String format;

    @Column(name = "ticket_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal ticketPrice;

    @Column(name = "is_active")
    private boolean isActive = true;

    // Many shows can be on one show_date
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_date_id", nullable = false)
    private ShowDateModel showDate;

    // Many shows can be in one screen
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id", nullable = false)
    private ScreenModel screen;

    // One show has many individual show_seats
    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShowSeatModel> showSeats;

    // One show can have many bookings
    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingModel> bookings;
}