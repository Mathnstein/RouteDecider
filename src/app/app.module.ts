import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { DashboardComponent } from './dashboard/dashboard.component';

const firebaseUIAuthConfig = {
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/contacts.readonly'
      ],
      customParameters: {
        prompt: 'select_account'
      }
    },
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    }
  ],
  signInSuccessUrl: './dashboard',

  callbacks: {
    signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
      return false;
    },

  },
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    FirebaseUIModule.forRoot(firebaseUIAuthConfig)
  ],
  providers: [
    ScreenTrackingService, UserTrackingService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
