<%@ page language="java" contentType="text/html; charset=ISO-8859-1" %>
<html>
<head>
  <title>Student Attendance</title>
</head>
<body>
  <h2>Mark Attendance</h2>
  <form action="AttendanceServlet" method="post">
    Student ID: <input type="text" name="studentId" required><br><br>
    Date: <input type="date" name="date" required><br><br>
    Status: 
    <select name="status">
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
    </select><br><br>
    <input type="submit" value="Submit Attendance">
  </form>
</body>
</html>
