import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { TaskPriority } from '../../model/TaskPriority';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];
  prios: TaskPriority[] = [];
  users: User[] = [];
  taskNonInit?: Task;


  constructor(public taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
      
    if(this.prios.length == 0) {
      this.taskService.getAllPriorities().subscribe(
        response => {
          this.prios = response;
        }
      )
    }

    if(this.users.length == 0) {
      this.taskService.getAllUsers().subscribe(
        response =>  {
          this.users = response;
        }
      )
    }
  }

  getAllTasks() {
      this.taskService.getAllTaskes().subscribe(
        response => {
          this.tasks = response;
        }
      )
  }

  editTask(task: Task) {
    console.log('edit task id: ' + task.taskId);  
    this.router.navigate(['task', task.taskId]);
    
  }

  selectTaskToDelete(task: Task) {
    console.log('to del task id: ' + task.taskId);

    this.taskService.taskToDelete = task;

  }

  releaseTaskToDelete(task: Task) {
    console.log('to release task id: ' + task.taskId);

    this.taskService.taskToDelete = this.taskNonInit;

  }

  releaseTask() {
    if(this.taskService.taskToDelete) {
      this.releaseTaskToDelete(this.taskService.taskToDelete);
    }
    
    console.log('task released : ' + this.taskService.taskToDelete?.taskId);
  }

  deleteTask() {
    console.log('task deleted : ' + this.taskService.taskToDelete?.taskId);
    this.releaseTask();
  }

  createNewTask() {
    
    this.router.navigate(['task', 0]);
  }

  resetForm() {
    this.tasks =  [];
  }

}
