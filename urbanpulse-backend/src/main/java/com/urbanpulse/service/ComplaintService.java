package com.urbanpulse.service;

import com.urbanpulse.entity.Complaint;
import java.util.List;

public interface ComplaintService {

    Complaint saveComplaint(Complaint complaint);

    List<Complaint> getAllComplaints();

    Complaint getComplaintById(Long id);

    Complaint updateComplaint(Long id, Complaint complaint);

    void deleteComplaint(Long id);
}