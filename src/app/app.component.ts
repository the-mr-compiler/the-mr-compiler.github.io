import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'megh-portfolio';
  isMenuOpen = false;
  menus = [
    { name: 'Home', link: '#home-section', active: true, offset: 0 },
    { name: 'Education', link: '#education-section', active: false, offset: 0 },
    { name: 'Skills', link: '#skills-section', active: false, offset: 0 },
    { name: 'Projects', link: '#projects-section', active: false, offset: 0 },
    { name: 'Contact', link: '#contact-section', active: false, offset: 0 },
  ];
  currentPosition: number = 0;

  ngAfterViewInit() {
    this.menus.forEach((menu) => {
      menu.offset = document.getElementById(menu.link.slice(1))?.offsetTop ?? 0;
    });
  }
  changeActive(i: number) {
    this.menus.forEach((menu) => (menu.active = false));
    this.menus[i].active = true;
    console.log(this.menus);
    this.isMenuOpen = false;
    document.getElementById(this.menus[i].link.slice(1))?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
