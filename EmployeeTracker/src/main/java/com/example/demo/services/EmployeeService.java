package com.example.demo.services;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository emplRepository;

    public Employee updateEmployee(Employee oldEmployee, Employee updatedEmployee) {
        oldEmployee.setEmail(updatedEmployee.getEmail());
        oldEmployee.setName(updatedEmployee.getName());
        oldEmployee.setSurname(updatedEmployee.getSurname());
        oldEmployee.setImage(updatedEmployee.getImage());
        oldEmployee.setPosition(updatedEmployee.getPosition());

        return oldEmployee;
    }

    public void storeImage(String email, MultipartFile file) throws IOException {
        Employee emp = emplRepository.findByEmail(email).get();
        emplRepository.delete(emp);
        byte[] byteObjects = file.getBytes();
        emp.setImage(byteObjects);
        emplRepository.save(emp);

    }


}
