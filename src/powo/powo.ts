import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { Request } from '../request';
import { CharacteristicQuery, CharacteristicResult } from './characteristic.interface';
import { GeographyQuery, GeographyResult } from './geography.interface';
import { LookupResult } from './lookup.interface';
import { NameQuery, NameResult } from './name.interface';
import { FiltersTerms, LookupTerms, PowoTerms } from './terms';

/**
 * Class for searching POWO data and looking up individual records. (http://www.plantsoftheworldonline.org/) 
 * @class
 * @public
 */
export class Powo {
	private request = new Request('http://www.plantsoftheworldonline.org/api/2');
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
		return this.request.get('search', qs, PowoTerms, filters, FiltersTerms);
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
		return this.request.get('search', qs, PowoTerms, filters, FiltersTerms);
	}

	/**
	 * Search data in the "geography" module.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param {array} filters Array of filters available in the APIs. 
	 */
	geography(qs: GeographyQuery, filters: string[] = []): Observable<RxHttpRequestResponse<GeographyResult>> {
		return this.request.get('search', qs, PowoTerms, filters, FiltersTerms);
	}

	/**
	 * Search for individual record.
	 * @param {string} id Taxon Id 
	 * @param {object} qs Extra data. Currently you can only retrieve distribution data, but other data should be exposed in the future.
	 */
	lookup(id: string, qs: { [key: string]: any } = {}):Observable<RxHttpRequestResponse<LookupResult>> {
		if (typeof qs.include !== 'undefined') qs.include = qs.include.join(',');
		return this.request.get(`taxon/${id.trim()}`, qs, LookupTerms);
	}
}
