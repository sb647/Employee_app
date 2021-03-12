package com.example.demo.repository;

import com.example.demo.model.Employee;
import com.example.demo.model.WorkTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface WorkTimeRepository extends JpaRepository<WorkTime, Long> {


    public WorkTime findByid(Long id);

    public List<WorkTime> findByDate(Date date);

    public List<WorkTime> findByEmployee(Employee employee);

    public List<WorkTime> findByEmployeeVerified(boolean verified);

    public boolean existsByDateAndEmployee(Date date, Employee employee);

    public List<WorkTime> findByDateAndEmployee(Date date, Employee employee);

    public void deleteAllByEmployee(Employee employee);



}
