package com.example.demo.controller;

import com.example.demo.model.ERole;
import com.example.demo.model.Employee;
import com.example.demo.model.Role;
import com.example.demo.model.WorkTime;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.TokenRepository;
import com.example.demo.repository.WorkTimeRepository;
import com.example.demo.services.WorkTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    private TokenRepository confirmationTokenRepository;


    @PostMapping("api/role/worktime")
    @PreAuthorize("hasRole('USER')")
    public void storeNewStartTime(@PathVariable("id") Long id, @RequestBody TimeRequest timeRequest) throws ParseException{
        Employee emp = emplRepository.findByid(id);
        workTimeService.saveEmployee(emp, timeRequest.getDate(), timeRequest.getStartTime(), timeRequest.getEndTime());
    }

    @DeleteMapping("api/role/worktime/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEmployee(@PathVariable("id")Long id) {
        Employee emp = emplRepository.findByid(id);
        confirmationTokenRepository.delete(confirmationTokenRepository.findByEmployee(emp));
        emplRepository.delete(emp);

    }

    @PostMapping("api/role/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void setAsAdmin(@PathVariable("id")Long id) {
        Employee emp = emplRepository.findByid(id);
        Set<Role> roles = new HashSet<>();
        roles.addAll(emp.getRoles());
        roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
        emp.setRoles(roles);
        emplRepository.save(emp);
    }

    @GetMapping("api/role/worktime/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<WorkTime> getWorkTime(@PathVariable("id") Long id) {
        return workTimeRepository.findByEmployee(emplRepository.findByid(id));
    }

    @GetMapping("api/role/today/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public boolean checkIfStartInserted(@PathVariable("id") Long id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        return workTimeRepository.existsByDateAndEmployee(date,emplRepository.findByid(id));
    }

    @GetMapping("api/role/endToday/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public boolean checkIfEndInserted(@PathVariable("id") Long id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        return workTimeRepository.findByDateAndEmployee(date,emplRepository.findByid(id)).get(0).getEndTime() != null;
    }

    @PostMapping("api/role/start/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void storeStartingTime(@PathVariable("id") Long id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        SimpleDateFormat timeFormatter= new SimpleDateFormat("HH:mm");
        Date time = new Date(System.currentTimeMillis());

        WorkTime wt = new WorkTime(emplRepository.findByid(id), date, time, null);
        workTimeRepository.save(wt);

    }

    @PostMapping("api/role/end/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
    public List<WorkTime> findAll() {
       return workTimeRepository.findAll();
    }


}
