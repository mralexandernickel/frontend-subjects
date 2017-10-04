import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import ScrollSubject from '../event/scroll.subject';

/**
 * ScrollPositionSubject
 * =====================
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
