import { BehaviorSubject } from 'rxjs';
import { BehaviorSubjectable } from '../abstract/behavior.subjectable';

/**
 * UserLocation
 * ============
 *
 * ## Usage
 *
 * ```typescript
 * import {
 *   UserLocationSubject
 * } from '@mralexandernickel/frontend-subjects/dist/user.location/user.location';
 *
 * export default new UserLocationSubject(
 *   YOUR_GOOGLE_MAPS_API_KEY,
 *   THE_GOOGLE_MAPS_API_ENDPOINT,
 *   A_FALLBACK_URL_TO_A_GEOIP_RESPONSE
 * );
 * ```
 *
 * ```typescript
 * import UserLocation from './UserLocation';
 * UserLocation.get().subscribe(userLocation => {
 *   console.log('UserLocation is now:', userLocation);
 * });
 * ```
 */
export class UserLocationSubject extends BehaviorSubjectable {
  /**
   * @constructor
   */
  constructor(
    private mapsApiKey: string,
    private mapsApiEndpoint: string,
    private geoipEndpoint: string
  ) {
    super();
  }
  /**
   * Public method to get the users position
   */
  public get(): BehaviorSubject<any> {
    this.getUserLocation();
    return super.get();
  }
  /**
   * Save users position to locastorage an publish to subject
   * @param lat latitude
   * @param lng longitude
   * @param country country
   */
  private saveAndSendPosition(lat, lng, country) {
    let currentPosition = {
      latitude: lat,
      longitude: lng,
      country: country
    };
    sessionStorage.setItem('position', JSON.stringify(currentPosition));
    this.subject.next(currentPosition);
  }
  /**
   * Get the user position by geolocation if user allows it, otherwise fall back
   * to a geoip solution
   */
  private queryPosition() {
    navigator.geolocation.getCurrentPosition(
      // User gave permission to catch his position
      (position) => {
        const latLng = `${position.coords.latitude},${position.coords.longitude}`;
        fetch(`${this.mapsApiEndpoint}?latlng=${latLng}&key=${this.mapsApiKey}`).then((response: any) => {
          response.json().then((reverseResult: any) => {
            const topMatch = reverseResult.results.pop();
            const countryComponent = topMatch.address_components.find((item) => {
              return item.types.indexOf('country') !== -1;
            });
            const countryCode = countryComponent.short_name;
            this.saveAndSendPosition(position.coords.latitude, position.coords.longitude, countryCode);
          });
        });
      },
      // User denied permission to his geolocation -> get by IP
      () => {
        fetch(this.geoipEndpoint).then((res) => {
          res.json().then((position) => {
            this.saveAndSendPosition(position.latitude, position.longitude, position.country);
          });
        });
      }
    );
  }
  /**
   * Get the user location from localstorage if already existent, otherwise request it
   */
  private getUserLocation(): void {
    if (sessionStorage.getItem('position')) {
      this.subject.next(JSON.parse(sessionStorage.getItem('position')));
    } else {
      this.queryPosition();
    }
  }
}
