package com.example.eventfireback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue
    @Column(name="booking_id")
    private long bookingId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_event_id" )
    Event event;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    User user;

    public Booking(){}

    public long getBookingId() {
        return bookingId;
    }

    public void setBookingId(long bookingId) {
        this.bookingId = bookingId;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
