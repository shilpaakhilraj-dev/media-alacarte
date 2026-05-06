import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml  } from '@angular/platform-browser';

/**
 * FooterComponent
 * Site footer with nav links, contact info, newsletter signup,
 * social icons, and the copyright strip.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  /** List of social media links */
  socials: { label: string; href: string; icon: SafeHtml }[] = [];

/** Navigation link columns with headings and links */
  linkColumns = [
    {
      heading: 'Platform',
      links: [
        { label: 'The Platform', href: '#platform' },
        { label: 'Features', href: '#features' },
        { label: 'Benefits', href: '#benefits' },
        { label: 'Request Demo', href: '#demo' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact Us', href: '#contact' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.socials = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: this.safeSvg(`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`),
    },
    {
      label: 'Twitter',
      href: '#',
      icon: this.safeSvg(`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`),
    }
  ];
  }

/* Helper method to sanitize SVG strings for safe HTML rendering */
  safeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
