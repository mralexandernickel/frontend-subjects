import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const DEBOUNCE_TIME: number = 500;
const FAST_SCROLL_DISTANCE: number = 35;
const MINIMUM_SCROLL_DISTANCE: number = 50;

export const enum ScrollDirections {
  none = 0,
  up = 1,
  down = 2
}

export const enum ScrollSpeeds {
  slow = 1,
  regular = 2,
  fast = 3
}

export type ScrollDirection = ScrollDirections.up | ScrollDirections.down | ScrollDirections.none;
export type ScrollSpeed = ScrollSpeeds.regular | ScrollSpeeds.fast;

export interface IScrollInformation {
  direction: ScrollDirection;
  speed: ScrollSpeed;
}

/**
 * ScrollDirection
 * ===============
 *
 * ## Usage
 *
 * ```typescript
 * import {
 *   ScrollDirectionSubject
 * } from '@mralexandernickel/frontend-subjects/scroll.direction/scroll.direction';
 *
 * export default new ScrollDirectionSubject();
 * ```
 *
 * ```typescript
 * import ScrollDirection from './ScrollDirection';
 * ScrollDirection.get().subscribe(scrollDirection => {
 *   console.log('Direction is now:', scrollDirection);
 * });
 * ```
 */
export class ScrollDirectionSubject {

  /**
   * Subscribable BehaviorSubject
   */
  private subject: BehaviorSubject<IScrollInformation>;

  /**
   * SetTimeout handle
   */
  private timer: number;

  /**
   * Initial scroll information
   */
  private scrollInformation: IScrollInformation = {
    direction: ScrollDirections.none,
    speed: ScrollSpeeds.regular
  };

  /**
   * Last saved offset of window
   */
  private lastScrollTop: number = window.pageYOffset || document.documentElement.scrollTop;

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
  public get(): BehaviorSubject<IScrollInformation> {
    return this.subject;
  }

  /**
   * Detect if the user has stopped scrolling
   */
  private detectStop(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.scrollInformation.direction = ScrollDirections.none;
      this.scrollInformation.speed = ScrollSpeeds.regular;
      this.subject.next(this.scrollInformation);
    }, DEBOUNCE_TIME);
  }

  /**
   * Detect in which direction the user is scrolling
   * @param scrollTop current scrollTop
   */
  private detectDirection(scrollTop: number): void {
    let scrollDirection: ScrollDirection;
    if (scrollTop > this.lastScrollTop) {
      scrollDirection = ScrollDirections.down;
    } else if (scrollTop < this.lastScrollTop) {
      scrollDirection = ScrollDirections.up;
    } else {
      scrollDirection = ScrollDirections.none;
    }
    if (this.scrollInformation.direction !== scrollDirection) {
      this.scrollInformation.speed = ScrollSpeeds.regular;
      // this.scrollInformation.direction = ScrollDirections.none;
      this.scrollInformation.direction = scrollDirection;
      this.subject.next(this.scrollInformation);
    }
  }

  /**
   * Detect how fast the user is scrolling
   * @param scrollTop current scrollTop
   */
  private detectSpeed(scrollTop: number): void {
    const scrollTopDifference = Math.abs(scrollTop - this.lastScrollTop);
    let scrollSpeed: ScrollSpeed = ScrollSpeeds.regular;
    if (scrollTopDifference >= FAST_SCROLL_DISTANCE) {
      scrollSpeed = ScrollSpeeds.fast;
    }
    if (
      this.scrollInformation.speed !== ScrollSpeeds.fast
      && this.scrollInformation.speed !== scrollSpeed
    ) {
      this.scrollInformation.speed = scrollSpeed;
      this.subject.next(this.scrollInformation);
    }
  }

  /**
   * Find out if the body been scrolled to top
   * @param scrollTop current scrollTop position
   */
  public static scrolledToTop(scrollTop: number): boolean {
    return scrollTop < MINIMUM_SCROLL_DISTANCE;
  }

  /**
   * Find out if the body been scrolled to bottom
   * @param scrollTop current scrollTop position
   */
  public static scrolledToBottom(scrollTop: number): boolean {
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    return scrollTop + windowHeight >= bodyHeight - MINIMUM_SCROLL_DISTANCE;
  }

  /**
   * Callback function for the onscroll event-listener
   * @return {void}
   */
  private scrollHandler(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (
      ScrollDirectionSubject.scrolledToTop(scrollTop)
      || ScrollDirectionSubject.scrolledToBottom(scrollTop)
    ) {
      this.scrollInformation = {
        direction: ScrollDirections.none,
        speed: ScrollSpeeds.regular
      };
      this.subject.next(this.scrollInformation);
    } else {
      this.detectStop();
      this.detectDirection(scrollTop);
      this.detectSpeed(scrollTop);
    }

    this.lastScrollTop = scrollTop;
  }

  /**
   * Add the EventListener on 'scroll'
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
