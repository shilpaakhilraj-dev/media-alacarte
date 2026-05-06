import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeSceneService } from '../../services/three-scene.service';

/**
 * HeroComponent
 * Full-viewport hero with a Three.js particle network background,
 * staggered animated headline, and a live metrics card.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {

  /** Reference to the canvas element for Three.js rendering */
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  /** Sample data for hero section metrics and charts */
  heroStats = [
    { value: '110+', label: 'Top Agencies' },
    { value: '1M', label: 'Advertisers' },
    { value: '98.99%', label: 'Efficiency' },
  ];

  /** Sample data for campaign metrics */
  campaignMetrics = [
    {
      label: 'Impressions',
      value: '2.4M',
      progress: 82,
      color: 'linear-gradient(90deg,#E8173C,#FF6B8A)',
      delay: '1.2s',
    },
    {
      label: 'Conversions',
      value: '12.8K',
      progress: 68,
      color: 'linear-gradient(90deg,#4F46E5,#818CF8)',
      delay: '1.4s',
    },
    {
      label: 'ROI Achieved',
      value: '98.9%',
      progress: 98,
      color: 'linear-gradient(90deg,#10B981,#34D399)',
      delay: '1.6s',
    },
  ];

  /** Sample data for the chart bars */
  chartBars = [40, 55, 35, 70, 60, 80, 55, 90, 65, 88, 72, 95];

  constructor(private threeService: ThreeSceneService) {}

  /* Initialize the Three.js scene after the view is ready */
  ngAfterViewInit(): void {
    setTimeout(() => this.threeService.init(this.canvasRef.nativeElement), 100);
  }

  /* Clean up Three.js resources on component destroy */
  ngOnDestroy(): void {
    this.threeService.ngOnDestroy();
  }
}
