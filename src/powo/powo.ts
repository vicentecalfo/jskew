import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { Request } from '../request';
import { CharacteristicQuery, CharacteristicResult } from './characteristic.interface';
import { GeographyQuery, GeographyResult } from './geography.interface';
import { NameQuery, NameResult } from './name.interface';
import { CharacteristicTerms, FiltersTerms, GeographyTerms, NameTerms } from './terms';

/**
 * Class for searching POWO data and looking up individual records. (http://www.plantsoftheworldonline.org/) 
 * @class
 * @public
 */
export class Powo {
	private request = new Request('http://www.plantsoftheworldonline.org/api/2/search');
	/**
	 * @constructor
	 */
	constructor() {}

	/**
	 * Search data in the "name" module.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param {array} filters Array of filters available in the APIs. 
	 */
	name(qs: NameQuery, filters: string[] = []): Observable<RxHttpRequestResponse<NameResult>> {
		return this.request.get(qs, NameTerms, filters, FiltersTerms);
	}

	/**
	 * Search data in the "characteristic" module.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param {array} filters Array of filters available in the APIs. 
	 */
	characteristic(
		qs: CharacteristicQuery,
		filters: string[] = []
	): Observable<RxHttpRequestResponse<CharacteristicResult>> {
		return this.request.get(qs, CharacteristicTerms, filters, FiltersTerms);
	}

	/**
	 * Search data in the "geography" module.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param {array} filters Array of filters available in the APIs. 
	 */
	geography(qs: GeographyQuery, filters: string[] = []): Observable<RxHttpRequestResponse<GeographyResult>> {
		return this.request.get(qs, GeographyTerms, filters, FiltersTerms);
	}
}
