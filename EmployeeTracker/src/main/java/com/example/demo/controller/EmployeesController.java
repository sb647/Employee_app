package com.example.demo.controller;

import com.example.demo.mailService.ConfirmationToken;
import com.example.demo.mailService.EmailSenderService;
import com.example.demo.model.ERole;
import com.example.demo.model.Employee;
import com.example.demo.model.Role;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.TokenRepository;
import com.example.demo.repository.WorkTimeRepository;
import com.example.demo.response.JwtResponse;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.security.services.EmployeeDetails;
import com.example.demo.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import java.util.stream.Collectors;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class EmployeesController {

    @Autowired
    private EmployeeRepository emplRepository;

    @Autowired
    private EmployeeService emplService;

    @Autowired
    private WorkTimeRepository workTimeRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private TokenRepository confirmationTokenRepository;

    @Autowired
    private EmailSenderService emailSenderService;



    @PostMapping("/api/auth/login")
    public ResponseEntity<?> logIn(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        EmployeeDetails empDetails = (EmployeeDetails) authentication.getPrincipal();
        List<String> roles = empDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, empDetails.getId(), empDetails.getEmail(), roles));

    }

    @GetMapping("/api/role/img/{id}")
    //@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) {
        Employee emp = emplRepository.findByid(id);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(emp.getImage());
    }

    @GetMapping("/api/role/profile/{id}")
    //@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Employee> getProfileData(@PathVariable("id") Long id) {
        Employee emp = emplRepository.findByid(id);
        if(emp == null) throw new NoSuchElementException("Employee does not exist");
        return ResponseEntity.ok().body(emp);
    }

    @GetMapping("/api/role/admin/img/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> getEmplImage(@PathVariable("id") Long id) {
        Employee emp = emplRepository.findByid(id);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(emp.getImage());
    }

    @GetMapping("/api/role/admin/profile/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> getEmpData(@PathVariable("id") Long id) {
        Employee emp = emplRepository.findByid(id);
        if(emp == null) throw new NoSuchElementException("Employee does not exist");
        return ResponseEntity.ok().body(emp);
    }


    @PostMapping("/api/role/signin")
   // @PreAuthorize("hasRole('ADMIN')")
    public void saveEmployee(@RequestBody Employee empl) {
        Role role = roleRepository.findByName(ERole.USER).get();
        Set<Role> set = new HashSet<>();
        set.add(role);
        empl.setRoles(set);
        empl.setPassword(encoder.encode(empl.getPassword()));
        emplRepository.save(empl);

        ConfirmationToken confirmationToken = new ConfirmationToken(empl);

        confirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(empl.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setFrom("silvanabakula@gmail.com");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8080/api/role/confirmaccount?token="+confirmationToken.getConfirmationToken());

        emailSenderService.sendEmail(mailMessage);
    }

    @RequestMapping(value="/api/role/confirmaccount", method= {RequestMethod.GET, RequestMethod.POST})
    public void confirmUserAccount(@RequestParam("token")String confirmationToken)
    {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
        if(token != null)
        {
            Employee emp = emplRepository.findByEmail(token.getEmployee().getEmail()).get();
            emp.setVerified(true);
            emplRepository.save(emp);
        }
    }

    @PostMapping("/api/role/storeImg/{email}")
    // @PreAuthorize("hasRole('ADMIN')")
    public void storeImage(@PathVariable String email,  @RequestParam("imageFile") MultipartFile image) {
        try{
            emplService.storeImage(email, image);
        } catch (IOException ex) {
        }
    }
    @PutMapping("/api/role/update/{id}")
   // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id")Long id, @RequestBody Employee updatedEmpl) {
        Employee emp = emplRepository.findByid(id);
        if(emp == null) throw new NoSuchElementException("Employee does not exist");
        emp = emplService.updateEmployee(emp, updatedEmpl);
        emplRepository.save(emp);
        return ResponseEntity.ok().body(emp);
    }


}
