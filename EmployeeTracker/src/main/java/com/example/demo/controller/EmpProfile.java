package com.example.demo.controller;

public class EmpProfile {

    private Long id;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String position;

    public EmpProfile(Long id, String name, String surname, String email, String phone, String position) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.position = position;
    }
}
