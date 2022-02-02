USE employees_db;
INSERT INTO
  department (name)
VALUES
  ("HR") ,
  ("Marketing"),
   ("Sales") ,
   ("Tech");


   INSERT INTO role (title,salary,department_id)
   VALUES
   ("HR Representative", 50000, 1),
   ("Coordinator", 50000,2),
   ("salesperson",70000,3),
   ("support",60000,4);

   INSERT INTO employee(first_name, last_name, role_id, manager_id)

VALUES
("James", "Mathew", 1, NULL),
("Aneeta", "Joseph", 2, NULL),
("Crystal", "Hudson", 3, NULL),
("Chris", "Smith", 4, Null);