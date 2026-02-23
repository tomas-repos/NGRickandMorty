import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters';
import { CharacterDetail } from './character-detail/character-detail';

export const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'character/:id', component: CharacterDetail },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: '**', redirectTo: 'characters' }//nuevo

];
