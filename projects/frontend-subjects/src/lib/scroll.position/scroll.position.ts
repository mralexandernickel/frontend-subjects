import { BehaviorSubjectable } from '../abstract/behavior.subjectable';
import ScrollSubject from '../event/scroll.subject';
import { BehaviorSubject } from 'rxjs';

//
// ScrollPositionSubject
// =====================
//
// ## Usage
//
// By default the class will observe the window object...
//
// ```typescript
// import {
//   ScrollPositionSubject
// } from '@mralexandernickel/frontend-subjects/dist/scroll.position/scroll.position';
//
// export default new ScrollPositionSubject();
// ```
//
// ...if you want to observe the scroll-position of a regular element, you can
// do this by passing the target-element to the constructor...
//
// ```typescript
// import {
//   ScrollPositionSubject
// } from '@mralexandernickel/frontend-subjects/dist/scroll.position/scroll.position';
//
// const targetElement = document.getElementById('your-shiny-element');
// export default new ScrollPositionSubject(targetElement);
// ```
//
// ...at last you can subscribe to this scroll-position wherever and as often
// as you like, without creating new event-listeners all the time 🚀
//
// ```typescript
// import ScrollPosition from './ScrollPosition';
// ScrollPosition.get().subscribe(scrollPosition => {
//   console.log('ScrollPosition is now:', scrollPosition);
// });
// ```
//
export class ScrollPositionSubject extends BehaviorSubjectable {
  /**
   * The scroll-position on y-axis of this.targetElement
   */
  protected subject: BehaviorSubject<number>;

  constructor(
    private targetElement: HTMLElement | Window = window
  ) {
    super();
    ScrollSubject.get().subscribe(this.scrollHandler.bind(this));
  }

  /**
   * Get the scroll-position on y-axis based on the type of this.targetElement
   */
  private getScrollYPosition(): number {
    let scrollYPosition: number;
    if ('scrollY' in this.targetElement) {
      scrollYPosition = this.targetElement.scrollY;
    } else if ('scrollTop' in this.targetElement) {
      scrollYPosition = this.targetElement.scrollTop;
    }

    return scrollYPosition;
  }

  /**
   * Callback function for the ScrollSubject
   */
  private scrollHandler(): void {
    this.subject.next(this.getScrollYPosition());
  }
}
