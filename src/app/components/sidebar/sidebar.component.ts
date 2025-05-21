import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed = false;

  menuItems = [
    {
      label: 'Admin',
      icon: 'pi pi-user',
      routerLink: '/admin',
    },
    {
      label: 'Equipamentos',
      icon: 'pi pi-cog',
      routerLink: '/cadastro/equipamentos',
    },
    // Adicione mais itens aqui
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
