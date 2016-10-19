/*
 Copyright (C) 2013-2015 by Justin DuJardin and Contributors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import {GameFeatureComponent} from '../gameFeatureComponent';
import {Point} from '../../../pow-core/point';
import {TileObject} from '../../../pow2/tile/tileObject';

export class PortalFeatureComponent extends GameFeatureComponent {
  map: string;
  target: Point;

  syncComponent(): boolean {
    if (!super.syncComponent()) {
      return false;
    }
    this.map = this.host.feature.target;
    this.target = new Point(this.host.feature.targetX, this.host.feature.targetY);
    return !!this.map;
  }

  entered(object: TileObject): boolean {
    if (!this.target || !this.host.tileMap) {
      return false;
    }
    object.scene.trigger('PortalFeatureComponent:entered', {
      map: this.map,
      target: this.target,
    });
    return true;
  }

}

