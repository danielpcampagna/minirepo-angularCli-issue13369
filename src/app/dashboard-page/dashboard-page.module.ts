import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule } from '@angular/router';

export const routes = [
  { path: '', component: DashboardPageComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DashboardPageModule { }
