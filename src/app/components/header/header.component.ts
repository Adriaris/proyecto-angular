import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() identity: User | null = null;

  constructor(
    private router: Router
  ) { }

  openProfileCrud() {
    this.router.navigate(['/profile']);
  }
}
