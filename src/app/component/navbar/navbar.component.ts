import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isProfilePage: boolean = true;

  ngOnInit() {
    this.isProfilePage = this.router.url === '/perfil';
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor(private router: Router) {}

  irAPerfil() {
    this.router.navigate(['/perfil']); 
  }

  irHome(){
    this.router.navigate(['/inicio']); 

  }
}
