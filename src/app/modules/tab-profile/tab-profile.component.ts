import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.component.html',
  styleUrls: ['./tab-profile.component.css']
})
export class TabProfileComponent implements OnInit {

  appMsg: string = 'Tab Profile';
  msgSaveOkFr: string = 'Enregistrement effectuée' ;

  constructor() { }

  ngOnInit(): void {
  }
  
  closeEvent(msg: string ) {
    console.log('msg', msg);
    
  }
  
  clickBtnEvent(msg: string ) {
    console.log('btn msg', msg);
    
  }
}
