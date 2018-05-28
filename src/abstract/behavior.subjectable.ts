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

  /**
   * @constructor
   */
  constructor() {
    this.subject = new BehaviorSubject(null);
  }

  /**
   * Getter for the subscribable BehaviorSubject
   * @return {BehaviorSubject}
   */
  public get(): BehaviorSubject<any> {
    return this.subject;
  }
}
