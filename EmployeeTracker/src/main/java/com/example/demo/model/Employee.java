package com.example.demo.model;

import javax.persistence.*;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "employees", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String name;
    private String surname;
    private String phone;
    private String position;
    private String password;
    @Lob
    private byte[] image;
    private boolean verified = false;

    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<WorkTime> workTime;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "employee_roles", joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    private Employee() {

    }

    public Employee(String name, String surname, String email, String phone, String position, String password, byte[] image) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.position = position;
        this.password = password;
        this.image = image;
    }



    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) && Objects.equals(name, employee.name) && Objects.equals(surname, employee.surname) && Objects.equals(email, employee.email) && Objects.equals(phone, employee.phone) && Objects.equals(position, employee.position) && Objects.equals(password, employee.password) && Arrays.equals(image, employee.image) && Objects.equals(workTime, employee.workTime);
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}
