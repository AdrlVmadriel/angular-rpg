import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LoadingService } from '../../components/loading/loading.service';
import { GameWorld } from '../../services/game-world';
import { take } from 'rxjs/operators';

@Injectable()
export class GameResolver implements Resolve<any> {
  constructor(
    private world: GameWorld,
    private loadingService: LoadingService
  ) {}

  /** Resolve when the world ready$ observable emits */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.loadingService.loading = true;
    this.loadingService.title = 'RPG!';
    this.loadingService.message = 'Initializing the world...';
    // Wait for the world.ready$ observable to emit
    return this.world.ready$.pipe(take(1));
  }
}
