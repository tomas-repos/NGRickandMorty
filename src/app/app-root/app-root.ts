import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.css']
})
export class AppRoot {
  protected readonly title = signal('rick-and-morty-app');
}
