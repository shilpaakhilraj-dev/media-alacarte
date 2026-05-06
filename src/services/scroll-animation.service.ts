import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * ScrollAnimationService
 * Provides IntersectionObserver-based utilities for triggering
 * CSS animations when elements enter the viewport.
 */
@Injectable({ providedIn: 'root' })

export class ScrollAnimationService {
  
  constructor(private ngZone: NgZone) {}

  /**
   * Observe elements and toggle animation classes on viewport entry.
   * Unobserves after trigger for performance.
   */
  observeElements(
    elements: NodeListOf<Element> | Element[],
    hiddenClass: string,
    visibleClass: string,
    threshold = 0.15
  ): IntersectionObserver {
    const observer = new IntersectionObserver(
      (entries) => {
        this.ngZone.run(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove(hiddenClass);
              entry.target.classList.add(visibleClass);
              observer.unobserve(entry.target);
            }
          });
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return observer;
  }

  /**
   * Applies progressively increasing animation-delay to each element
   * for a stagger reveal effect.
   */
  applyStaggerDelay(
    elements: NodeListOf<Element> | Element[],
    baseDelay = 0,
    step = 100
  ): void {
    Array.from(elements).forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${baseDelay + index * step}ms`;
    });
  }

  /**
   * Returns an Observable that emits true/false as element enters/leaves viewport.
   */
  watchElement(element: Element, threshold = 0.15): Observable<boolean> {
    return new Observable((subscriber) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.ngZone.run(() => subscriber.next(entry.isIntersecting));
        },
        { threshold }
      );
      observer.observe(element);
      return () => observer.disconnect();
    });
  }
}