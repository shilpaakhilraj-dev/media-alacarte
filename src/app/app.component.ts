import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component'
import { HeroComponent } from '../components/hero/hero.component';
import { ServicesComponent } from '../components/services/services.component';
import { StatsComponent } from '../components/stats/stats.component';
import { CollaborationComponent } from '../components/collaboration/collaboration.component';
import { CtaComponent } from '../components/cta/cta.component';
import { FooterComponent } from '../components/footer/footer.component';

/**
 * AppComponent
 * Root component — composes all page sections in order.
 * Each section is a standalone component for clean separation of concerns.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    CollaborationComponent, 
    StatsComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'media-alacarte';
}