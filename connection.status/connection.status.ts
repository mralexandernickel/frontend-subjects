import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum ConnectionStatus {
  offline,
  online
}

/**
 * ConnectionStatusSubject
 * =======================
 *
 * ```typescript
 * import {
 *   ConnectionStatusSubject
 * } from '@mralexandernickel/frontend.subjects/dist/connection.status/connection.status';
 *
 * const connectionStatus = new ConnectionStatusSubject();
 * connectionStatus.get().subscribe(status => {
 *   if (status) {
 *     console.log('Connection Status is now:', status);
 *   }
 * });
 */
export class ConnectionStatusSubject {

  /**
   * The subscribable BehaviorSubject
   */
  public subject: BehaviorSubject<ConnectionStatus>;

  /**
   * @constructor
   */
  constructor() {
    const status = (navigator.onLine) ? ConnectionStatus.online : ConnectionStatus.offline;
    this.subject = new BehaviorSubject(status);
    this.bindEvents();
  }

  /**
   * Getter for the subscribable BehaviorSubject
   * @return {BehaviorSubject}
   */
  public get(): BehaviorSubject<ConnectionStatus> {
    return this.subject;
  }

  /**
   * Bind the events and publish them to the subject
   */
  private bindEvents(): void {
    window.addEventListener('online', () => {
      this.subject.next(ConnectionStatus.online);
    });
    window.addEventListener('offline', () => {
      this.subject.next(ConnectionStatus.offline);
    });
  }
}
