package com.example.demo.repository;
import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    public Employee findByid(Long id);

    public List<Employee> findByVerified(boolean verified);

    public Optional<Employee> findByEmail(String email);

    public Optional<Employee> findByEmailAndVerified(String email, boolean verified);

    public boolean existsByEmail(String email);


}
