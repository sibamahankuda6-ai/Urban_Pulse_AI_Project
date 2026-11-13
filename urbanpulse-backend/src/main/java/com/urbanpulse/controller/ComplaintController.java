package com.urbanpulse.controller;

import com.urbanpulse.entity.Complaint;
import com.urbanpulse.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping
    public Complaint saveComplaint(@RequestBody Complaint complaint) {
        return complaintService.saveComplaint(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints(
            @RequestParam(required = false) String citizenEmail,
            @RequestParam(required = false) String worker) {
        if (citizenEmail != null && !citizenEmail.trim().isEmpty()) {
            return complaintService.getComplaintsByCitizen(citizenEmail.trim());
        }
        if (worker != null && !worker.trim().isEmpty()) {
            return complaintService.getComplaintsByWorker(worker.trim());
        }
        return complaintService.getAllComplaints();
    }

    @GetMapping("/user/{email}")
    public List<Complaint> getComplaintsByUser(@PathVariable String email) {
        return complaintService.getComplaintsByCitizen(email);
    }

    @GetMapping("/worker/{worker}")
    public List<Complaint> getComplaintsByWorker(@PathVariable String worker) {
        return complaintService.getComplaintsByWorker(worker);
    }

    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Long id) {
        return complaintService.getComplaintById(id);
    }

    @PutMapping("/{id}")
    public Complaint updateComplaint(
            @PathVariable Long id,
            @RequestBody Complaint complaint) {
        return complaintService.updateComplaint(id, complaint);
    }

    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return "Complaint Deleted Successfully";
    }
}