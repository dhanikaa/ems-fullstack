package com.example.ems_backend.controller;

import com.example.ems_backend.dto.EmployeeDto;
import com.example.ems_backend.entity.Employee;
import com.example.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/employees")
public class EmployeeController {

    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{empId}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Integer empId) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(empId);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employeeDtoList = employeeService.getAllEmployees();
        return new ResponseEntity<>(employeeDtoList, HttpStatus.OK);
    }

    @PutMapping(value = "/{empId}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Integer empId, @RequestBody EmployeeDto updatedEmployeeDto) {
        EmployeeDto employeeDto = employeeService.updateEmployee(empId, updatedEmployeeDto);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{empId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Integer empId) {
        employeeService.deleteEmployee(empId);
        return ResponseEntity.ok("Employee Deleted Successfully");
    }
}
