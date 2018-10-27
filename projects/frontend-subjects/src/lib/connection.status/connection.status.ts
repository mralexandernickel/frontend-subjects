import { BehaviorSubject } from 'rxjs';
import { BehaviorSubjectable } from '../abstract/behavior.subjectable';

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
export class ConnectionStatusSubject extends BehaviorSubjectable {

  /**
   * The subscribable BehaviorSubject
   */
  public subject: BehaviorSubject<ConnectionStatus>;

  constructor() {
    const status = navigator.onLine ? ConnectionStatus.online : ConnectionStatus.offline;
    super(status);
    this.bindEvents();
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
