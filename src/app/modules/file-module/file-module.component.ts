import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/model/FileData';
import { FileService } from '../../services/file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-module',
  templateUrl: './file-module.component.html',
  styleUrls: ['./file-module.component.css']
})
export class FileModuleComponent implements OnInit {
  
  fileList?: FileData[];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFileList();  
  }

  getFileList(): void {
    this.fileService.list().subscribe(
      data => {
        this.fileList = data
      })
  }

  downloadFile(fileDate: FileData): void {
    this.fileService.download(fileDate.filename).subscribe(
        blob => {
          saveAs(blob, fileDate.filename)
        })
  }

}
