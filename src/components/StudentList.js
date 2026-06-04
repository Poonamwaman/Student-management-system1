import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
function StudentList() {

  const [students, setStudents] = useState([]);
const [editStudent, setEditStudent] = useState(null);
const [search, setSearch] = useState("");
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios.get(
      "http://localhost:8083/students"
    );
    setStudents(result.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(
      `http://localhost:8083/students/${id}`
    );
    loadStudents();
  };
  const searchStudent = async (value) => {

    setSearch(value);

    if (value === "") {
        loadStudents();
        return;
    }

    const response = await axios.get(
        `http://localhost:8084/students/search?name=${value}`
    );

    setStudents(response.data);
};

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Student Management System
      </h2>
<AddStudent loadStudents={loadStudents}/>
{
  editStudent && (
    <UpdateStudent
      student={editStudent}
      loadStudents={loadStudents}
      setEditStudent={setEditStudent}
    />
  )
}
<input
    type="text"
    className="form-control mb-3"
    placeholder="Search Student"
    value={search}
    onChange={(e) =>
        searchStudent(e.target.value)
    }
/>
      <table className="table table-bordered table-striped table-hover">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>

              <td>

<button
  className="btn btn-warning btn-sm me-2"
  onClick={() => setEditStudent(student)}
>
  Edit
</button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteStudent(student.id)
                  }>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StudentList;