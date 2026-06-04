import React, { useState } from "react";
import axios from "axios";

function UpdateStudent({
  student,
  loadStudents,
  setEditStudent
}) {

  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [course, setCourse] = useState(student.course);

  const updateStudent = async (e) => {

    e.preventDefault();

    await axios.put(
      `http://localhost:8083/students/${student.id}`,
      {
        name,
        email,
        course
      }
    );

    loadStudents();
    setEditStudent(null);
  };

  return (
    <div className="card p-3 mb-3">

      <h3>Update Student</h3>

      <form onSubmit={updateStudent}>

        <input
          className="form-control mb-2"
          value={name}
          onChange={(e) =>
            setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          value={course}
          onChange={(e) =>
            setCourse(e.target.value)}
        />

        <button
          className="btn btn-primary">
          Update
        </button>

      </form>

    </div>
  );
}

export default UpdateStudent;