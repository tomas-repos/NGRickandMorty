import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';  
import { AppRoot } from './app/app-root/app-root';
import { routes } from './app/routes';

const apiUrl = 'https://rickandmortyapi.com/api';

bootstrapApplication(AppRoot, {
  providers: [
    provideHttpClient(),
    provideRouter(routes,withHashLocation()),
    { provide: 'API_URL', useValue: apiUrl }
  ]
}).catch(err => console.error(err));
