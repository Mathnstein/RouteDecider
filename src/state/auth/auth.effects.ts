import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AuthUIService } from 'src/app/login/auth-ui.service';
import { logOut, logOutSuccess } from './auth.actions';
//import all requried services or any dependencies

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthUIService
  ) {}

  // logIn$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(logIn),
  //     withLatestFrom(this.store.select(() => selectAuthUser)),
  //     switchMap(() =>
  //       from(this.authService.logOut()).pipe(
  //         map((data) => FeatureActions.actionSuccess({ data })),
  //         catchError((error) => of(FeatureActions.actionFailure({ error })))
  //       )
  //     )
  //   );
  // });

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOut),
        switchMap(() =>
          from(this.authService.logOut()).pipe(tap(() => logOutSuccess()))
        )
      ),
    { dispatch: false }
  );
}
