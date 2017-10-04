import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
export class ScrollPositionSubject {

  /**
   * The subscribable BehaviorSubject
   */
  public subject: BehaviorSubject<number>;

  /**
   * @constructor
   */
  constructor() {
    this.subject = new BehaviorSubject(0);
    ScrollSubject.get().subscribe(this.scrollHandler.bind(this));
  }

  /**
   * Getter for the subscribable BehaviorSubject
   * @return {BehaviorSubject}
   */
  public get(): BehaviorSubject<number> {
    return this.subject;
  }

  /**
   * Callback function for the ScrollSubject
   * @return {void}
   */
  private scrollHandler(): void {
    this.subject.next(window.scrollY);
  }
}
