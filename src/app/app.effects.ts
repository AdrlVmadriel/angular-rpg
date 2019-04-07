import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  GameStateTravelAction,
  GameStateTravelFailAction,
  GameStateTravelSuccessAction
} from './models/game-state/game-state.actions';
import { LoadingService } from './components/loading';
import {
  map,
  toArray,
  switchMap,
  distinctUntilChanged,
  debounceTime,
  tap
} from 'rxjs/operators';
import { Router } from '@angular/router';
/**
 * AppComponent effects describe the navigation side-effects of various game actions.
 */
@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  /** When the game is loading or traveling, show the loading ui. */
  @Effect({ dispatch: false }) loadingIndicator$ = this.actions$.pipe(
    ofType(GameStateTravelAction.typeId),
    distinctUntilChanged(),
    tap((action: GameStateTravelAction) => {
      this.loadingService.message = `Traveling to ${
        action.payload.location
      }...`;
      this.loadingService.loading = true;
    })
  );
  /** When the game is done loading or traveling, hide the loading ui. */
  @Effect({ dispatch: false }) loadingDoneIndicator$ = this.actions$.pipe(
    ofType(
      GameStateTravelSuccessAction.typeId,
      GameStateTravelFailAction.typeId
    ),
    distinctUntilChanged(),
    tap((action: GameStateTravelSuccessAction | GameStateTravelFailAction) => {
      this.loadingService.loading = false;
    })
  );

  /** route update to world map */
  @Effect({ dispatch: false }) navigateToWorldRoute$ = this.actions$.pipe(
    ofType(GameStateTravelSuccessAction.typeId),
    debounceTime(100),
    distinctUntilChanged(),
    map((action: GameStateTravelSuccessAction) => {
      return this.router.navigate(['world', action.payload]);
    })
  );
}
