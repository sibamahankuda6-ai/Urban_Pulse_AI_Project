package com.urbanpulse.service;

import com.urbanpulse.entity.Notification;
import com.urbanpulse.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl
        implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification saveNotification(
            Notification notification) {

        return notificationRepository.save(
                notification);
    }

    @Override
    public List<Notification> getAllNotifications() {

        return notificationRepository.findAll();
    }

    @Override
    public void deleteNotification(Long id) {

        notificationRepository.deleteById(id);
    }
}
