package com.urbanpulse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String issueType;

    private String location;

    @Column(length = 1000)
    private String description;

    private String priority;

    private String status;

    private String assignedWorker;

    private String resolutionNote;

    private String imageUrl;

    private String createdAt;
}
