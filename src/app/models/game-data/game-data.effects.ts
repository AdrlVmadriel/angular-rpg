import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GameDataService } from './game-data.service';
import {
  GameDataFetchAction,
  GameDataFetchFailAction,
  GameDataFetchSuccessAction
} from './game-data.actions';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GameDataEffects {
  constructor(
    private actions$: Actions,
    private gameDataService: GameDataService
  ) {}

  /**
   * Load game data into the store from a remote spreadsheet
   */
  @Effect() loadSpreadsheetData$ = this.actions$.pipe(
    ofType(GameDataFetchAction.typeId),
    switchMap((action: GameDataFetchAction) => {
      return this.gameDataService
        .loadGameData(action.payload)
        .pipe(map(() => action.payload));
    }),
    map((url: string) => {
      return new GameDataFetchSuccessAction(url);
    }),
    catchError(e => {
      console.warn(e);
      return of(new GameDataFetchFailAction(e.toString()));
    })
  );
}
