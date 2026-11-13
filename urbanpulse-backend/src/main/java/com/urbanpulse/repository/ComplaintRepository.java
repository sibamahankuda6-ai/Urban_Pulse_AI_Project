package com.urbanpulse.repository;

import com.urbanpulse.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {
    long countByStatus(String status);
    java.util.List<Complaint> findByCitizenEmail(String citizenEmail);
    java.util.List<Complaint> findByAssignedWorker(String assignedWorker);
}
