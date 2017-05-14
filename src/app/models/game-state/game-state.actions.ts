import {Action} from '@ngrx/store';
import {GameState, GamePositionFacing} from './game-state.model';
import {type} from '../util';
import {IPoint} from '../../../game/pow-core';
import {Item} from '../item';
import {AppState} from '../../app.model';
import {EntitySlots} from '../entity/entity.model';

//
// Save state Actions
//
export class GameStateSaveAction implements Action {
  static typeId: 'GAME_SAVE' = type('GAME_SAVE');
  type = GameStateSaveAction.typeId;

  payload: null = null;

}

export class GameStateSaveSuccessAction implements Action {
  static typeId: 'GAME_SAVE_SUCCESS' = type('GAME_SAVE_SUCCESS');
  type = GameStateSaveSuccessAction.typeId;
  payload: string = null;
}

export class GameStateSaveFailAction implements Action {
  static typeId: 'GAME_SAVE_FAIL' = type('GAME_SAVE_FAIL');
  type = GameStateSaveFailAction.typeId;

  constructor(public payload: any) {
  }
}

//
// Load state Actions
//
export class GameStateLoadAction implements Action {
  static typeId: 'GAME_LOAD' = type('GAME_LOAD');
  type = GameStateLoadAction.typeId;
  payload: void;
}

export class GameStateLoadSuccessAction implements Action {
  static typeId: 'GAME_LOAD_SUCCESS' = type('GAME_LOAD_SUCCESS');
  type = GameStateLoadSuccessAction.typeId;

  constructor(public payload: AppState) {
  }
}

export class GameStateLoadFailAction implements Action {
  static typeId: 'GAME_LOAD_FAIL' = type('GAME_LOAD_FAIL');
  type = GameStateLoadFailAction.typeId;

  constructor(public payload: any) {
  }
}

//
// New game state Actions
//
export class GameStateNewAction implements Action {
  static typeId: 'GAME_NEW' = type('GAME_NEW');
  type = GameStateNewAction.typeId;

  constructor(public payload: GameState) {
  }
}

export class GameStateNewSuccessAction implements Action {
  static typeId: 'GAME_NEW_SUCCESS' = type('GAME_NEW_SUCCESS');
  type = GameStateNewSuccessAction.typeId;

  constructor(public payload: GameState) {
  }
}

export class GameStateNewFailAction implements Action {
  static typeId: 'GAME_NEW_FAIL' = type('GAME_NEW_FAIL');
  type = GameStateNewFailAction.typeId;

  constructor(public payload: any) {
  }
}

//
// key/value data for map features and such
//
export class GameStateSetKeyDataAction implements Action {
  static typeId: 'GAME_SET_KEY_DATA' = type('GAME_SET_KEY_DATA');
  type = GameStateSetKeyDataAction.typeId;
  payload: {
    key: string;
    value: any;
  };

  constructor(key: string, value: any) {
    this.payload = {
      key, value
    };
  }
}

//
// Travel state actions
//
export class GameStateTravelAction implements Action {
  static typeId: 'GAME_TRAVEL' = type('GAME_TRAVEL');
  type = GameStateTravelAction.typeId;

  payload: {
    location: string;
    position: IPoint;
  };

  constructor(location: string, position: IPoint) {
    this.payload = {
      location, position
    };
  }
}

export class GameStateTravelSuccessAction implements Action {
  static typeId: 'GAME_TRAVEL_SUCCESS' = type('GAME_TRAVEL_SUCCESS');
  type = GameStateTravelSuccessAction.typeId;

  constructor(public payload: string) {
  }
}

export class GameStateTravelFailAction implements Action {
  static typeId: 'GAME_TRAVEL_FAIL' = type('GAME_TRAVEL_FAIL');
  type = GameStateTravelFailAction.typeId;

  constructor(public payload: any) {
  }
}

//
// Move state actions
//

export interface GameStateMoveData {
  from: IPoint;
  to: IPoint;
  facing: GamePositionFacing;
}

export class GameStateMoveAction implements Action {
  static typeId: 'GAME_MOVE' = type('GAME_MOVE');
  type = GameStateMoveAction.typeId;

  constructor(public payload: IPoint) {
  }
}

//
// Gold state actions
//
export class GameStateAddGoldAction implements Action {
  static typeId: 'GAME_ADD_GOLD' = type('GAME_ADD_GOLD');
  type = GameStateAddGoldAction.typeId;

  constructor(public payload: number) {
  }
}

//
// Party state actions
//
export class GameStateHealPartyAction implements Action {
  static typeId: 'GAME_HEAL_PARTY' = type('GAME_HEAL_PARTY');
  type = GameStateHealPartyAction.typeId;

  constructor(public payload: {
    cost: number;
    partyIds: string[]
  }) {
  }
}

export class GameStateEquipItemAction implements Action {
  static typeId: 'GAME_EQUIP_ITEM' = type('GAME_EQUIP_ITEM');
  type = GameStateEquipItemAction.typeId;

  constructor(public payload: {
    entityId: string;
    itemId: string;
    slot: keyof EntitySlots;
  }) {
  }
}

export class GameStateUnequipItemAction implements Action {
  static typeId: 'GAME_UNEQUIP_ITEM' = type('GAME_UNEQUIP_ITEM');
  type = GameStateUnequipItemAction.typeId;

  constructor(public payload: {
    entityId: string;
    itemId: string;
    slot: keyof EntitySlots;
  }) {
  }
}

//
// Inventory actions
//
export class GameStateAddInventoryAction implements Action {
  static typeId: 'GAME_ADD_INVENTORY' = type('GAME_ADD_INVENTORY');
  type = GameStateAddInventoryAction.typeId;

  constructor(public payload: Item) {
  }
}
export class GameStateRemoveInventoryAction implements Action {
  static typeId: 'GAME_REMOVE_INVENTORY' = type('GAME_REMOVE_INVENTORY');
  type = GameStateRemoveInventoryAction.typeId;

  constructor(public payload: Item) {
  }
}

export type GameStateActions
  = GameStateSaveAction
  | GameStateSaveSuccessAction
  | GameStateSaveFailAction
  | GameStateLoadAction
  | GameStateLoadSuccessAction
  | GameStateLoadFailAction
  | GameStateNewAction
  | GameStateNewSuccessAction
  | GameStateNewFailAction
  | GameStateSetKeyDataAction
  | GameStateTravelAction
  | GameStateTravelSuccessAction
  | GameStateTravelFailAction
  | GameStateMoveAction
  | GameStateAddGoldAction
  | GameStateHealPartyAction
  | GameStateEquipItemAction
  | GameStateUnequipItemAction
  | GameStateAddInventoryAction
  | GameStateRemoveInventoryAction;