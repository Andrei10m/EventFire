package com.example.eventfireback.service;

import com.example.eventfireback.dto.CreateBookingDto;
import com.example.eventfireback.model.Booking;
import com.example.eventfireback.model.Event;
import com.example.eventfireback.model.User;
import com.example.eventfireback.repository.BookingRepository;
import com.example.eventfireback.repository.EventRepository;
import com.example.eventfireback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Autowired
    public BookingService( BookingRepository bookingRepository,EventRepository eventRepository,UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;

    }

    public List<Booking> getAllBookings() {
        List<Booking> bookings = new LinkedList();

        this.bookingRepository.findAll().iterator().forEachRemaining(booking -> bookings.add(booking));

        return bookings;
    }

    public Booking getBookingById(Long bookingId) {
        return this.bookingRepository.findById(bookingId).get();
    }

    public Booking createBooking(CreateBookingDto booking) {
        User user = userRepository.getByUserId(booking.getUserId());
        Event event = eventRepository.getByEventId(booking.getEventId());

        Booking booking1 = new Booking();
        booking1.setEvent(event);
        booking1.setUser(user);

        return this.bookingRepository.save(booking1);
    }

    public Booking deleteBookingById(Long bookingId) {
        Booking booking = this.getBookingById(bookingId);

        this.bookingRepository.deleteById(bookingId);

        return booking;
    }

    public List<Booking> getBookingsByUserId(int id) {
        return this.bookingRepository.findAllByUserId(id);
    }
}
