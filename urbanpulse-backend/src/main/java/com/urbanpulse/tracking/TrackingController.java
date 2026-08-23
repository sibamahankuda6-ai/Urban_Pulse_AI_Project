package com.urbanpulse.tracking;

import com.urbanpulse.entity.Complaint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tracking")
@CrossOrigin("*")
public class TrackingController {

    @Autowired
    private TrackingService trackingService;

    @GetMapping("/{id}")
    public Complaint trackComplaint(
            @PathVariable Long id) {

        return trackingService.trackComplaint(id);
    }
}
