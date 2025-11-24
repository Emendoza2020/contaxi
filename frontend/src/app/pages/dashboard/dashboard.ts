import { Component, Input, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private auth: Auth) {}
  logout() {
    this.auth.logout();
  }

  rolUsuario = '';

  ngOnInit() {
    this.rolUsuario = localStorage.getItem('rol') || 'admin' || 'conductor' ;
  }

  collapsed = signal(false);
  dropdown = signal(false);

  toggle() { this.collapsed.update(v => !v); }
  toggleDropdown() { this.dropdown.update(v => !v); }
  closeDropdown() { this.dropdown.set(false); }
  dropdownOpen() { return this.dropdown(); }

  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }



}
