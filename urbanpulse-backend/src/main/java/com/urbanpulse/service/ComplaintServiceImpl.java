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
                .orElseThrow(() -> new RuntimeException("Complaint not found with ID: " + id));
    }

    @Override
    public List<Complaint> getComplaintsByCitizen(String email) {
        return complaintRepository.findByCitizenEmail(email);
    }

    @Override
    public List<Complaint> getComplaintsByWorker(String worker) {
        return complaintRepository.findByAssignedWorker(worker);
    }

    @Override
    public Complaint updateComplaint(Long id, Complaint complaint) {

        Complaint existing = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with ID: " + id));

        if (complaint.getStatus() != null) {
            existing.setStatus(complaint.getStatus());
        }
        if (complaint.getAssignedWorker() != null) {
            existing.setAssignedWorker(complaint.getAssignedWorker());
        }
        if (complaint.getResolutionNote() != null) {
            existing.setResolutionNote(complaint.getResolutionNote());
        }
        if (complaint.getDescription() != null) {
            existing.setDescription(complaint.getDescription());
        }
        if (complaint.getLocation() != null) {
            existing.setLocation(complaint.getLocation());
        }
        if (complaint.getPriority() != null) {
            existing.setPriority(complaint.getPriority());
        }
        if (complaint.getImageUrl() != null) {
            existing.setImageUrl(complaint.getImageUrl());
        }

        return complaintRepository.save(existing);
    }
}