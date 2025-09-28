DROP TABLE IF EXISTS FeePayments;

CREATE TABLE FeePayments (
    payment_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2),
    payment_date DATE NOT NULL
);

START TRANSACTION;

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (1, 'Ashish', 5000.00, '2024-06-01');

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (2, 'Smaran', 4500.00, '2024-06-02');

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (3, 'Vaibhav', 5500.00, '2024-06-03');

COMMIT;

SELECT 'Part A - Successful Transaction:' AS Result;
SELECT * FROM FeePayments;

START TRANSACTION;

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (4, 'Kiran', 4800.00, '2024-06-04');

INSERT IGNORE INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (1, 'Duplicate', 3000.00, '2024-06-05');

ROLLBACK;

SELECT 'Part B - After Rollback (Duplicate Key):' AS Result;
SELECT * FROM FeePayments;

START TRANSACTION;

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (5, 'Priya', 5200.00, '2024-06-05');

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (6, 'Test', NULL, '2024-06-06');

ROLLBACK;

SELECT 'Part C - After Rollback (NULL amount):' AS Result;
SELECT * FROM FeePayments;

START TRANSACTION;

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (7, 'Sneha', 4700.00, '2024-06-07');

INSERT INTO FeePayments (payment_id, student_name, amount, payment_date) 
VALUES (8, 'Arjun', 5100.00, '2024-06-08');

COMMIT;

SELECT 'Part D - Final Result (All ACID Properties):' AS Result;
SELECT * FROM FeePayments ORDER BY payment_id;
