package com.example.eventfireback.service;

import com.example.eventfireback.model.Booking;
import com.example.eventfireback.model.Event;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface EventService {
    public abstract Page<Event> getAllEventsPaged(int pageNum);
    public abstract List<Event> getAllEvents();
    public abstract Event getEventById(long eventId);
    public abstract Event saveEvent(Event event);
    public abstract Event deleteEventById(long eventId);
    public abstract List<Event> getAllEventsByEventLocationAndEventTime(LocalDate eventLocation, String eventTime);
    List<Event> getRandomBookingsByCount(int count);
}
