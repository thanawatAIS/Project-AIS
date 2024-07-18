import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { enableProdMode } from '@angular/core';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './app/environments/environment';
import { provideStore, provideState } from '@ngrx/store';
import { authReducer } from './app/reducers/auth.reducers';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer })
  ],
}).catch(err => console.error(err));
