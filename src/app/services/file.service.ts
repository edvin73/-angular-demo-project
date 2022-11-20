import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FileData } from '../model/FileData';
import { TaskFile } from '../model/TaskFile';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(taskId: number, file: File): Observable<TaskFile> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<TaskFile>(environment.serverSpringURL + '/tasks/'+taskId+'/upload', formData)
  }

  downloadFile(taskId: number, fileId: number): Observable<Blob> {
    
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  
    headers.append('Access-Control-Allow-Origin', environment.serverSpringURL);
    headers.append('Access-Control-Allow-Credentials', 'true');
 

    return this.http.get(environment.serverSpringURL + '/tasks/'+taskId+'/files/'+fileId,   {
      responseType: 'blob',
      headers: headers
    } );
  }

  downloadFileAction(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  download(file: string | undefined): Observable<Blob> {
    
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  
    headers.append('Access-Control-Allow-Origin', environment.serverSpringURL);
    headers.append('Access-Control-Allow-Credentials', 'true');
 

    return this.http.get(environment.serverSpringURL + '/api/files/' + file,   {
      responseType: 'blob',
      headers: headers
    } );
  }

  list(): Observable<FileData[]> {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  
    headers.append('Access-Control-Allow-Origin', environment.serverSpringURL);
    headers.append('Access-Control-Allow-Credentials', 'true');
 
    console.log("serverSpringURL " + environment.serverSpringURL);
    
    
    return this.http.get<FileData[]>(environment.serverSpringURL+ '/api/files/', 
        {headers: headers });
  }
}
