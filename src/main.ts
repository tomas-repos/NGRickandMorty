/*import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));*/
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppRoot } from './app/app-root/app-root';

bootstrapApplication(AppRoot, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));

