import { BehaviorSubjectable } from '../abstract/behavior.subjectable';

/**
 * ConnectionSpeedSubject
 * ======================
 */
export class ConnectionSpeedSubject extends BehaviorSubjectable {

  /**
   * @constructor
   * @param file URL to the check-file
   * @param filesize Size of the check-file
   */
  constructor(fileURL: string, fileSize: number) {
    super();
    this.detectConnection(fileURL, fileSize);
  }

  /**
   * Detect Connection Speed of the client
   * @param file URL to the check-file
   * @param filesize Size of the check-file
   */
  private detectConnection(file: string, filesize: number): void {
    let startTime, endTime;
    startTime = (new Date()).getTime();

    let download = new Image();
    download.onload = () => {
      endTime = (new Date()).getTime();
      const duration: number = (endTime - startTime) / 1000;
      const bitsLoaded: number = filesize * 8;
      const speedBps: number = bitsLoaded / duration;
      const speedKbps: number = speedBps / 1024;
      const speedMbps: number = speedKbps / 1024;
      const speed = {
        Bps: speedBps,
        Kbps: speedKbps,
        Mbps: speedMbps
      };
      this.subject.next(speed);
    };

    const cacheBuster = `?nnn=${startTime}`;
    download.src = file + cacheBuster;
  }

}
