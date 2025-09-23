// app.jsx
import React from "react";

// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }
  displayInfo() {
    return `${super.displayInfo()}, Course: ${this.course}`;
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
  displayInfo() {
    return `  ${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

export default function App() {
  const student = new Student("Alice", 20, "Computer Science");
  const teacher = new Teacher("Mr. Smith", 40, "Mathematics");

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
        👨‍🏫 Class Hierarchy Visualization
      </h1>

      <div style={{ textAlign: "center" }}>
        {/* Person Node */}
        <div
          style={{
            display: "inline-block",
            padding: "15px 30px",
            background: "#007bff",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Person
        </div>

        {/* Tree Connector */}
        <div style={{ position: "relative", width: "100%", height: "60px" }}>
          {/* Vertical line from Person */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              width: "2px",
              height: "30px",
              background: "#333",
            }}
          />
          {/* Horizontal branch line */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "30%",
              width: "40%",
              height: "2px",
              background: "#333",
            }}
          />
          {/* Left vertical line to Student */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "30%",
              width: "2px",
              height: "30px",
              background: "#333",
            }}
          />
          {/* Right vertical line to Teacher */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "70%",
              width: "2px",
              height: "30px",
              background: "#333",
            }}
          />
        </div>

        {/* Children (Student + Teacher) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "200px",
            marginTop: "10px",
          }}
        >
          {/* Student Node */}
          <div>
            <div
              style={{
                padding: "15px 30px",
                background: "#17a2b8",
                color: "#fff",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Student
            </div>
            <div
              style={{
                marginTop: "10px",
                background: "#fff",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "left",
                minWidth: "220px",
              }}
            >
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Age:</strong> {student.age}</p>
              <p><strong>Course:</strong> {student.course}</p>
            </div>
          </div>

          {/* Teacher Node */}
          <div>
            <div
              style={{
                padding: "15px 30px",
                background: "#28a745",
                color: "#fff",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Teacher
            </div>
            <div
              style={{
                marginTop: "10px",
                background: "#fff",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "left",
                minWidth: "220px",
              }}
            >
              <p><strong>Name:</strong> {teacher.name}</p>
              <p><strong>Age:</strong> {teacher.age}</p>
              <p><strong>Subject:</strong> {teacher.subject}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
