package com.urbanpulse.controller;

import com.urbanpulse.entity.Notification;
import com.urbanpulse.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Notification saveNotification(
            @RequestBody Notification notification) {

        return notificationService.saveNotification(
                notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {

        return notificationService.getAllNotifications();
    }

    @DeleteMapping("/{id}")
    public String deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return "Notification Deleted Successfully";
    }
}
