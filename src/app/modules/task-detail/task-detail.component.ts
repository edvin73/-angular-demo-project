import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { User } from 'src/app/model/User';
import { TaskPriority } from 'src/app/model/TaskPriority';
import { log } from 'console';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task?: Task;
  prios: TaskPriority[] = [];
  users: User[] = [];
  pageLoaded?: boolean;
  selectedUserObj?: User;
  selectedPrioObj?: TaskPriority;
  errorMessage: string = '';
  infoMessage: string = '';

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.pageLoaded = false;
    this.errorMessage = '';
    this.infoMessage = '';

    let taskId = this.route.snapshot.paramMap.get('id');

    console.log('Edit Deatil Task  Id ' + taskId);

    if(taskId == '0') {
      this.task = new Task();
      this.task.assignedTo = new User();
      this.task.taskPriority = new TaskPriority();

      this.taskService.getAllPriorities().subscribe(
        response => {
          this.prios = response;

          this.taskService.getAllUsers().subscribe(
            response =>  {
              this.users = response;

              this.pageLoaded = true;
            }
          )
        }
      ) 
    } else {
      this.taskService.getTaskById(Number(taskId)).subscribe(
        response => {
          this.task = response;

          this.selectedUserObj = this.task.assignedTo;

          console.log('selectedUserObj ' + JSON.stringify(this.selectedUserObj));
          

          this.taskService.getAllPriorities().subscribe(
            response => {
              this.prios = response;

              this.taskService.getAllUsers().subscribe(
                response =>  {
                  this.users = response;

                  this.pageLoaded = true;
                }
              )
            }
          ) 
        }
      )
    }
  }

  saveTask() {
  
    console.log(JSON.stringify(this.task));
    
    if(this.task) {
      if (!this.task.taskId) {
        console.log('create new task ' );
        
        this.createTask();
      } else {
        console.log('update  task '  + this.task.taskId);
        this.updateTask();
      }
    }
    
  }
  
  createTask() {
    if (this.task) {
      this.task.accomplished = '0';

      this.taskService.createTask(this.task).subscribe({
        next: (response) => {
          this.task = response;
          this.infoMessage = 'Task created successfully';
        },
        error: (err) => {
          console.log(err);
          
          this.errorMessage = err.error.message;
        }
      })
    }
  }

  updateTask() {
    if (this.task) {
      if (this.task.taskId) {
        this.taskService.modifyTask(this.task.taskId, this.task).subscribe({
          next: response => {
            this.task = response;
            this.infoMessage = 'Task modified successfully';
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        })
      }
    }
  }

  goBack() {
    this.router.navigate(['task']);
  }

  setAcommplished(evt: boolean) {
      
      if(evt && this.task) {
        this.task.accomplished = '1';
      } else if(!evt && this.task) {
        this.task.accomplished = '0';
      }
  }

  changeUser(obj: any) {

    console.log('obj => ' + JSON.stringify(obj));

    let usr = obj;
    
    if(this.task) {

      // console.log('selectedUserObj => ' + JSON.stringify(this.selectedUserObj));
      this.selectedUserObj = usr;
      this.task.assignedTo = this.selectedUserObj;

      console.log('Task => ' + JSON.stringify(this.task));
    }

    
  }

  // onChangeUser(userId: number) {
      
  //   if (Number(userId)) {
  //     this.taskService.getUserById(userId).subscribe(
  //       response=> {
  //         this.selectedUserObj = response;
  
  //         this.task!.assignedTo = this.selectedUserObj;
  //         console.log('user prio ' + JSON.stringify(this.task?.assignedTo));
  //       }
  //     )
  //   } else {
  //     this.task!.assignedTo = undefined;
  //     console.log('task user ' + JSON.stringify(this.task?.assignedTo));
  //   }
  // }

  onChangePrio(id: any) {
   
     
    console.log('prio ' + id);
    
    if (Number(id)) {
      this.taskService.getPriorityById(id).subscribe(
        response=> {
          this.selectedPrioObj = response;
  
          this.task!.taskPriority = this.selectedPrioObj;
          console.log('task prio ' + JSON.stringify(this.task?.taskPriority));
        }
      )
    } else {
      this.task!.taskPriority = undefined;
      console.log('task prio ' + JSON.stringify(this.task?.taskPriority));
    }
 
  }

}
