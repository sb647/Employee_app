package com.example.demo.repository;

import com.example.demo.mailService.ConfirmationToken;
import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<ConfirmationToken, Long> {

    ConfirmationToken findByConfirmationToken(String confirmationToken);

    ConfirmationToken findByEmployee(Employee employee);

}
