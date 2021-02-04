import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { AuthorQuery, AuthorResult } from './author.interface';
import { NameQuery, NameResult } from './name.interface';
import { PubQuery, PubResult } from './pub.interface';
import { AuthorTerms, FiltersTerms, NameTerms, PubTerms } from './terms';
import { Request } from '../request';

/**
 * Class for searching IPNI data and looking up individual records (https://www.ipni.org/).
 * @class
 * @public
 */
export class Ipni {
	private request = new Request('http://beta.ipni.org/api/1');
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
		return this.request.get('search', qs, NameTerms, filters, FiltersTerms);
	}

	/**
	 * Search data in the "author" module.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param {array} filters Array of filters available in the APIs. 
	 */
	author(qs: AuthorQuery, filters: string[] = []): Observable<RxHttpRequestResponse<AuthorResult>> {
		return this.request.get('search', qs, AuthorTerms, filters, FiltersTerms);
	}

	/**
	 * Search data in the "publication" module.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param {array} filters Array of filters available in the APIs. 
	 */
	pub(qs: PubQuery, filters: string[] = []): Observable<RxHttpRequestResponse<PubResult>> {
		return this.request.get('search', qs, PubTerms, filters, FiltersTerms);
	}
}
