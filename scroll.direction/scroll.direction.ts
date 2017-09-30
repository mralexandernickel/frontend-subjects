import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export type ScrollDirection = 'up' | 'down';

/**
 * ScrollDirection
 * ===============
 *
 * ## Usage
 *
 * ```typescript
 * ```
 */
export class ScrollDirectionSubject {

  /**
   * The subscribable BehaviorSubject
   */
  private subject: BehaviorSubject<ScrollDirection>;

  /**
   * Last saved offset of window
   */
  private lastScrollTop: number = 0;

  /**
   * Last scrolldirection
   */
  private lastScrollDirection: ScrollDirection;

  /**
   * @constructor
   */
  constructor() {
    this.subject = new BehaviorSubject(null);
    this.addEventListeners();
  }

  /**
   * Getter for the subscribable BehaviorSubject
   * @return {BehaviorSubject}
   */
  public get(): BehaviorSubject<ScrollDirection> {
    return this.subject;
  }

  /**
   * Callback function for the scroll-event
   * @return {void}
   */
  private scrollHandler(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = (scrollTop > this.lastScrollTop) ? 'down' : 'up';
    if (scrollDirection !== this.lastScrollDirection) {
      this.subject.next(scrollDirection);
      this.lastScrollDirection = scrollDirection;
    }
    this.lastScrollTop = scrollTop;
  }

  /**
   * Adding the EventListener to 'resize'
   * @return {void}
   */
  private addEventListeners(): void {
    let animationFrame;
    window.addEventListener('scroll', () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(this.scrollHandler.bind(this));
    });
  }
}
