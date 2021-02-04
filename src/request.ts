import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';

export class Request {
	constructor(
		private basePath: string,
		private limitPerPage = 500) {}

	get(qs: any, qsTerms: any, filters: string[], filterTerms: any): Observable<RxHttpRequestResponse<any>> {
		qs = this.buildQuery(qs, qsTerms, filters, filterTerms);
		return RxHR.get(this.basePath, { qs, json: true });
	}

	private formatQuery(qs: any, terms: any): { [key: string]: any } {
		const query: any = {};
		Object.keys(qs).forEach((term: string) => (query[terms[term]] = qs[term]));
		return query;
	}

	private formatFilters(filters: string[], filterTerms: any): string[] {
		return filters.map((filter) => filterTerms[filter]);
	}

	private buildQuery(qs: any, qsTerms: any, filters: string[], filterTerms: any): { [key: string]: any } {
		qs = this.formatQuery(qs, qsTerms);
		if (filters.length !== 0) qs.f = this.formatFilters(filters, filterTerms).join(',');
		qs.perPage = this.limitPerPage;
		qs.cursor = '*';
		return qs;
	}
}
