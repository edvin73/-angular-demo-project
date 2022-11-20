import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { User } from 'src/app/model/User';
import { TaskPriority } from 'src/app/model/TaskPriority'; 
import { TaskFile } from '../../model/TaskFile'; 
import { FileService } from '../../services/file.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  taskTitleErrorMessage: string = '';
  taskPriorityErrorMessage = '';
  infoMessage: string = '';
  taskFiles: TaskFile[] = [];
  selectedFile?: File;
  taskForm!: FormGroup;
  newTask: boolean = false;
  

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private fileService: FileService,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.pageLoaded = false;
    this.errorMessage = '';
    this.infoMessage = '';
    this.taskTitleErrorMessage = '';
    this.taskPriorityErrorMessage = '';
    this.newTask = false;

    this.taskForm = this.fb.group({
      taskTitle: ['', [Validators.required, Validators.minLength(3)]],
      assignedTo: ['', Validators.required ],
      startDate: ['', Validators.required],
      prioId: ['', Validators.required]
    })

    let taskId = this.route.snapshot.paramMap.get('id');

    console.log('Edit Detail Task  Id ' + taskId);

    if(taskId == '0') {
      this.task = new Task();
      this.task.assignedTo = new User();
      this.task.taskPriority = new TaskPriority();

      this.newTask = true;

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
                  
                  if(this.task?.taskId) {
                    this.taskService.getAllTaskFiles(this.task.taskId).subscribe({
                      next: response => {
                        this.taskFiles = response;
                      },
                      error: err => {
                        console.log(err.message)
                      },
                      complete: ()=> {
                        console.log('task files retrieved successfully');
                      }
                    })
                  }

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
  
    console.log('save ' +JSON.stringify(this.task));
    
    if(this.checkTitle() && this.checkPrio()) {  
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
  }
     
  createTask() {
    console.log('create');
    
    if(this.checkTitle() && this.checkPrio()) {  
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
  }

  updateTask() {
    console.log('update');
    
    if (this.task && this.checkPrio()) {
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
        this.task.accomplished = 'Y';
      } else if(!evt && this.task) {
        this.task.accomplished = 'N';
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

  checkTitle(): boolean {
    this.taskTitleErrorMessage = '';
     // console.log(JSON.stringify(this.task?.taskTitle));
     if(!this.task?.taskTitle) {
      this.taskTitleErrorMessage = 'Task Title is required'

      return false;
     } else { 
      return true;
     }
    
  }

  checkPrio(): boolean {

    this.taskPriorityErrorMessage = '';
    console.log('check Priority');
    console.log('taskPriority: ' + JSON.stringify(this.task?.taskPriority));
     if(this.task!.taskPriority?.priorityId ) {
      console.log('priorityCode ok');
       
      return true;
     } else {     
      this.taskPriorityErrorMessage = 'Task Priority is required'
      console.log('priorityCode undefind');
      return false;
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
   
    this.taskPriorityErrorMessage = '';
    console.log('prio ' + id);
    
    if (Number(id)) {
      this.taskService.getPriorityById(id).subscribe(
        response=> {
          this.selectedPrioObj = response;
  
          this.task!.taskPriority = this.selectedPrioObj;
          console.log('task prio ' + JSON.stringify(this.task?.taskPriority));
          this.taskPriorityErrorMessage = '';
        }
      )
    } else {
      //this.task.taskPriority = undefined;
      this.taskPriorityErrorMessage = 'Task Priority is required'
      console.log('task prio ' + JSON.stringify(this.task?.taskPriority));
    }
 
  }

  insertFile() {
      
    let taskFile = new TaskFile();
    this.taskFiles.push(taskFile);
  }

  saveFile( ) {
        
    if(this.selectedFile) {  
      console.log('file' + JSON.stringify(this.selectedFile.name))     

      
      if(this.task && this.task.taskId) {
        this.fileService.uploadFile(this.task.taskId, this.selectedFile).subscribe({
          next: response => {
            let tf = response;
            console.log('created taskFile' + JSON.stringify(tf))

            this.getAllFiles();

          }, 
          error: err => {
            console.error(err.message)
          },
          complete : () => {console.log("upload completed")}
        })
      }
      
    }
    
  }

  selectFile(evt: any) {
    this.selectedFile = evt.target.files[0];
  }

  openFile(file: TaskFile) {
  
    const downloadLink = document.createElement('a');
    downloadLink.target = '_self'; 
    
    if(this.task && this.task.taskId && file.fileId)  {
      this.fileService.downloadFile(this.task.taskId, file.fileId).subscribe({
        next: response => {
            console.log(response)
            let blob = new Blob([response], { type: file.extension });
            const data = window.URL.createObjectURL(blob);

            downloadLink.href = data;

            if(file.fileName) {
              downloadLink.download =  file.fileName;
              document.body.appendChild(downloadLink);
              downloadLink.click();
            }
             
        },
        error: error => {
          console.log(error.message)
        },
        complete: () => {
          console.log('download completed');
        }
      })
    }
  }
  
  deleteFile(file: TaskFile) {
      
    
  }

  upload(file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);
  }

  getAllFiles() {
    if(this.task?.taskId) {
      this.taskService.getAllTaskFiles(this.task.taskId).subscribe({
        next: response => {
          this.taskFiles = response;
        },
        error: err => {
          console.log(err.message)
        },
        complete: ()=> {
          console.log('task files retrieved successfully');
        }
      })
    }
  }

}
