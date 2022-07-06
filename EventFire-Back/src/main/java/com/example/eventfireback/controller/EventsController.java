package com.example.eventfireback.controller;

import com.example.eventfireback.model.Booking;
import com.example.eventfireback.model.Event;
import com.example.eventfireback.model.Response;
import com.example.eventfireback.service.EventServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/events")
public class EventsController {
    private final EventServiceImpl eventService;

    public EventsController(@Autowired EventServiceImpl eventService) {
        this.eventService = eventService;
    }

    @GetMapping()
    public ResponseEntity<HttpStatus> getAllEvents() {
        List<Event> events = this.eventService.getAllEvents();

        return new ResponseEntity(events, HttpStatus.OK);
    }

    @GetMapping("getRandomEventsByCount")
    public Response getRandomEventsByCount(@RequestParam int count){
        com.example.eventfireback.model.Response response = new com.example.eventfireback.model.Response();
        try {
            List<Event> events = this.eventService.getRandomBookingsByCount(count);

            response.setObject(events);
            response.setMessage("Random Events Successfully fetched");
            response.setStatus("SUCCESS");

        }catch (Exception e){
            response.setStatus("ERROR");
            response.setMessage(e.getMessage());
            response.setObject(e);
        }

        return response;
    }


    @GetMapping("/{event_id}")
    public ResponseEntity<HttpStatus> getEventById(@PathVariable("event_id") Long eventId) {
        Event event = this.eventService.getEventById(eventId);

        return new ResponseEntity(event, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<HttpStatus> createEvent(@RequestBody Event event) {
        Event savedEvent = this.eventService.saveEvent(event);

        return new ResponseEntity(savedEvent, HttpStatus.CREATED);
    }

    public ResponseEntity<HttpStatus> deleteEventById(@PathVariable("event_id") Long eventId) {
        Event deletedEvent = this.eventService.deleteEventById(eventId); // get deleted event

        return new ResponseEntity(deletedEvent, HttpStatus.OK);
    }
}
