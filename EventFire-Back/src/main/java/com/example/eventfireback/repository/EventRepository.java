package com.example.eventfireback.repository;

import com.example.eventfireback.model.Booking;
import com.example.eventfireback.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByEventDateEqualsAndAndEventTimeEquals(LocalDate eventDate, String eventTime);
    @Query(value = "SELECT * FROM event ORDER BY RAND() LIMIT ?1", nativeQuery = true)
    List<Event> getRandomEventsByCount(int count);

    @Query(value = "SELECT * FROM event where event_id = ?1", nativeQuery = true)
    Event getByEventId(long eventId);
}
