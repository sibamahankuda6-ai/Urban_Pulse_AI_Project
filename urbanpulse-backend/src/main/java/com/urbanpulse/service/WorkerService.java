package com.urbanpulse.service;

import com.urbanpulse.entity.Worker;
import java.util.List;

public interface WorkerService {

    Worker saveWorker(Worker worker);

    List<Worker> getAllWorkers();
    Worker updateWorker(Long id, Worker worker);
    void deleteWorker(Long id);

}
