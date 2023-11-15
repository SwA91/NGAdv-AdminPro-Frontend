import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'rxjs', url: 'rxjs' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
    {
      titulo: 'Maintenance',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Users', url: 'users' },
        { titulo: 'Hospitals', url: 'hospitals' },
        { titulo: 'Doctors', url: 'doctors' },
      ]
    },
  ];

  constructor() { }
}
