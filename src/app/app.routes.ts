import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'todolist', loadComponent: () => import('./pages/todolist/todolist.component')},
  { path: '', redirectTo: 'todolist', pathMatch: 'full'},
  { path: '**', redirectTo: 'todolist'}


];
