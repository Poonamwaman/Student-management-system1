package com.sms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.entity.Student;
import com.sms.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    // Add Student
    public Student saveStudent(Student student) {
        return repo.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return repo.findAll();
    }
 // GET BY ID
    public Student getStudentById(Long id) {
        return repo.findById(id).orElse(null);
    }
 // UPDATE
    public Student updateStudent(Long id, Student student) {

        Student existingStudent =
                repo.findById(id).orElse(null);

        if (existingStudent != null) {

            existingStudent.setName(student.getName());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setCourse(student.getCourse());

            return repo.save(existingStudent);
        }

        return null;
    }
    // DELETE
    public String deleteStudent(Long id) {

        repo.deleteById(id);

        return "Student Deleted Successfully";
    }
    public List<Student> searchStudent(String name) {

        return repo.findByNameContaining(name);

    }
}