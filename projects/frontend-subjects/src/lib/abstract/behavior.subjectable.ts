import { BehaviorSubject } from 'rxjs';

/**
 * BehaviorSubjectable
 * ===================
 */
export abstract class BehaviorSubjectable {
  /**
   * The subscribable BehaviorSubject
   */
  protected subject: BehaviorSubject<any>;

  constructor(initialValue: any = null) {
    this.subject = new BehaviorSubject(initialValue);
  }

  /**
   * Getter for the subscribable BehaviorSubject
   */
  public get(): BehaviorSubject<any> {
    return this.subject;
  }
}
