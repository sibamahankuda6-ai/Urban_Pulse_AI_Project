package com.urbanpulse.service;

import com.urbanpulse.entity.Complaint;
import com.urbanpulse.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint saveComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
    @Override
    public void deleteComplaint(Long id) {

        complaintRepository.deleteById(id);

    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }




    @Override
    public Complaint updateComplaint(Long id, Complaint complaint) {

        Complaint existing = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        existing.setStatus(complaint.getStatus());
        existing.setAssignedWorker(complaint.getAssignedWorker());
        existing.setResolutionNote(complaint.getResolutionNote());

        return complaintRepository.save(existing);

    }
}