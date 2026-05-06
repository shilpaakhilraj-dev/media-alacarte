import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

/**
 * StatsComponent
 * Animated statistics strip, role cards, and a marquee
 * ticker of trusted partner brands.
 */
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements AfterViewInit, OnDestroy {

  /** Reference to the section label for scroll-triggered animation */
  @ViewChild('labelRef') labelRef!: ElementRef;

  /** Reference to the stats container for staggered animations */
  @ViewChild('statsRef') statsRef!: ElementRef;

  /** Reference to the marquee container for scroll-triggered animation */
  @ViewChild('marqueeRef') marqueeRef!: ElementRef;

  /** Array to hold IntersectionObservers for cleanup on destroy */
  private observers: IntersectionObserver[] = [];

  /* Array of statistics to display in the section */
  stats = [
    {
      value: '110+',
      label: 'Top Agencies',
      sub: 'Trust Media Alacarte globally',
      primary: false,
      glowColor: 'rgba(255,255,255,0.03)',
    },
    {
      value: '1M',
      label: 'Advertisers',
      sub: 'Reaching the right audience',
      primary: true,
      glowColor: 'rgba(232,23,60,0.08)',
    },
    {
      value: '98.99%',
      label: 'Efficiency',
      sub: 'Seamless media transactions',
      primary: false,
      glowColor: 'rgba(255,255,255,0.03)',
    },
  ];

  /* List of trusted partner brands for the marquee ticker */
  brands = [
    {
      name: 'OmniGroup',
      color: '#E8173C',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>`,
    },
    {
      name: 'MediaForce',
      color: '#4F46E5',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 22 20 2 20"/></svg>`,
    },
    {
      name: 'AdBridge',
      color: '#10B981',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="4"/></svg>`,
    },
    {
      name: 'PulseMedia',
      color: '#F59E0B',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    },
    {
      name: 'StratumAds',
      color: '#EF4444',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>`,
    },
    {
      name: 'NexusGroup',
      color: '#8B5CF6',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z"/></svg>`,
    },
    {
      name: 'ClearChannel',
      color: '#06B6D4',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 22 20 2 20"/></svg>`,
    },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  /* Set up scroll-triggered animations for the label, stats, and marquee sections */
  ngAfterViewInit(): void {
    this.observers.push(
      this.scrollAnim.observeElements(
        [this.labelRef.nativeElement, this.marqueeRef.nativeElement],
        'aos-hidden',
        'aos-visible',
      ),
    );
    const statCards =
      this.statsRef.nativeElement.querySelectorAll('.stat-card');
    this.scrollAnim.applyStaggerDelay(statCards, 0, 150);
    this.observers.push(
      this.scrollAnim.observeElements(statCards, 'aos-hidden', 'aos-visible'),
    );
  }

  /* Clean up IntersectionObservers when the component is destroyed */
  ngOnDestroy(): void {
    this.observers.forEach((o) => o.disconnect());
  }
}
