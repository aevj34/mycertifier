import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Dashboard } from '../../models/dashboard';
import { StudentService } from 'src/app/services/student.service';
import { PAGE_SIZE } from 'src/app/config/config';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../../models/course';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/teacher';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService,
    public courseService: CourseService,
    public teacherService: TeacherService,
    public studentService: StudentService,) { }

  loading = false;
  loading1 = false;
  loading2 = false;
  loading3 = false;
  loading4 = false;

  dashboard: Dashboard;
  students: Student[] = [];
  page = 1;
  skip = 0;
  pageSize = 5;

  courses: Course[] = [];
  teachers: Teacher[] = [];
  users: User[] = [];
  
  ngOnInit() {
    this.dashboard = new Dashboard();
    this.getDashboard();
    this.getAllStudents();
    this.getAllCourses();
    this.getAllTeachers();
    this.getAllUsers();
  }

  
  getDashboard() {
    this.loading = true;
    this.userService.dashboard()
    .subscribe((res: any) => {
      this.dashboard = res.dashboard;


      this.loading = false;
    },  error => {
      this.loading = false;
    });
  }

  getAllUsers() {
    this.loading4 = true;
    this.userService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.users = res.users;

      this.users.forEach( user=> {
        if (user.img == '')
        user.img = 'xx';  
      });
      this.loading4 = false;

    },  error => {
      this.loading2 = false;
    });
  }
  
  getAllTeachers() {
    this.loading3 = true;
    this.teacherService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.teachers = res.teachers;

      this.teachers.forEach( student=> {
        if (student.img == '')
        student.img = 'xx';  
      });
      this.loading3 = false;

    },  error => {
      this.loading3 = false;
    });
  }

  getAllStudents() {
    this.loading1 = true;
    this.studentService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {
      this.students = res.students;

      this.students.forEach( student=> {
        if (student.img == '')
        student.img = 'xx';  
      });
      this.loading1 = false;

    },  error => {
      this.loading1 = false;
    });
  }

  getAllCourses() {
    this.loading2 = true;
    this.courseService.getAll(this.skip, this.pageSize)
    .subscribe((res: any) => {

      this.courses = res.courses;
      this.loading2 = false;

    },  error => {
      this.loading2 = false;
    });
  }


}
