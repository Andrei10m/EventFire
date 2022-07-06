package com.example.eventfireback.controller;

import com.example.eventfireback.dto.CreateBookingDto;
import com.example.eventfireback.model.Booking;
import com.example.eventfireback.model.Response;
import com.example.eventfireback.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(@Autowired BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<HttpStatus> getAllBookings() {
        List<Booking> bookings = this.bookingService.getAllBookings();

        return new ResponseEntity(bookings, HttpStatus.OK);
    }

    @GetMapping("/getBookingsByUserId")
    public Response getBookingsByUserId(@RequestParam int userId){
        Response response = new Response();
        try{
            List<Booking> bookings = this.bookingService.getBookingsByUserId(userId);
            response.setObject(bookings);
            response.setStatus("SUCCESS");
            response.setMessage("Bookings Fetched successfully");
        }
        catch (Exception e){
            response.setObject(userId);
            response.setStatus("ERROR");
            response.setMessage(e.getMessage());
        }
        return response;
    }

    @GetMapping("/{booking_id}")
    public ResponseEntity<HttpStatus> getBookingById(@PathVariable("booking_id") Long bookingId) {
        Booking booking = this.bookingService.getBookingById(bookingId);

        return new ResponseEntity(booking, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<HttpStatus> createBooking(@RequestBody CreateBookingDto booking) {
        Booking savedBooking = this.bookingService.createBooking(booking);

        return new ResponseEntity(savedBooking, HttpStatus.CREATED);
    }

    @DeleteMapping("/{booking_id}")
    public ResponseEntity<HttpStatus> deleteBookingById(@PathVariable("booking_id") Long bookingId) {
        Booking deletedBooking = this.bookingService.deleteBookingById(bookingId);

        return new ResponseEntity(deletedBooking, HttpStatus.OK);
    }
}
