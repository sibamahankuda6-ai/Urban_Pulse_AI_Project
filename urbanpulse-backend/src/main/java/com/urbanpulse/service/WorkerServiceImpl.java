package com.urbanpulse.service;

import com.urbanpulse.entity.Worker;
import com.urbanpulse.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerServiceImpl
        implements WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Override
    public Worker saveWorker(Worker worker) {
        return workerRepository.save(worker);
    }

    @Override
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }
    @Override
    public Worker updateWorker(Long id, Worker worker) {

        Worker existing = workerRepository
                .findById(id)
                .orElseThrow();

        existing.setName(worker.getName());
        existing.setDepartment(worker.getDepartment());
        existing.setEmail(worker.getEmail());
        existing.setPhone(worker.getPhone());
        existing.setStatus(worker.getStatus());

        return workerRepository.save(existing);
    }
    @Override
    public void deleteWorker(Long id) {

        workerRepository.deleteById(id);

    }
}
