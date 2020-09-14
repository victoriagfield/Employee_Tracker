DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
  FOREIGN KEY (department_id) REFERENENCES department_id ON DELETE CASCADE
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30),
   last_name VARCHAR(30)
   role_id INT,
   manager_id INT
   PRIMARY KEY (id)
   FOREIGN KEY (role_id) REFERENENCES role_id ON DELETE CASCADE, 
   FOREIGN KEY (manager_id) REFERENENCES manager_id ON DELETE CASCADE
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;