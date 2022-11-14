import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../model/task';
import { TaskPriority } from '../model/TaskPriority';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[]=[];
  prios: TaskPriority[] = [];
  users: User[] =[];
  taskToDelete?: Task;

  constructor(private httpClient: HttpClient) { }

  

  getAllTaskes(): Observable<Task[]> {
      
    return this.httpClient.get<Task[]>(environment.serverSpringURL + '/tasks');
  }

  getTaskById(id: number): Observable<Task> {
      
    return this.httpClient.get<Task>(environment.serverSpringURL + '/tasks/'+id);
  }

  createTask(task: Task): Observable<Task> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4500');
      
    return this.httpClient.post<Task>(environment.serverSpringURL + '/tasks', task, {headers: headers});
  }

  modifyTask(id: number, task: Task): Observable<Task> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4500');
      
    return this.httpClient.put<Task>(environment.serverSpringURL + '/tasks/'+id,  task , {headers: headers});
  }

  getAllPriorities(): Observable<TaskPriority[]> {
      
    return this.httpClient.get<TaskPriority[]>(environment.serverSpringURL + '/prios');
  }

  getPriorityById(id: number): Observable<TaskPriority> {
      
    return this.httpClient.get<TaskPriority>(environment.serverSpringURL + '/prios/'+id);
  }

  getAllUsers(): Observable<User[]> {
      
    return this.httpClient.get<User[]>(environment.serverSpringURL + '/users');
  }

  getUserById(id: number): Observable<User> {
      
    return this.httpClient.get<User>(environment.serverSpringURL + '/users/'+ id);
  }

  
}
