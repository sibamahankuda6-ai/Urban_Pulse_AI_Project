package com.urbanpulse.service;

import com.urbanpulse.entity.Department;
import java.util.List;

public interface DepartmentService {

    Department saveDepartment(Department department);

    List<Department> getAllDepartments();

    Department updateDepartment(Long id,
                                Department department);

    void deleteDepartment(Long id);
}
