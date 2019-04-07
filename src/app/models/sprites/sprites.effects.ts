import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  SpritesLoadAction,
  SpritesLoadFailAction,
  SpritesLoadSuccessAction
} from './sprites.actions';
import { SpritesService } from './sprites.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SpritesEffects {
  constructor(
    private actions$: Actions,
    private spritesService: SpritesService
  ) {}

  @Effect() loadSprites$ = this.actions$.pipe(
    ofType(SpritesLoadAction.typeId),
    switchMap((action: SpritesLoadAction) => {
      return this.spritesService
        .loadSprites(action.payload)
        .pipe(map(() => action.payload));
    }),
    map((url: string) => {
      return new SpritesLoadSuccessAction(url);
    }),
    catchError(e => {
      return of(new SpritesLoadFailAction(e.toString()));
    })
  );
}
