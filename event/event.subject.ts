import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * EventSubject
 * ============
 */
export class EventSubject {
  /**
   * The subscribable BehaviorSubject
   */
  private subject: BehaviorSubject<boolean>;

  /**
   * @constructor
   */
  constructor(
    type: string
  ) {
    this.subject = new BehaviorSubject(false);
    this.addEventListener(type);
  }

  /**
   * Getter for the subscribable BehaviorSubject
   * @return {BehaviorSubject}
   */
  public get(): BehaviorSubject<any> {
    return this.subject;
  }

  /**
   * Adding the EventListener to 'resize'
   * @return {void}
   */
  private addEventListener(
    type: string
  ): void {
    let animationFrame;
    window.addEventListener(type, () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        this.subject.next(true);
      });
    });
  }
}
