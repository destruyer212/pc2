import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <header class="page-header">
      <div>
        @if (breadcrumb) {
          <p class="breadcrumb">{{ breadcrumb }}</p>
        }
        <h1>{{ title }}</h1>
        @if (subtitle) {
          <p class="page-subtitle">{{ subtitle }}</p>
        }
      </div>
      <div class="page-actions">
        <ng-content />
      </div>
    </header>
  `
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() breadcrumb = '';
}
