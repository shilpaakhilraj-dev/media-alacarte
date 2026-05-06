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
 * CtaComponent
 * Full-width call-to-action section with animated background orbs
 * and an inline demo request form.
 */
@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
})
export class CtaComponent implements AfterViewInit, OnDestroy {

  /** Reference to the key elements for scroll animations */
  @ViewChild('eyebrowRef') eyebrowRef!: ElementRef;

  /** Reference to the headlineRef element */
  @ViewChild('headlineRef') headlineRef!: ElementRef;

  /** Reference to the subheading element */
  @ViewChild('subRef') subRef!: ElementRef;

  /** Reference to the check items element */
  @ViewChild('checkRef') checkRef!: ElementRef;

  /** Reference to the button element */
  @ViewChild('btnRef') btnRef!: ElementRef;

  /** Reference to the form element */
  @ViewChild('formRef') formRef!: ElementRef;

  /** Array of IntersectionObservers to disconnect on destroy */
  private observers: IntersectionObserver[] = [];

  /** List of features to display */
  checkItems = [
    'Plan Campaigns',
    'Book Media Slots',
    'Track Performance',
    'Maximize ROI',
    'No Lock-in',
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  /** Set up scroll-triggered animations with staggered delays */
  ngAfterViewInit(): void {
    const elements = [
      this.eyebrowRef.nativeElement,
      this.headlineRef.nativeElement,
      this.subRef.nativeElement,
      this.checkRef.nativeElement,
      this.btnRef.nativeElement,
      this.formRef.nativeElement,
    ];
    this.scrollAnim.applyStaggerDelay(elements, 0, 100);
    this.observers.push(
      this.scrollAnim.observeElements(elements, 'aos-hidden', 'aos-visible'),
    );
  }

  /* Clean up observers on component destroy */
  ngOnDestroy(): void {
    this.observers.forEach((o) => o.disconnect());
  }
}
