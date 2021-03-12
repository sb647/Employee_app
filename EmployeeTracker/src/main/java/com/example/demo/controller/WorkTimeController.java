package com.example.demo.controller;

import com.example.demo.model.ERole;
import com.example.demo.model.Employee;
import com.example.demo.model.Role;
import com.example.demo.model.WorkTime;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.WorkTimeRepository;
import com.example.demo.services.WorkTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class WorkTimeController {

    @Autowired
    private WorkTimeRepository workTimeRepository;

    @Autowired
    private EmployeeRepository emplRepository;

    @Autowired
    private WorkTimeService workTimeService;

    @Autowired
    RoleRepository roleRepository;


    @PostMapping("api/role/worktime")
    public void storeNewStartTime(@PathVariable("id") Long id, @RequestBody TimeRequest timeRequest) throws ParseException{
        Employee emp = emplRepository.findByid(id);
        workTimeService.saveEmployee(emp, timeRequest.getDate(), timeRequest.getStartTime(), timeRequest.getEndTime());
    }

/*
    @PutMapping("worktime/{id}")
    public void storeEndTime(@PathVariable("id") Long id){
        LocalDateTime endTime = LocalDateTime.now();
        WorkTime wt = workTimeRepository.findByid(new WorkTimeId(id, LocalDate.now()));
        if (wt == null) throw new NoSuchElementException();
        workTimeRepository.save(workTimeService.updateWorkTime(wt));
    }
*/

    @DeleteMapping("api/role/worktime/{id}")
    public void deleteEmployee(@PathVariable("id")Long id) {
        Employee emp = emplRepository.findByid(id);
        emplRepository.delete(emp);

    }

    @PostMapping("api/role/admin/{id}")
    public void setAsAdmin(@PathVariable("id")Long id) {
        Employee emp = emplRepository.findByid(id);
        Set<Role> roles = new HashSet<>();
        roles.addAll(emp.getRoles());
        roles.add(roleRepository.findByName(ERole.ADMIN).get());
        emp.setRoles(roles);
        emplRepository.save(emp);
    }

    @GetMapping("api/role/worktime/{id}")
    public List<WorkTime> getWorkTime(@PathVariable("id") Long id) {
        return workTimeRepository.findByEmployee(emplRepository.findByid(id));
    }

    @GetMapping("api/role/today/{id}")
    public boolean checkIfStartInserted(@PathVariable("id") Long id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        return workTimeRepository.existsByDateAndEmployee(date,emplRepository.findByid(id));
    }

    @GetMapping("api/role/endToday/{id}")
    public boolean checkIfEndInserted(@PathVariable("id") Long id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        return workTimeRepository.findByDateAndEmployee(date,emplRepository.findByid(id)).get(0).getEndTime() != null;
    }

    @PostMapping("api/role/start/{id}")
    public void storeStartingTime(@PathVariable("id") Long id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        SimpleDateFormat timeFormatter= new SimpleDateFormat("HH:mm");
        Date time = new Date(System.currentTimeMillis());

        WorkTime wt = new WorkTime(emplRepository.findByid(id), date, time, null);
        workTimeRepository.save(wt);

    }

    @PostMapping("api/role/end/{id}")
    public void storeEndingTime(@PathVariable("id") Long id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        SimpleDateFormat timeFormatter= new SimpleDateFormat("HH:mm");
        Date time = new Date(System.currentTimeMillis());

        WorkTime wt = workTimeRepository.findByDateAndEmployee(date, emplRepository.findByid(id)).get(0);
        wt.setEndTime(time);
        workTimeRepository.save(wt);
    }


    @GetMapping("api/role/worktime")
    public List<WorkTime> findAll() {
       return workTimeRepository.findAll();
    }

    @GetMapping("api/role/worktime/date")
    public List<Employee> findEmployeesByDate(@ModelAttribute String date) throws ParseException{
      return workTimeService.findEmployees(date);

    }


}
