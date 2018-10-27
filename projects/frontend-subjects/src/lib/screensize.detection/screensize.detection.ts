import { BehaviorSubjectable } from '../abstract/behavior.subjectable';
import ResizeSubject from '../event/resize.subject';

export interface IBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type Screensize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const DefaultBreakpoints: IBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

/**
 * ScreenSizeDetection
 * ===================
 *
 * ## Usage
 *
 * Firste create the class-instance and pass your custom breakpoints
 * to the constructor. Use this class-instance as the default exported member.
 * If you don't pass breakpoints to the constructor, the class will use a default
 * breakpoint configuration, which is the one you see in the following code-example.
 *
 * ```typescript
 * import {
 *   ScreensizeDetectionSubject,
 *   IBreakpoints
 * } from '@mralexandernickel/frontend.subjects/dist/screensize.detection/screensize.detection';
 *
 * export const Breakpoints: IBreakpoints = {
 *   xs: 0,
 *   sm: 576,
 *   md: 768,
 *   lg: 992,
 *   xl: 1200
 * }
 *
 * export default new ScreensizeDetectionSubject(Breakpoints);
 * ```
 *
 * Now you can import and use this singleton-instance in any module you want,
 * and will be informed whenever the screen passes one of your breakpoints.
 *
 * ```typescript
 * import ScreensizeDetection from 'ScreensizeDetection';
 *
 * ScreensizeDetection.get().subscribe(screensize => {
 *   console.log(`Screensize is now ${screensize}`);
 * });
 * ```
 */
export class ScreensizeDetectionSubject extends BehaviorSubjectable {
  /**
   * The current screensize
   */
  public screensize: Screensize;

  /**
   * Determines if we are publishing for the first time
   */
  private subjectFirst = true;

  /**
   * @param IBreakpoints breakpoints optional custom breakpoint configuration
   * @param number mocksize optional mocked screen-width for testing purposes
   */
  constructor(
    public breakpoints: IBreakpoints = DefaultBreakpoints,
    public mocksize?: number
  ) {
    super();
    this.screensize = this.calculate();
    ResizeSubject.get().subscribe(this.resizeHandler.bind(this));
  }

  /**
   * Calculates the matching screensize depending on window.innerWidth
   * @return ScreenSize the currently active ScreenSize defined in Breakpoints
   */
  public calculate(): Screensize {
    const deviceWidth = this.mocksize || window.innerWidth;
    const sizes = Object.keys(this.breakpoints) as Array<Screensize>;
    for (let i = 0; i < sizes.length; i++) {
      if (i === sizes.length - 1) {
        return sizes[i];
      }
      const current = this.breakpoints[sizes[i]];
      const next = this.breakpoints[sizes[i + 1]];
      if (deviceWidth > current && deviceWidth <= next) {
        return sizes[i];
      }
    }
  }

  /**
   * Callback function for the resize-event
   */
  public resizeHandler(): void {
    const screensize = this.calculate();
    if (this.subjectFirst || screensize !== this.screensize) {
      this.subjectFirst = false;
      this.screensize = screensize;
      this.subject.next(this.screensize);
    }
  }
}
