package com.urbanpulse.service;

import com.urbanpulse.entity.Notification;
import java.util.List;

public interface NotificationService {

    Notification saveNotification(
            Notification notification);

    List<Notification> getAllNotifications();

    void deleteNotification(Long id);
}
