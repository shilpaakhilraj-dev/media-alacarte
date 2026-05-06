import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * NavbarComponent
 * Sticky top navigation with scroll-aware background blur,
 * active link tracking, and a responsive mobile menu.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  /** State signals for scroll position, menu open state, and active section */
  isScrolled = signal(false);

  /** State signal to track if the mobile menu is open */
  menuOpen = signal(false);

  /** State signal to track the active section */
  activeSection = signal('hero');

  /** Navigation links with labels, hrefs, and section IDs for active tracking */
  navLinks = [
    { label: 'Platform', href: '#platform', id: 'platform' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Benefits', href: '#benefits', id: 'benefits' },
    { label: 'Request a Demo', href: '#demo', id: 'demo' },
    { label: 'Contact Us', href: '#contact', id: 'contact' },
    { label: 'About Us', href: '#about', id: 'about' },
  ];

  /* Initialize scroll listener and any other setup on component init */
  ngOnInit(): void {}

  /** Listen for scroll events on the window */
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 30);
  }

  /* Set the active section based on user clicks or scroll position */
  setActive(id: string): void {
    this.activeSection.set(id);
  }

  /* Toggle the mobile menu open/closed state */
  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
