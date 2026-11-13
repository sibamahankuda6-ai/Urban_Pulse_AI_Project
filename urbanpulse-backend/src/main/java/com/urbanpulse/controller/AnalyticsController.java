package com.urbanpulse.controller;

import com.urbanpulse.repository.ComplaintRepository;
import com.urbanpulse.repository.DepartmentRepository;
import com.urbanpulse.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private com.urbanpulse.repository.UserRepository userRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboardAnalytics() {

        Map<String, Object> data =
                new HashMap<>();

        data.put(
                "totalComplaints",
                complaintRepository.count());

        data.put(
                "totalWorkers",
                workerRepository.count());

        data.put(
                "totalDepartments",
                departmentRepository.count());

        data.put(
                "totalUsers",
                userRepository.count());

        data.put(
                "pendingComplaints",
                complaintRepository.countByStatus(
                        "Pending"));

        data.put(
                "inProgressComplaints",
                complaintRepository.countByStatus(
                        "In Progress"));

        data.put(
                "resolvedComplaints",
                complaintRepository.countByStatus(
                        "Resolved"));

        return data;
    }
}
