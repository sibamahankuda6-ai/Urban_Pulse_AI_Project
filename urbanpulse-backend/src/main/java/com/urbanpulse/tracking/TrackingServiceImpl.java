package com.urbanpulse.tracking;

import com.urbanpulse.entity.Complaint;
import com.urbanpulse.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrackingServiceImpl
        implements TrackingService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint trackComplaint(Long id) {

        System.out.println("Tracking Request ID = " + id);

        Complaint complaint = complaintRepository.findById(id).orElse(null);

        System.out.println("Complaint = " + complaint);

        return complaint;
    }

}
