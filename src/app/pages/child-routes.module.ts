import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../guards/admin.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DoctorComponent } from './maintenance/doctor/doctor.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { SearchComponent } from './search/search.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'User settings' } },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'User profile' } },
  { path: 'search/:term', component: SearchComponent, data: { titulo: 'Searches' } },

  // Maintenance
  { path: 'hospitals', component: HospitalsComponent, data: { titulo: 'Hospitals maintenance' } },
  { path: 'doctors', component: DoctorsComponent, data: { titulo: 'Doctors maintenance' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { titulo: 'Doctor maintenance' } },

  // Routes admin
  { path: 'users', canActivate: [adminGuard], component: UsersComponent, data: { titulo: 'User maintenance' } },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
