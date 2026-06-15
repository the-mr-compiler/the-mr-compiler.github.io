import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
  ],
})
export class AppComponent {
  isMenuOpen = false;
  menus = [
    {
      name: 'Home',
      link: '#home-section',
      active: true,
      offset: 0,
      external: false,
    },
    {
      name: 'Experience',
      link: '#experience-section',
      active: false,
      offset: 0,
      external: false,
    },
    {
      name: 'Education',
      link: '#education-section',
      active: false,
      offset: 0,
      external: false,
    },
    {
      name: 'Skills',
      link: '#skills-section',
      active: false,
      offset: 0,
      external: false,
    },
    {
      name: 'Projects',
      link: '#projects-section',
      active: false,
      offset: 0,
      external: false,
    },
    {
      name: 'My Blogs',
      link: 'https://the-mr-compiler.github.io/my-blogs/',
      active: false,
      offset: 0,
      external: true,
    },
    {
      name: 'Contact',
      link: '#contact-section',
      active: false,
      offset: 0,
      external: false,
    },
  ];
  currentPosition: number = 0;

  ngAfterViewInit() {
    this.menus.forEach((menu) => {
      menu.offset = document.getElementById(menu.link.slice(1))?.offsetTop ?? 0;
    });
    this.launchManualConfetti();
  }

  private launchManualConfetti(): void {
    const wrapper = document.getElementById('confetti-wrapper');
    if (!wrapper) {
      return;
    }

    const colors = [
      '#f43f5e',
      '#f97316',
      '#eab308',
      '#10b981',
      '#22d3ee',
      '#818cf8',
      '#ec4899',
      '#facc15',
      '#fF3fne',
      '#f97316',
      '#eab398',
      '#10b981',
      '#22d33e',
      '#8685f8',
      '#ec4899',
      '#f1c315',
    ];
    const emissionCount = 20;
    const bursts = 1;

    for (let i = 0; i < bursts; i++) {
      window.setTimeout(() => {
        this.emitConfettiSide(wrapper, 'left', colors, emissionCount);
        this.emitConfettiSide(wrapper, 'right', colors, emissionCount);
      }, 30 + i * 200);
    }
  }

  private emitConfettiSide(
    wrapper: HTMLElement,
    side: 'left' | 'right',
    colors: string[],
    count: number
  ): void {
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      const width = 4 + Math.random() * 10;
      const height = 8 + Math.random() * 18;
      const xOffset = Math.random() * 120;
      const direction = side === 'left' ? 1 : -1;
      const startX = side === 'left' ? 0 : window.innerWidth;
      const travelX = direction * (100 + Math.random() * 900);
      const travelY = -(420 + Math.random() * 990);
      const rotation = Math.random() * 360;
      const delay = 20 + Math.random() * 100;

      piece.style.position = 'fixed';
      piece.style.left = `${startX + (side === 'left' ? xOffset : -xOffset)}px`;
      piece.style.bottom = '0';
      piece.style.width = `${width}px`;
      piece.style.height = `${height}px`;
      piece.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = '4px';
      piece.style.opacity = '0';
      piece.style.pointerEvents = 'none';
      piece.style.zIndex = '9999';
      piece.style.transform = `rotate(${rotation}deg)`;
      piece.style.transition = 'transform 1.4s ease-out, opacity 1.4s ease-out';

      wrapper.appendChild(piece);

      window.setTimeout(() => {
        piece.style.opacity = '1';
        piece.style.transform = `translate(${travelX}px, ${travelY}px) rotate(${
          rotation + 720
        }deg)`;
      }, delay);

      window.setTimeout(() => {
        piece.style.opacity = '0';
      }, delay + 1200);

      window.setTimeout(() => {
        wrapper.removeChild(piece);
      }, delay + 800);
    }
  }

  changeActive(i: number) {
    this.menus.forEach((menu) => (menu.active = false));
    this.menus[i].active = true;
    this.isMenuOpen = false;
    document.getElementById(this.menus[i].link.slice(1))?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
