package com.example.ems_backend.service;

import com.example.ems_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee (EmployeeDto employeeDto);
    EmployeeDto getEmployeeById (Integer empId);
    List<EmployeeDto> getAllEmployees ();
    EmployeeDto updateEmployee (Integer empId, EmployeeDto updatedEmployeeDto);
    void deleteEmployee (Integer empId);
}
