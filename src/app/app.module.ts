import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const firebaseUIAuthConfig = {
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      customParameters: {
        prompt: 'select_account',
      },
    },
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
  ],
  signInSuccessUrl: './dashboard',

  callbacks: {
    signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
      return false;
    },
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    FirebaseUIModule.forRoot(firebaseUIAuthConfig),
    StoreModule.forRoot(),
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
