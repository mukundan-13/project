package com.rentwheelz.rentwheelz.service;

import com.rentwheelz.rentwheelz.model.Booking;
import com.rentwheelz.rentwheelz.model.Booking.Status;
import com.rentwheelz.rentwheelz.model.User;
import com.rentwheelz.rentwheelz.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class BookingNotificationService {

    @Autowired
    private BookingRepository bookingRepository;


    @Autowired
    private JavaMailSender mailSender;
    
    private static final Logger log = LoggerFactory.getLogger(BookingNotificationService.class);


    // Method to handle booking status update
    public void updateBookingStatusAndNotify(Long bookingId, String newStatus) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();

            // Convert String to Enum Status
            Booking.Status status = Booking.Status.valueOf(newStatus.toUpperCase());
            booking.setStatus(status); // Set the status as enum

            // Save the updated booking status
            bookingRepository.save(booking);

            // Fetch the user associated with this booking
            User user = booking.getUser(); // Accessing user directly
            sendBookingStatusEmail(user.getEmail(), booking);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }

    // Method to send email notification about the booking status
    public void sendBookingStatusEmail(String email, Booking booking) {
    	    if (email == null || email.trim().isEmpty()) {
    	        log.error("Email address is null or empty for booking ID: {}", booking.getId());
    	        System.out.println(booking.getId());
    	        throw new IllegalArgumentException("Email address cannot be null or empty");
    	    }

        String subject;
        String messageText;
        subject = "Booking Confirmed";
        messageText = "Your booking for vehicle has been confirmed. Thank you for choosing us!";
       

        // Create a simple mail message
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(messageText);

        // Send the email
        mailSender.send(message);
    }
    
    public void sendBookingStatusCancelled(String email, Booking booking) {
	    if (email == null || email.trim().isEmpty()) {
	        log.error("Email address is null or empty for booking ID: {}", booking.getId());
	        System.out.println(booking.getId());
	        throw new IllegalArgumentException("Email address cannot be null or empty");
	    }

    String subject;
    String messageText;
    subject = "Booking Cancelled";
    messageText = "Your booking for vehicle  has been cancelled. We apologize for the inconvenience.";
    

    // Create a simple mail message
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject(subject);
    message.setText(messageText);

    // Send the email
    mailSender.send(message);
}
    
   
    
}
