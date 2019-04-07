import { Injectable } from '@angular/core';
import { ResourceManager } from '../../../game/pow-core/resource-manager';
import { TiledTMXResource } from '../../../game/pow-core/resources/tiled/tiled-tmx.resource';
import { getMapUrl } from '../../../game/pow2/core/api';
import { AppState } from '../../app.model';
import { Store } from '@ngrx/store';
import { ReplaySubject, Observable, from, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class GameStateService {
  constructor(
    private loader: ResourceManager,
    private store: Store<AppState>
  ) {}

  private _worldMap$ = new ReplaySubject<TiledTMXResource>(1);
  worldMap$: Observable<TiledTMXResource> = this._worldMap$;

  /**
   * Load a Tiled TMX Map from a url
   */
  loadMap(name: string): Observable<TiledTMXResource> {
    const mapUrl = getMapUrl(name);
    return from(
      this.loader.load(mapUrl).then((maps: TiledTMXResource[]) => {
        this._worldMap$.next(maps[0]);
        return maps[0];
      })
    );
  }

  static STATE_KEY: string = '_angular2PowRPGState';

  resetGame(): Observable<void> {
    return interval(10).pipe(
      take(1),
      map(() => {
        localStorage.removeItem(GameStateService.STATE_KEY);
      })
    );
  }

  hasSaveGame(): boolean {
    return !!localStorage.getItem(GameStateService.STATE_KEY);
  }

  load(): Observable<AppState> {
    return interval(10).pipe(
      take(1),
      map(() => {
        const data = JSON.parse(
          localStorage.getItem(GameStateService.STATE_KEY)
        ) as AppState;
        return data;
      })
    );
  }

  /**
   * Serialize the application state for later loading
   */
  save(): Observable<AppState> {
    return this.store.pipe(
      take(1),
      map((state: AppState) => {
        const jsonData: string = JSON.stringify(state);
        localStorage.setItem(GameStateService.STATE_KEY, jsonData);
        return state;
      })
    );
  }
}
