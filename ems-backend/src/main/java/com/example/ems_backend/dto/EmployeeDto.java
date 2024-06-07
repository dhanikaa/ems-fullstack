package com.example.ems_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EmployeeDto {
    private Integer empId;
    private String firstName;
    private String lastName;
    private String email;
}
