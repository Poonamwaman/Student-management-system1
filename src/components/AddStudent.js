import React, { useState } from "react";
import axios from "axios";

function AddStudent({ loadStudents }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const saveStudent = async (e) => {

        e.preventDefault();

        await axios.post(
            "http://localhost:8083/students",
            {
                name,
                email,
                course
            }
        );

        setName("");
        setEmail("");
        setCourse("");

        loadStudents();
    };

    return (

        <div className="card p-3 mb-4">

            <h3>Add Student</h3>

            <form onSubmit={saveStudent}>

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)}
                />

                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)}
                />

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Course"
                    value={course}
                    onChange={(e) =>
                        setCourse(e.target.value)}
                />

                <button
                    className="btn btn-success">
                    Add Student
                </button>

            </form>

        </div>
    );
}

export default AddStudent;