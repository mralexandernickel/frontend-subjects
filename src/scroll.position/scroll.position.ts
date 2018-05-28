import { BehaviorSubjectable } from '../abstract/behavior.subjectable';
import ScrollSubject from '../event/scroll.subject';

/**
 * ScrollPositionSubject
 * =====================
 *
 * ## Usage
 *
 * ```typescript
 * import {
 *   ScrollPositionSubject
 * } from '@mralexandernickel/frontend-subjects/scroll.position/scroll.position';
 *
 * export default new ScrollPositionSubject();
 * ```
 *
 * ```typescript
 * import ScrollPosition from './ScrollPosition';
 * ScrollPosition.get().subscribe(scrollPosition => {
 *   console.log('ScrollPosition is now:', scrollPosition);
 * });
 * ```
 */
export class ScrollPositionSubject extends BehaviorSubjectable {
  /**
   * @constructor
   */
  constructor() {
    super();
    ScrollSubject.get().subscribe(this.scrollHandler.bind(this));
  }

  /**
   * Callback function for the ScrollSubject
   * @return {void}
   */
  private scrollHandler(): void {
    this.subject.next(window.scrollY);
  }
}
