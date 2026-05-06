import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface ServiceCard {
  icon: SafeHtml;
  title: string;
  description: string;
  features: string[];
  accent: string;
  gradient: string;
}

/**
 * ServicesComponent
 * Four core platform capabilities in a bento-grid layout
 * with hover effects and scroll-triggered reveals.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements AfterViewInit, OnDestroy {

  /** Reference to the section header element for scroll animations */
  @ViewChild('headerRef') headerRef!: ElementRef;

  /** Reference to the service cards container for scroll animations */
  @ViewChild('cardsRef') cardsRef!: ElementRef;

  /** Reference to the call-to-action section for scroll animations */
  @ViewChild('ctaRef') ctaRef!: ElementRef;

  /** Array to hold IntersectionObservers for cleanup on destroy */
  private observers: IntersectionObserver[] = [];

  /** Array of service cards to display in the section */
  services: ServiceCard[];

  constructor(
    private scrollAnim: ScrollAnimationService,
    private sanitizer: DomSanitizer,
  ) {
    const svg = (path: string): SafeHtml =>
      this.sanitizer.bypassSecurityTrustHtml(
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">${path}</svg>`,
      );

    this.services = [
      {
        title: 'Campaign Planning',
        description:
          'Plan and optimize your ad campaigns with data-driven insights and seamless collaboration for maximum impact across all touchpoints.',
        icon: svg('<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'),
        features: [
          'AI-powered budget allocation',
          'Multi-channel strategy builder',
          'Real-time collaboration workspace',
        ],
        accent: '#E8173C',
        gradient: 'linear-gradient(135deg, rgba(232,23,60,0.3), rgba(232,23,60,0.1))',
      },
      {
        title: 'Media Buying',
        description:
          'Effortlessly book media slots with AI-powered automation, ensuring cost efficiency and maximum reach for your campaigns.',
        icon: svg('<polygon points="5 3 19 12 5 21 5 3"/>'),
        features: [
          'Automated slot booking',
          'Competitive rate negotiation',
          'Inventory availability dashboard',
        ],
        accent: '#4F46E5',
        gradient: 'linear-gradient(135deg, rgba(79,70,229,0.3), rgba(79,70,229,0.1))',
      },
      {
        title: 'Ad Distribution',
        description:
          'Distribute ads across multiple channels while ensuring precise targeting and real-time performance tracking.',
        icon: svg(
          '<rect x="3" y="3" width="7" height="7"/>' +
          '<rect x="14" y="3" width="7" height="7"/>' +
          '<rect x="14" y="14" width="7" height="7"/>' +
          '<rect x="3" y="14" width="7" height="7"/>',
        ),
        features: [
          'Cross-channel distribution',
          'Audience segmentation & targeting',
          'Creative asset management',
        ],
        accent: '#E8173C',
        gradient: 'linear-gradient(135deg, #e8173c 0%, #c91230 40%, #9b0e26 100%)',
      },
      {
        title: 'Performance Analytics',
        description:
          'Gain actionable insights with real-time performance tracking to maximize your ROI and refine future strategies.',
        icon: svg(
          '<line x1="18" y1="20" x2="18" y2="10"/>' +
          '<line x1="12" y1="20" x2="12" y2="4"/>' +
          '<line x1="6" y1="20" x2="6" y2="14"/>',
        ),
        features: [
          'Live KPI dashboards',
          'Attribution modelling',
          'Custom report builder & export',
        ],
        accent: '#F59E0B',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))',
      },
    ];
  }

  /* Set up scroll-triggered animations for the header, cards, and CTA sections */
  ngAfterViewInit(): void {
    this.observers.push(
      this.scrollAnim.observeElements(
        [this.headerRef.nativeElement],
        'aos-hidden',
        'aos-visible',
      ),
    );
    const cards = this.cardsRef.nativeElement.querySelectorAll('.service-card');
    this.observers.push(
      this.scrollAnim.observeElements(cards, 'aos-hidden', 'aos-visible'),
    );
    this.observers.push(
      this.scrollAnim.observeElements(
        [this.ctaRef.nativeElement],
        'aos-hidden',
        'aos-visible',
      ),
    );
  }

  /* Clean up IntersectionObservers when the component is destroyed */
  ngOnDestroy(): void {
    this.observers.forEach((o) => o.disconnect());
  }
}