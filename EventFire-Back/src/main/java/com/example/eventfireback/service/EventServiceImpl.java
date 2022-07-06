package com.example.eventfireback.service;

import com.example.eventfireback.model.Booking;
import com.example.eventfireback.model.Event;
import com.example.eventfireback.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @Override
    public Page<Event> getAllEventsPaged(int pageNum){
        return eventRepository.findAll(PageRequest.of(pageNum,5, Sort.by("eventDate")));
    }

    @Override
    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(long eventId){
        return eventRepository.getById(eventId);
    }

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event deleteEventById(long eventId){
        Event event = this.getEventById(eventId);

        eventRepository.deleteById(eventId);
        return event;
    }

    @Override
    public List<Event> getAllEventsByEventLocationAndEventTime(LocalDate eventDate, String eventTime){
        return eventRepository.findAllByEventDateEqualsAndAndEventTimeEquals(eventDate, eventTime);
    }
    @Override
    public List<Event> getRandomBookingsByCount(int count) {
        List<Event> randomEventsByCount = eventRepository.getRandomEventsByCount(count);
        System.out.println(randomEventsByCount.size());

        return randomEventsByCount;
    }
}
