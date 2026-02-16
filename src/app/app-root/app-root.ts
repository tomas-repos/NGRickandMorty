import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CharactersComponent } from '../characters/characters';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,CharactersComponent],
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.css']
})
export class AppRoot {

}
