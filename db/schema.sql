--TODO: drop database if exists
DROP DATABASE IF EXISTS employee_db;

--TODO: create database
CREATE DATABASE employee_db;

--TODO: add syntax to use databse
\c employee_db;

--TODO: create tables for department, role and employee
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL

);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL, 
    FOREIGN KEY(department_id) 
    REFERENCES departments(id)

);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL, 
    manager_id INTEGER,
    FOREIGN KEY(role_id)
    REFERENCES roles(id)
    
);
--TODO: add FOREIGN KEYS and REFERENCES to implenent other table