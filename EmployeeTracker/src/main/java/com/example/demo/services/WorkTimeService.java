package com.example.demo.services;


import com.example.demo.model.Employee;
import com.example.demo.model.WorkTime;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.WorkTimeRepository;
import org.hibernate.procedure.ParameterStrategyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WorkTimeService {

    @Autowired
    private WorkTimeRepository workTimeRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public WorkTime updateWorkTime(WorkTime old, String str) throws ParseException {
        Date date = new SimpleDateFormat("HH:mm").parse(str);
        old.setEndTime(date);
        return old;
    }

    public List<Employee> findEmployees(String str) throws ParseException {
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(str);
        List<WorkTime> list = workTimeRepository.findByDate(date);
        List<Employee> result = new ArrayList<>();
        for (WorkTime l : list ) {
            result.add(l.getEmployee());
        }
        return result;
    }

    public void saveEmployee(Employee empl, String d, String st, String et) throws ParseException {
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(d);
        Date startTime = new SimpleDateFormat("HH:mm").parse(st);
        Date endTime = new SimpleDateFormat("HH:mm").parse(et);

        workTimeRepository.save(new WorkTime(empl, date, startTime, endTime));
    }

}
