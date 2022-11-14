import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FileData } from '../model/FileData';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

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
