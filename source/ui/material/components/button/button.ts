import {isPresent} from '../../include';
import {Component,View, NgIf, NgFor,onChange} from 'angular2/angular2';


@Component({
  selector: 'md-button',
  properties: ['disabled'],
  host: {
    '(click)': 'onClick($event)',
    '[tabIndex]': 'tabIndex',
    '[class.md-button]':'true'
  },
  lifecycle: [onChange]
})
@View({
  template: '<content></content>'
})
export class MdButton {
  tabIndex:number;

  /**
   * Whether the component is disabled.
   */
  disabled:boolean;

  onClick(event:MouseEvent) {
    // A disabled anchor shouldn't navigate anywhere.
    if (isPresent(this.disabled) && this.disabled !== false) {
      event.preventDefault();
    }
  }

  /**
   * Invoked when a change is detected.
   */
  onChange() {
    // A disabled anchor should not be in the tab flow.
    this.tabIndex = this.disabled ? -1 : 0;
  }
}
