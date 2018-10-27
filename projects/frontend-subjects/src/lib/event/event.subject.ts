import { BehaviorSubjectable } from '../abstract/behavior.subjectable';

/**
 * EventSubject
 * ============
 */
export class EventSubject extends BehaviorSubjectable {

  constructor(
    type: string
  ) {
    super();
    this.addEventListener(type);
  }

  /**
   * Adding the EventListener to the passed event-name
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
