import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
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
  this.rolUsuario = localStorage.getItem('rol') || 'admin';
}

}
