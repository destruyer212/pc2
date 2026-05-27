import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SubnavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-subnav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="subnav">
      @for (item of items; track item.path) {
        <a [routerLink]="item.path" routerLinkActive="active">{{ item.label }}</a>
      }
    </nav>
  `
})
export class SubnavComponent {
  @Input() items: SubnavItem[] = [];
}
