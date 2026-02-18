
/*import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppRoot } from './app/app-root/app-root';

bootstrapApplication(AppRoot, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));

*/
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppRoot } from './app/app-root/app-root';

const apiUrl = 'https://rickandmortyapi.com/api';

bootstrapApplication(AppRoot, {
  providers: [
    provideHttpClient(),
    { provide: 'API_URL', useValue: apiUrl }
  ]
}).catch(err => console.error(err));
