package entities;

import org.hibernate.annotations.*;
import org.hibernate.annotations.NamedQuery;

import java.util.Date;
import java.io.Serializable;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@NamedQuery(name = "User.getAll", query = "SELECT u from User u")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String login;
    private String password;
    private String email;
    private Date registration_date;

    public User() {
    }

    public User(String login, String password, String email, Date registration_date) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.registration_date = registration_date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(Date registration_date) {
        this.registration_date = registration_date;
    }

    @Override
    public String toString() {
        return "User{ id = " + id + "\n" +
                "login = " + login + "\n" +
                "password = " + password + "\n" +
                "email = " + email + "\n" +
                "registration_date = " + registration_date + "}";
    }
}
