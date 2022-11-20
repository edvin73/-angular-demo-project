import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabComponent } from './modules/tab/tab.component';
import { HomeComponent } from './modules/home/home.component';
import { MenuComponent } from './modules/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileModuleComponent } from './modules/file-module/file-module.component'; 
import { HttpClientModule } from '@angular/common/http';
import { TabProfileComponent } from './modules/tab-profile/tab-profile.component';
import { TabHomeComponent } from './modules/tab-home/tab-home.component';
import { TabContactComponent } from './modules/tab-contact/tab-contact.component';
import { TaskComponent } from './modules/task/task.component';
import { TaskDetailComponent } from './modules/task-detail/task-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NasaComponent } from './modules/nasa/nasa.component';
import { UserComponent } from './modules/user/user.component';
import { UserDetailComponent } from './modules/user-detail/user-detail.component';

@NgModule({
  declarations: [		
    AppComponent,
      TabComponent,
      HomeComponent,
      MenuComponent,
      FileModuleComponent,
      TabProfileComponent,
      TabHomeComponent,
      TabContactComponent,
      TaskComponent,
      TaskDetailComponent,
      NasaComponent,
      UserComponent,
      UserDetailComponent 
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
