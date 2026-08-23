package com.urbanpulse.controller;

import com.urbanpulse.entity.Worker;
import com.urbanpulse.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin("*")
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    @PostMapping
    public Worker saveWorker(
            @RequestBody Worker worker) {

        return workerService.saveWorker(worker);
    }

    @GetMapping
    public List<Worker> getAllWorkers() {

        return workerService.getAllWorkers();
    }
    @PutMapping("/{id}")
    public Worker updateWorker(
            @PathVariable Long id,
            @RequestBody Worker worker) {

        return workerService.updateWorker(id, worker);
    }
    @DeleteMapping("/{id}")
    public String deleteWorker(
            @PathVariable Long id) {

        workerService.deleteWorker(id);

        return "Worker Deleted Successfully";
    }
}
