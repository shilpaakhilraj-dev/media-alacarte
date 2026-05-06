import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * CollaborationComponent
 * "Why Media Alacarte" section with animated feature comparison
 * table and 4-step process flow.
 */
@Component({
  selector: 'app-collaboration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.scss'],
})

export class CollaborationComponent implements AfterViewInit, OnDestroy {

  /** Reference to the tech badges container */
  @ViewChild('techRef') techRef!: ElementRef;

  /** Reference to the roles cards container */
  private observers: IntersectionObserver[] = [];

  /** Comparison rows for the feature table */
  comparisonRows = [
    { feature: 'Media Planning', old: xIcon(), new: checkIcon() },
    { feature: 'AI Automation', old: xIcon(), new: checkIcon() },
    { feature: 'Real-time Analytics', old: xIcon(), new: checkIcon() },
    { feature: 'Transparent Pricing', old: xIcon(), new: checkIcon() },
    { feature: 'Multi-stakeholder', old: xIcon(), new: checkIcon() },
  ];

  /** Process steps for the 4-step flow */
  processSteps = [
    {
      number: '01',
      title: 'Connect & Onboard',
      description:
        'Set up your account in minutes. Import existing campaigns and configure your media preferences.',
    },
    {
      number: '02',
      title: 'Plan with AI Insights',
      description:
        'Let our AI surface the best media opportunities based on your goals, budget, and target audience.',
    },
    {
      number: '03',
      title: 'Book & Distribute',
      description:
        'Automate the buying process. Book slots, distribute creatives, and manage all vendor relationships.',
    },
    {
      number: '04',
      title: 'Measure & Optimise',
      description:
        'Track every impression and conversion. Use real-time data to continually refine your strategy.',
    },
  ];

  /** Tech badges for the platform */
  techBadges = [
    {
      name: 'AI-Powered Insights',
      icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8173C" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
    },
    {
      name: 'Cloud Infrastructure',
      icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    },
    {
      name: 'End-to-End Encryption',
      icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    },
    {
      name: 'Real-time Data',
      icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    },
    {
      name: 'GDPR Compliant',
      icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    },
  ];

  /** Roles and benefits for different stakeholders */
  @ViewChild('rolesRef') rolesRef!: ElementRef;

  /** Roles data for the collaboration section */
  roles: {
    title: string;
    description: string;
    icon: any;
    tags: string[];
    image?: string;
  }[] = [];

  constructor(private scrollAnim: ScrollAnimationService, private sanitizer: DomSanitizer) {
    const svg = (path: string, strokeColor?: string): SafeHtml =>
      this.sanitizer.bypassSecurityTrustHtml(
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${strokeColor || 'currentColor'}" stroke-width="2">${path}</svg>`,
      );

    this.roles = [
    {
      title: 'Advertisers',
      description:
        'Access premium media inventory, manage budgets intelligently, and track campaign performance in real-time.',
      icon: svg('<path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>', '#E8173C'),
      tags: ['Campaign Management', 'Budget Control', 'Real-time Tracking'],
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1969&auto=format&fit=crop',
    },
    {
      title: 'Agencies',
      description:
        'Streamline client campaigns, collaborate across teams, and deliver measurable results with agency-grade tools.',
      icon: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', '#4F46E5'),
      tags: ['Client Portals', 'Team Collaboration', 'White-label Reports'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Media Owners',
      description:
        'Monetize your inventory effectively, connect with premium advertisers, and manage all transactions seamlessly.',
      icon: svg('<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', '#10B981'),
      tags: ['Inventory Management', 'Direct Booking', 'Revenue Analytics'],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
    },
  ];
  }

  /* Lifecycle hook to set up scroll animations after the view initializes */
  ngAfterViewInit(): void {
    this.observers.push(
      this.scrollAnim.observeElements(
        [this.techRef.nativeElement],
        'aos-hidden',
        'aos-visible',
      ),
    );

    const roleCards = this.rolesRef.nativeElement.querySelectorAll('.role-card');
    this.scrollAnim.applyStaggerDelay(roleCards, 0, 150);
    this.observers.push(
      this.scrollAnim.observeElements(roleCards, 'aos-hidden', 'aos-visible'),
    );
  }

  /* Lifecycle hook to clean up observers when the component is destroyed */
  ngOnDestroy(): void {
    this.observers.forEach((o) => o.disconnect());
  }
}

/* Utility function to generate an 'X' icon */
function xIcon(): string {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>`;
}

/* Utility function to generate a checkmark icon */
function checkIcon(): string {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>`;
}
