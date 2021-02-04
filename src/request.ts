import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';

/**
 * The Request class can be used to construct HTTP request.
 * @class
 * @private
 */
export class Request {
	/**
	 * @constructor
	 * @param {string} basePath 
	 * @param {number} limitPerPage 
	 */
	constructor(private basePath: string, private limitPerPage = 500) {}

	/**
	 * Performs the GET request.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param qsTerms Query terms of the module. The request parameters are different from the input parameters of the function, so it is necessary to inform a dictionary to do the translation.
	 * @param {array} filters Array of filters available in the APIs.
	 * @param filterTerms Query terms of the module. Same situation as qsTerms.
	 * @returns {Observable}
	 */
	get(
		endpoint: string,
		qs: { [key: string]: any },
		qsTerms: any,
		filters: string[] = [],
		filterTerms: any = null
	): Observable<RxHttpRequestResponse<any>> {
		qs = this.buildQuery(qs, qsTerms, filters, filterTerms);
		return RxHR.get(`${this.basePath}/${endpoint}`, { qs, json: true });
	}

	/**
	 * Format the query object using the term dictionary.
	 * @param {object} qs Object containing querystring values to be appended to the uri.
	 * @param terms Query terms of the module. The request parameters are different from the input parameters of the function, so it is necessary to inform a dictionary to do the translation.
	 */
	private formatQuery(qs: any, terms: any): { [key: string]: any } {
		const paramsKey = Object.keys(qs);
		const query: any = {};
		if (paramsKey.length > 0) paramsKey.forEach((term: string) => (query[terms[term]] = qs[term]));
		return query;
	}

	/**
	 * Performs the formatting of the filter terms.
	 * @param {array} filters Array of filters available in the APIs.
	 * @param filterTerms Query terms of the module. The request parameters are different from the input parameters of the function, so it is necessary to inform a dictionary to do the translation.
	 */
	private formatFilters(filters: string[], filterTerms: any): string[] {
		return filters.map((filter) => filterTerms[filter]);
	}

	/**
	 * Builds the query object.
	 * @param qs Object containing querystring values to be appended to the uri.
	 * @param qsTerms Query terms of the module. The request parameters are different from the input parameters of the function, so it is necessary to inform a dictionary to do the translation.
	 * @param filters Array of filters available in the APIs.
	 * @param filterTerms Query terms of the module. The request parameters are different from the input parameters of the function, so it is necessary to inform a dictionary to do the translation.
	 */
	private buildQuery(qs: any, qsTerms: any, filters: string[], filterTerms: any): { [key: string]: any } {
		qs = this.formatQuery(qs, qsTerms);
		if (filters.length !== 0) qs.f = this.formatFilters(filters, filterTerms).join(',');
		qs.perPage = this.limitPerPage;
		qs.cursor = '*';
		return qs;
	}
}
