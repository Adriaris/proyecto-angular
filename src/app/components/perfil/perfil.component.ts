import { Component, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UserService]
})
export class PerfilComponent {
  @Input() identity: User | null = null;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout().subscribe(() => {
      console.log('logout');
      this.router.navigate(['/login']);
    });
  }
}
