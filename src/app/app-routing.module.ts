import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { TabComponent } from './modules/tab/tab.component';
import { FileModuleComponent } from './modules/file-module/file-module.component';
import { TaskComponent } from './modules/task/task.component';
import { TaskDetailComponent } from './modules/task-detail/task-detail.component';
import {NasaComponent} from "./modules/nasa/nasa.component";
import { UserComponent } from './modules/user/user.component';
import { UserDetailComponent } from './modules/user-detail/user-detail.component';

const routes: Routes = [
  { path: 'tab', component: TabComponent },
  { path: 'home', component: HomeComponent },
  { path: 'file', component: FileModuleComponent},
  { path: 'task', component: TaskComponent},
  { path: 'task/:id', component: TaskDetailComponent},
  { path: 'nasa', component: NasaComponent},
  { path: 'user', component: UserComponent},
  { path: 'user/:id', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
